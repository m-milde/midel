#!/usr/bin/env python3
# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.
"""Pack Midel dev and FTP deploy archives into dist/."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
import zipfile
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
STAGE_ROOT = DIST / ".pack-stage"

DEPLOY_NAMES = (
    "LICENSE",
    "index.html",
    "neural_lab.html",
    "neural_lab.css",
    "favicon.svg",
    "pack_manifest.js",
    "science_library.js",
    "wiki_lookup.js",
    "percent_calc.js",
    "chat_context.js",
    "training_text.js",
    "answer_format.js",
    "think_network.js",
    "short_added.js",
    "short_added.meta.js",
    "deep_model.js",
    "stage3_brain.js",
    "midel-logo.png",
    "midel-mark.png",
    ".htaccess",
)

DEV_EXTRA = (
    "LICENSE",
    "README.md",
    "MODEL.md",
    "ROADMAP.md",
    "NOTICE.md",
    "DEEP_NETWORK_REBUILD_PLAN.md",
    "CURSOR_DEEP_NETWORK_FIXES.md",
    "CURSOR_DEEP_NETWORK_FIXES_bg.md",
    "wiki-learn.md",
    "wiki-learn-expanded.md",
    "wiki-question-templates.md",
    "docs/MAC.md",
    "docs/WINDOWS.md",
    "Midel-network-guide.pdf",
    "requirements.txt",
    "requirements-torch.txt",
    "save_taught.py",
    "train_stage3.py",
    "build_network_guide.py",
    "stage3_learned.json",
    "neural_lab_classic.html",
    "pack_midel_backup.py",
    "run_midel_backup.py",
    "package.json",
)

DEV_GLOBS = ("step*.py", "*_facts.js")

DEV_DIRS = ("versions", "scripts")

SKIP_NAMES = {
    ".DS_Store",
    "Untitled",
    "Midel-network-guide-bg.pdf",
    "learn-new.log",
}

SKIP_SUFFIXES = (".pyc", ".pt")


def brain_complete() -> bool:
    path = ROOT / "stage3_brain.js"
    if not path.exists():
        return False
    text = path.read_text(errors="replace").strip()
    return text.endswith(";")


def unique_zip_path(kind: str) -> Path:
    """kind is deploy or dev → midel-YYYY-MM-DD-deploy.zip or midel-YYYY-MM-DD-2-deploy.zip."""
    day = date.today().isoformat()
    candidate = DIST / f"midel-{day}-{kind}.zip"
    if not candidate.exists():
        return candidate
    for n in range(2, 20):
        candidate = DIST / f"midel-{day}-{n}-{kind}.zip"
        if not candidate.exists():
            return candidate
    raise SystemExit(f"too many existing archives for midel-{day}-{kind}")


def copy_if_exists(src: Path, dest_dir: Path) -> None:
    if src.is_file():
        shutil.copy2(src, dest_dir / src.name)


def stamp_short_meta_cache_bust(text: str, lesson_total: int) -> str:
    return re.sub(
        r'short_added\.meta\.js(?:\?v=\d+)?',
        f"short_added.meta.js?v={lesson_total}",
        text,
        count=1,
    )


def taught_facts_version() -> int:
    path = ROOT / "taught_facts.js"
    return int(path.stat().st_mtime) if path.is_file() else 0


def stamp_taught_facts_cache_bust(text: str, version: int) -> str:
    """Bust the Teaching script load tag (not prose mentions in the Teaching panel)."""
    return re.sub(
        r'(<script src=")taught_facts\.js(?:\?v=\d+)?("></script>)',
        rf'\1taught_facts.js?v={version}\2',
        text,
        count=1,
    )


def pack_manifest_version() -> str:
    """Cache-bust token from pack file count + newest mtime (FTP/CDN often cache manifest)."""
    try:
        from save_taught import pack_names

        names = pack_names()
    except Exception:
        names = []
    mt = 0
    for name in names:
        path = ROOT / name
        if path.is_file():
            mt = max(mt, int(path.stat().st_mtime))
    lib = ROOT / "science_library.js"
    if lib.is_file():
        mt = max(mt, int(lib.stat().st_mtime))
    return f"{len(names)}p{mt}"


def stamp_pack_manifest_cache_bust(text: str, version: str) -> str:
    return re.sub(
        r'pack_manifest\.js(?:\?v=[^"]+)?',
        f"pack_manifest.js?v={version}",
        text,
        count=1,
    )


def verify_deploy_facts(midel: Path) -> list[str]:
    """Every local *_facts.js must land in the deploy folder."""
    missing = []
    for path in sorted(ROOT.glob("*_facts.js")):
        if not (midel / path.name).is_file():
            missing.append(path.name)
    return missing


def write_deploy_contents(midel: Path, manifest_text: str | None) -> None:
    facts = sorted(p.name for p in midel.glob("*_facts.js"))
    lines = [
        "Midel deploy contents (upload ALL of these to the web root, not only neural_lab.html).",
        "",
        f"Subject packs ({len(facts)} files):",
        *[f"  - {name}" for name in facts],
        "",
    ]
    if manifest_text:
        lines.append("pack_manifest.js KNOWLEDGE_PACKS line:")
        for line in manifest_text.splitlines():
            if "KNOWLEDGE_PACKS" in line:
                lines.append("  " + line.strip())
                break
    # No .txt suffix — deploy zip audit rejects *.txt (source packs).
    (midel / "DEPLOY-FILE-LIST").write_text("\n".join(lines) + "\n", encoding="utf-8")


def count_builtin_lessons() -> int:
    """Match browser SCIENCE_LIBRARY length after packs merge (100 science rows + subject packs)."""
    total = 100
    for path in sorted(ROOT.glob("*_facts.js")):
        if path.name == "taught_facts.js":
            continue
        try:
            text = path.read_text(encoding="utf-8")
            blob = text[text.index("[") : text.rindex("]") + 1]
            blob = re.sub(r",(\s*[\]}])", r"\1", blob)
            rows = json.loads(blob)
        except (ValueError, json.JSONDecodeError, OSError):
            continue
        if not isinstance(rows, list):
            continue
        total += sum(
            1
            for row in rows
            if isinstance(row, dict) and str(row.get("text") or "").strip()
        )
    return total


DEPLOY_INDEX_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Midel</title>
<meta http-equiv="refresh" content="0;url=neural_lab.html">
<link rel="canonical" href="neural_lab.html">
<script>location.replace("neural_lab.html");</script>
</head>
<body>
<p><a href="neural_lab.html">Open Midel</a></p>
</body>
</html>
"""


def write_deploy_index(dest: Path) -> None:
    dest.write_text(DEPLOY_INDEX_HTML, encoding="utf-8")


def deploy_pack_script_block() -> str:
    """Plain script tags for FTP (avoid document.write in pack_manifest.js on static hosts)."""
    try:
        from save_taught import pack_names

        names = [n for n in pack_names() if n != "taught_facts.js"]
    except Exception:
        names = sorted(
            p.name for p in ROOT.glob("*_facts.js") if p.name != "taught_facts.js"
        )
    built = count_builtin_lessons()
    lines = [
        "    <!-- deploy: subject packs inlined at backup (pack_manifest document.write is unreliable on FTP) -->"
    ]
    lines.extend(f'    <script src="{name}"></script>' for name in names)
    try:
        from save_taught import load_taught_rows_from_disk

        taught_n = len(load_taught_rows_from_disk())
    except Exception:
        taught_n = 0
    lines.append(
        f"    <script>window.MIDEL_DEPLOY_EXPECT={{builtIn:{built},taught:{taught_n}}};</script>"
    )
    return "\n".join(lines) + "\n"


def inject_pack_scripts_inline(text: str) -> str:
    block = deploy_pack_script_block()
    text, n = re.subn(
        r'<script src="pack_manifest\.js(?:\?v=[^"]+)?"></script>\s*'
        r"(?:<!-- MIDEL_PACK_SCRIPTS -->.*?<!-- /MIDEL_PACK_SCRIPTS -->\s*)?",
        block,
        text,
        count=1,
        flags=re.S,
    )
    if n == 0:
        raise ValueError("neural_lab.html: missing pack_manifest.js script tag")
    return text


def stamp_science_library_cache_bust(text: str, version: str) -> str:
    return re.sub(
        r'science_library\.js(?:\?v=[^"]+)?',
        f"science_library.js?v={version}",
        text,
        count=1,
    )


def inject_short_meta_inline(text: str) -> str:
    """Embed short_added.meta.js in HTML so FTP works without a second request (404/cache)."""
    meta_path = ROOT / "short_added.meta.js"
    if not meta_path.is_file():
        return text
    inline_body = meta_path.read_text(encoding="utf-8").strip()
    if "SHORT_ADDED_STATS" not in inline_body:
        return text
    repl = "<script>\n" + inline_body + "\n</script>"
    text, n = re.subn(
        r'<script src="short_added\.meta\.js(?:\?v=\d+)?"></script>',
        repl,
        text,
        count=1,
    )
    if n == 0:
        anchor = "<!-- short_added.js is fetched"
        if anchor in text:
            text = text.replace(anchor, repl + "\n    " + anchor, 1)
    return text


def stamp_boot_expected_bytes(text: str) -> str:
    """Tell the loading screen how many bytes of scripts to expect, so its progress bar stays accurate."""
    names = set(re.findall(r'<script src="([^"?]+\.js)', text))
    total = sum((ROOT / n).stat().st_size for n in names if (ROOT / n).is_file())
    if not total:
        return text
    return re.sub(r'(id="boot"[^>]*data-expected-bytes=")\d+(")', rf"\g<1>{total}\g<2>", text, count=1)


def patch_neural_lab_for_deploy(src: Path, dest: Path) -> None:
    """FTP/static deploy: read-only Teaching panel (no Add / lesson lists)."""
    text = src.read_text(encoding="utf-8")
    marker = "<body>"
    if marker not in text:
        raise ValueError("neural_lab.html: missing <body>")
    text = text.replace(marker, '<body class="deploy-host">', 1)
    try:
        from save_taught import ensure_short_meta_file

        ensure_short_meta_file()
    except Exception:
        pass
    meta_path = ROOT / "short_added.meta.js"
    if meta_path.is_file():
        try:
            blob = meta_path.read_text(encoding="utf-8").split("=", 1)[1].strip().rstrip(";")
            lesson_total = int(json.loads(blob).get("lessonTotal") or 0)
            if lesson_total > 0:
                text = stamp_short_meta_cache_bust(text, lesson_total)
        except (json.JSONDecodeError, OSError, ValueError, IndexError):
            pass
    version = pack_manifest_version()
    text = stamp_science_library_cache_bust(text, version)
    text = stamp_taught_facts_cache_bust(text, taught_facts_version())
    text = inject_pack_scripts_inline(text)
    text = inject_short_meta_inline(text)
    text = stamp_boot_expected_bytes(text)
    dest.write_text(text, encoding="utf-8")


def stage_deploy(midel: Path, *, static_host: bool = False) -> None:
    manifest_text = None
    try:
        from save_taught import ensure_short_meta_file, pack_names, write_manifest

        ensure_short_meta_file()
        write_manifest(pack_names())
        manifest_text = (ROOT / "pack_manifest.js").read_text()
    except Exception:
        pass
    for name in DEPLOY_NAMES:
        if name == "pack_manifest.js":
            continue
        src = ROOT / name
        if name == "index.html" and static_host:
            write_deploy_index(midel / name)
        elif name == "neural_lab.html" and static_host:
            patch_neural_lab_for_deploy(src, midel / name)
        else:
            copy_if_exists(src, midel)
    if manifest_text is not None:
        (midel / "pack_manifest.js").write_text(manifest_text)
    else:
        copy_if_exists(ROOT / "pack_manifest.js", midel)
    for path in sorted(ROOT.glob("*_facts.js")):
        shutil.copy2(path, midel / path.name)
    missing = verify_deploy_facts(midel)
    if missing:
        raise RuntimeError("deploy stage missing *_facts.js: " + ", ".join(missing))
    write_deploy_contents(midel, manifest_text)


def stage_dev(midel: Path) -> None:
    stage_deploy(midel, static_host=False)
    for name in DEV_EXTRA:
        copy_if_exists(ROOT / name, midel)
    for pattern in DEV_GLOBS:
        for path in sorted(ROOT.glob(pattern)):
            shutil.copy2(path, midel / path.name)
    for dirname in DEV_DIRS:
        src = ROOT / dirname
        if src.is_dir():
            shutil.copytree(src, midel / dirname, ignore=shutil.ignore_patterns(*SKIP_NAMES, "*.pt", "*.pyc"))


def should_skip_dev(path: Path) -> bool:
    if path.name in SKIP_NAMES:
        return True
    if path.name.startswith("neural_brain_curriculum_"):
        return True
    if path.suffix in SKIP_SUFFIXES:
        return True
    if path.suffix == ".txt" or path.name == "science_geography_facts.json":
        return True
    if path.name == "practice_questions.txt":
        return True
    return False


def write_zip(midel_dir: Path, out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for path in sorted(midel_dir.rglob("*")):
            if path.is_dir():
                continue
            rel = path.relative_to(midel_dir)
            zf.write(path, f"midel/{rel.as_posix()}")


def audit_zip(path: Path, forbidden: re.Pattern[str]) -> list[str]:
    hits = []
    with zipfile.ZipFile(path) as zf:
        for name in zf.namelist():
            if forbidden.search(name):
                hits.append(name)
    return hits


def pack_archives() -> tuple[Path, Path]:
    """Write deploy and dev zips under dist/. Caller must ensure brain_complete()."""
    deploy_zip = unique_zip_path("deploy")
    dev_zip = unique_zip_path("dev")

    if STAGE_ROOT.exists():
        shutil.rmtree(STAGE_ROOT)
    STAGE_ROOT.mkdir(parents=True)

    deploy_dir = STAGE_ROOT / "deploy-midel"
    dev_dir = STAGE_ROOT / "dev-midel"
    deploy_dir.mkdir(parents=True)
    dev_dir.mkdir(parents=True)

    stage_deploy(deploy_dir, static_host=True)
    stage_dev(dev_dir)

    write_zip(deploy_dir, deploy_zip)
    write_zip(dev_dir, dev_zip)

    forbidden = re.compile(
        r"(?:\.venv/|learn-new\.log|neural_brain_curriculum_|/dist/|\.cursor/|__pycache__/)"
    )
    txt_forbidden = re.compile(r"\.txt$|science_geography_facts\.json$|practice_questions\.txt$")

    for label, path in ("deploy", deploy_zip), ("dev", dev_zip):
        bad = audit_zip(path, forbidden)
        if bad:
            print(f"{label} zip contains forbidden paths:", bad[:5], file=sys.stderr)
            shutil.rmtree(STAGE_ROOT, ignore_errors=True)
            raise SystemExit(1)
    bad_txt = audit_zip(deploy_zip, txt_forbidden)
    if bad_txt:
        print("deploy zip must not contain source .txt packs:", bad_txt, file=sys.stderr)
        shutil.rmtree(STAGE_ROOT, ignore_errors=True)
        raise SystemExit(1)

    shutil.rmtree(STAGE_ROOT, ignore_errors=True)
    return deploy_zip, dev_zip


def main() -> int:
    if not brain_complete():
        print("stage3_brain.js is missing or incomplete; wait for --learn-new to finish.", file=sys.stderr)
        return 1
    deploy_zip, dev_zip = pack_archives()
    print("wrote", deploy_zip, "bytes", deploy_zip.stat().st_size)
    print("wrote", dev_zip, "bytes", dev_zip.stat().st_size)
    return 0


if __name__ == "__main__":
    sys.exit(main())
