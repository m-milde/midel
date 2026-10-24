#!/usr/bin/env python3
# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.
"""Write Teaching-panel lessons into taught_facts.js.

The page posts lessons on Add and Remove; POST merges with disk by id (see deletedIds on Remove).
Dev chat can patch one row
via POST /taught/patch (id + text/question, optional relearnDeep → stage3_learned.json relearn queue).
Bind is localhost only.
Optional GET /lookup?q=… fetches a gated English Wikipedia summary (same relevance rules as wiki_lookup.js;
see MODEL.md Online lookup and batch wiki:learn). Returns 429 JSON when Wikipedia rate-limits.
Batch CLI uses direct Wikipedia in Node by default; this endpoint serves chat and optional --writer-lookup.
`python3 save_taught.py --install` keeps this writer running after login.
"""
import json
import math
import os
import plistlib
import re
import subprocess
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "taught_facts.js"
SHORT = ROOT / "short_added.js"
SHORT_META = ROOT / "short_added.meta.js"
MANIFEST = ROOT / "pack_manifest.js"
SHORT_D_MODEL = 32
SHORT_MAX_SEQ = 64
LEARNED_JSON = ROOT / "stage3_learned.json"
PREFERRED_PACKS = [
    "biology_facts.js",
    "math_facts.js",
    "gemstone_facts.js",
    "chemistry_facts.js",
    "geography_facts.js",
    "skills_facts.js",
    "ai_facts.js",
    "design_facts.js",
    "taught_facts.js",
    "bulgarian_history_facts.js",
    "materials_facts.js",
    "substances_facts.js",
    "food_facts.js",
    "plants_facts.js",
    "animals_facts.js",
    "scientists_facts.js",
    "sport_facts.js",
]
HOST = "127.0.0.1"
PORT = 8787

# Teaching rows in taught_facts.js (manual Add, Remember, wiki:learn). Pack files use other ranges.
TAUGHT_ID_MIN = 3001

# One-time hint when older rows still say "Learned" (id → group name).
LEGACY_TAUGHT_CATEGORY = {
    3001: "Earth and land",
    3002: "Science",
    3003: "Science",
    3004: "Earth and land",
    3005: "Sky and space",
    3006: "Sky and space",
    3007: "Sky and space",
    3008: "Sky and space",
    3009: "Animals",
    3010: "Living things",
    3011: "Living things",
    3012: "Living things",
    3013: "Food and drink",
    3014: "Food and drink",
    3015: "Computers and information",
    3016: "Earth and land",
    3017: "Earth and land",
    3018: "Earth and land",
    3019: "Earth and land",
    3020: "Writing and language",
    3021: "Places",
    3022: "Living things",
    3023: "Earth and land",
    3024: "Earth and land",
    3025: "Art and media",
    3026: "Science",
    3027: "Science",
    3028: "Science",
}


def normalize_taught_category(name):
    text = str(name or "").strip()
    return text if text else "General"


def extract_js_array(text, var_name):
    marker = f"var {var_name} ="
    pos = text.find(marker)
    if pos < 0:
        raise ValueError(var_name)
    start = text.find("[", pos)
    if start < 0:
        raise ValueError("array")
    depth = 0
    i = start
    in_str = None
    esc = False
    while i < len(text):
        ch = text[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        elif ch in ('"', "'"):
            in_str = ch
        elif ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                blob = text[start : i + 1]
                lines = []
                for line in blob.splitlines():
                    if line.strip().startswith("//"):
                        continue
                    lines.append(line)
                blob = "\n".join(lines)
                blob = re.sub(r",(\s*[\]}])", r"\1", blob)
                return json.loads(blob)
        i += 1
    raise ValueError("unclosed array")


def parse_taught_groups(text):
    match = re.search(r"var TAUGHT_GROUPS\s*=\s*(\[.*?\])\s*;", text, re.DOTALL)
    if not match:
        return []
    blob = re.sub(r",(\s*])", r"\1", match.group(1))
    rows = json.loads(blob)
    return rows if isinstance(rows, list) else []


def parse_taught_file(text):
    order = parse_taught_groups(text)
    facts = extract_js_array(text, "TAUGHT_LIBRARY")
    if not isinstance(facts, list):
        raise ValueError("library")
    return order, facts


def load_taught_rows_from_disk():
    if not OUT.is_file():
        return []
    try:
        _, facts = parse_taught_file(OUT.read_text(encoding="utf-8"))
        return facts if isinstance(facts, list) else []
    except (ValueError, json.JSONDecodeError, OSError):
        return []


def load_pack_lesson_ids():
    """Ids owned by built-in *_facts.js packs (not taught_facts.js). Teaching must not reuse them."""
    reserved = set()
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
        for row in rows:
            if not isinstance(row, dict):
                continue
            try:
                i = int(row.get("id") or 0)
            except (TypeError, ValueError):
                continue
            if i > 0:
                reserved.add(i)
    return reserved


def _bump_past_reserved(candidate, reserved):
    while candidate in reserved:
        candidate += 1
    return candidate


def _advance_past_imminent_pack_block(candidate, reserved, max_taught):
    """If a *_facts.js block starts soon after max_taught, skip past that block only (small gaps inside it are
    treated as part of it, e.g. food 6921–7251). Free ranges between separate packs stay usable."""
    future = sorted(i for i in reserved if i > max_taught)
    if not future:
        return candidate
    run_start = future[0]
    if run_start - (max_taught + 1) > 32:
        return candidate
    run_end = run_start
    for i in future[1:]:
        if i - run_end > 32:
            break
        run_end = i
    return max(candidate, run_end + 1)


def next_taught_id(rows):
    """Next id for a new Teaching row (shared by UI, Remember, wiki:learn)."""
    reserved = load_pack_lesson_ids()
    max_id = TAUGHT_ID_MIN - 1
    for row in rows or []:
        try:
            i = int(row.get("id") or 0)
            if i >= TAUGHT_ID_MIN:
                max_id = max(max_id, i)
        except (TypeError, ValueError):
            pass
    candidate = max_id + 1
    candidate = _advance_past_imminent_pack_block(candidate, reserved, max_id)
    return _bump_past_reserved(candidate, reserved)


def normalize_taught_fact_ids(rows):
    """Ensure unique ids >= TAUGHT_ID_MIN; assign max+1 for missing, duplicate, invalid, or pack-reserved."""
    reserved = load_pack_lesson_ids()
    max_id = TAUGHT_ID_MIN - 1
    for row in rows or []:
        try:
            i = int(row.get("id") or 0)
            if i >= TAUGHT_ID_MIN:
                max_id = max(max_id, i)
        except (TypeError, ValueError):
            pass
    used = set()
    out = []
    for row in rows:
        r = dict(row)
        try:
            i = int(r.get("id") or 0)
        except (TypeError, ValueError):
            i = 0
        if i < TAUGHT_ID_MIN or i in used or i in reserved:
            max_id += 1
            max_id = _advance_past_imminent_pack_block(max_id, reserved, max_id - 1)
            max_id = _bump_past_reserved(max_id, reserved | used)
            i = max_id
        used.add(i)
        r["id"] = i
        out.append(r)
    return out


def group_taught_facts(facts, existing_order):
    by_cat = {}
    for row in facts:
        if not isinstance(row, dict):
            continue
        cat = normalize_taught_category(row.get("category"))
        if cat.lower() == "learned":
            cat = LEGACY_TAUGHT_CATEGORY.get(int(row.get("id") or 0), "General")
        by_cat.setdefault(cat, []).append(
            {
                "id": int(row.get("id") or 0),
                "category": cat,
                "text": str(row.get("text") or ""),
                "question": str(row.get("question") or ""),
            }
        )
    order = [normalize_taught_category(name) for name in existing_order]
    order = [name for name in order if name]
    seen = set(order)
    for cat in sorted(by_cat.keys()):
        if cat not in seen:
            order.append(cat)
            seen.add(cat)
    groups = [{"name": cat, "facts": by_cat[cat]} for cat in order if cat in by_cat]
    return groups, order


def render_taught_file(group_order, groups):
    lines = [
        "/* Deep network lessons (Teaching). Categories:",
    ]
    for name in group_order:
        lines.append(f"   - {name}")
    lines.append(" */")
    lines.append("")
    lines.append("var TAUGHT_GROUPS = " + json.dumps(group_order, ensure_ascii=False) + ";")
    lines.append("")
    lines.append("var TAUGHT_LIBRARY = [")
    for group in groups:
        lines.append("")
        lines.append("  // " + group["name"])
        for fact in group["facts"]:
            obj = {
                "id": int(fact["id"]),
                "category": group["name"],
                "text": str(fact["text"]),
                "question": str(fact.get("question") or ""),
            }
            lines.append("  " + json.dumps(obj, ensure_ascii=False) + ",")
    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def deep_lesson_installed(lesson_id):
    """True when this id is already listed in stage3_learned.json (weights trained)."""
    if not LEARNED_JSON.is_file():
        return False
    try:
        data = json.loads(LEARNED_JSON.read_text(encoding="utf-8"))
        ids = data.get("ids") or []
        return int(lesson_id) in ids
    except (json.JSONDecodeError, OSError, TypeError, ValueError):
        return False


def queue_deep_relearn(lesson_id):
    """Ask --learn-new to retrain this id next (corrected answer text)."""
    lid = int(lesson_id)
    data = {"ids": [], "skipped": [], "relearn": []}
    if LEARNED_JSON.is_file():
        try:
            data = json.loads(LEARNED_JSON.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            data = {"ids": [], "skipped": [], "relearn": []}
    ids = list(data.get("ids") or [])
    skipped = [int(x) for x in (data.get("skipped") or []) if x is not None]
    relearn = [int(x) for x in (data.get("relearn") or []) if x is not None]
    if lid in skipped:
        skipped = [x for x in skipped if x != lid]
    if lid not in relearn:
        relearn.append(lid)
    payload = {"ids": ids, "skipped": skipped, "relearn": relearn}
    tmp = LEARNED_JSON.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(payload) + "\n", encoding="utf-8")
    tmp.replace(LEARNED_JSON)
    return True


def patch_taught_row(row_id, text=None, question=None, category=None, relearn_deep=False):
    """Update one Teaching row on disk by id (taught_facts.js only)."""
    if not OUT.is_file():
        raise ValueError("missing")
    try:
        lid = int(row_id)
    except (TypeError, ValueError):
        raise ValueError("id")
    if lid < TAUGHT_ID_MIN:
        raise ValueError("id")
    existing_order, facts = parse_taught_file(OUT.read_text(encoding="utf-8"))
    if not isinstance(facts, list):
        raise ValueError("library")
    found = None
    for row in facts:
        if int(row.get("id") or 0) == lid:
            found = row
            break
    if not found:
        raise ValueError("missing")
    old_text = str(found.get("text") or "")
    if text is not None:
        new_text = str(text or "").strip()
        if not new_text or len(new_text) > 4000:
            raise ValueError("text")
        found["text"] = new_text
    if question is not None:
        q = str(question or "").strip()
        if len(q) > 400:
            raise ValueError("question")
        found["question"] = q
    if category is not None:
        found["category"] = normalize_taught_category(category)
    write_taught(facts)
    installed = deep_lesson_installed(lid)
    queued = False
    text_changed = str(found.get("text") or "") != old_text
    if relearn_deep and (text_changed or question is not None):
        queue_deep_relearn(lid)
        queued = True
    return {
        "id": lid,
        "installedInBrain": installed,
        "relearnQueued": queued,
        "text": str(found.get("text") or ""),
        "question": str(found.get("question") or ""),
        "category": str(found.get("category") or ""),
    }


def sanitize_taught_row(row):
    if not isinstance(row, dict):
        raise ValueError("row")
    text = str(row.get("text") or "").strip()
    if not text or len(text) > 4000:
        raise ValueError("text")
    question = str(row.get("question") or "").strip()
    if len(question) > 400:
        raise ValueError("question")
    fact_id = int(row.get("id") or 0)
    cat = normalize_taught_category(row.get("category"))
    if cat.lower() == "learned":
        cat = LEGACY_TAUGHT_CATEGORY.get(fact_id, "General")
    return {
        "id": fact_id,
        "category": cat,
        "text": text,
        "question": question,
    }


def write_taught(facts, deleted_ids=None):
    """Replace/update Teaching rows. Merges with disk so stale browser posts cannot drop wiki batch rows."""
    if not isinstance(facts, list):
        raise ValueError("facts")
    existing_order = []
    existing = []
    if OUT.exists():
        try:
            existing_order, existing = parse_taught_file(OUT.read_text(encoding="utf-8"))
        except (ValueError, json.JSONDecodeError, OSError):
            existing_order = []
            existing = []
    incoming = [sanitize_taught_row(row) for row in facts]
    no_id = [row for row in incoming if int(row.get("id") or 0) < TAUGHT_ID_MIN]
    incoming_ids = [row for row in incoming if int(row.get("id") or 0) >= TAUGHT_ID_MIN]
    merged = incoming
    if existing:
        by_id = {}
        for row in existing:
            try:
                rid = int(row.get("id") or 0)
            except (TypeError, ValueError):
                continue
            if rid < TAUGHT_ID_MIN:
                continue
            by_id[rid] = sanitize_taught_row(row)
        for raw_did in deleted_ids or []:
            try:
                by_id.pop(int(raw_did), None)
            except (TypeError, ValueError):
                pass
        for row in incoming_ids:
            by_id[int(row["id"])] = row
        merged = list(by_id.values()) + no_id
    clean = normalize_taught_fact_ids(merged)
    groups, order = group_taught_facts(clean, existing_order)
    body = render_taught_file(order, groups)
    tmp = OUT.with_suffix(".js.tmp")
    tmp.write_text(body, encoding="utf-8")
    tmp.replace(OUT)
    bump_taught_html_cache()
    return len(clean)


def bump_taught_html_cache():
    """After Remember/Add/wiki save: bust taught_facts.js in neural_lab.html so reload picks up new rows."""
    page = ROOT / "neural_lab.html"
    if not page.is_file():
        return
    try:
        from pack_midel_backup import stamp_taught_facts_cache_bust, taught_facts_version

        taught_n = len(load_taught_rows_from_disk())
        tf_ver = taught_facts_version()
        pack_files = [n for n in pack_names() if n != OUT.name]
        built_n = count_builtin_lessons()
        expect = (
            f"window.MIDEL_LIBRARY_EXPECT="
            f"{{builtIn:{built_n},packFiles:{len(pack_files)},taught:{taught_n},taughtVersion:{tf_ver}}};"
        )
        text = page.read_text(encoding="utf-8")
        text = stamp_taught_facts_cache_bust(text, tf_ver)
        if "MIDEL_LIBRARY_EXPECT" in text:
            text = re.sub(
                r"window\.MIDEL_LIBRARY_EXPECT=\{[^}]+\};",
                expect,
                text,
                count=1,
            )
        page.write_text(text, encoding="utf-8")
    except OSError:
        pass


def clean_lines(rows, limit):
    if not isinstance(rows, list) or len(rows) > limit:
        raise ValueError("lines")
    out = []
    seen = set()
    for row in rows:
        text = str(row or "").strip()
        if not text or len(text) > 240:
            raise ValueError("line")
        key = text.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(text)
    return out


def pack_global_name(path):
    stem = path.name.replace("_facts.js", "").replace("-", "_").upper()
    return f"{stem}_LIBRARY"


def readable_pack(path):
    try:
        text = path.read_text()
        if re.search(r"^\s*const\s+\w+_LIBRARY\s*=", text, re.M):
            print(
                f"warn: {path.name} uses const for *_LIBRARY — use var so the library merge sees it",
                file=sys.stderr,
            )
            return False
        if path.name != "taught_facts.js":
            m = re.search(r"^\s*var\s+(\w+_LIBRARY)\s*=", text, re.M)
            want = pack_global_name(path)
            if m and m.group(1) != want:
                print(
                    f"warn: {path.name} declares {m.group(1)} but science_library merge expects {want}",
                    file=sys.stderr,
                )
                return False
        if path.name == "taught_facts.js":
            rows = extract_js_array(text, "TAUGHT_LIBRARY")
        else:
            blob = text[text.index("["): text.rindex("]") + 1]
            blob = re.sub(r",(\s*[\]}])", r"\1", blob)
            rows = json.loads(blob)
    except (ValueError, json.JSONDecodeError, OSError):
        return False
    return isinstance(rows, list)


def count_builtin_lessons():
    """100-row science core plus every subject *_facts.js pack (not taught_facts.js)."""
    total = 100
    for name in pack_names():
        if name == OUT.name:
            continue
        path = ROOT / name
        if not path.is_file() or not readable_pack(path):
            continue
        try:
            text = path.read_text(encoding="utf-8")
            blob = text[text.index("[") : text.rindex("]") + 1]
            blob = re.sub(r",(\s*[\]}])", r"\1", blob)
            rows = json.loads(blob)
            total += len(rows)
        except (ValueError, json.JSONDecodeError, OSError):
            continue
    return total


def pack_names():
    found = [path.name for path in sorted(ROOT.glob("*_facts.js")) if readable_pack(path)]
    have = set(found)
    # Teaching file must stay on the page even if a transient parse check fails.
    if OUT.exists() and OUT.name not in have:
        have.add(OUT.name)
        found.append(OUT.name)
    ordered = [name for name in PREFERRED_PACKS if name in have]
    ordered.extend(name for name in found if name not in ordered)
    return ordered


def write_manifest(names):
    names = list(names)
    if OUT.exists() and OUT.name not in names:
        insert_at = len(names)
        if "design_facts.js" in names:
            insert_at = names.index("design_facts.js") + 1
        names.insert(insert_at, OUT.name)
    lines = [
        "/* Lesson files in this folder. The writer refreshes this list when a file is added. */",
        "var KNOWLEDGE_PACKS = " + json.dumps(names) + ";",
        "",
    ]
    text = "\n".join(lines)
    changed = not (MANIFEST.exists() and MANIFEST.read_text() == text)
    if changed:
        tmp = MANIFEST.with_suffix(".js.tmp")
        tmp.write_text(text)
        tmp.replace(MANIFEST)
    sync_neural_lab_pack_scripts(names)
    return changed


def sync_neural_lab_pack_scripts(names):
    """Plain script tags in neural_lab.html — document.write misses packs in many browsers."""
    page = ROOT / "neural_lab.html"
    if not page.is_file():
        return
    pack_files = [n for n in names if n != "taught_facts.js"]
    try:
        from pack_midel_backup import pack_manifest_version

        ver = pack_manifest_version()
    except ImportError:
        ver = str(int(time.time()))
    built_n = count_builtin_lessons()
    taught_n = len(load_taught_rows_from_disk())
    try:
        from pack_midel_backup import taught_facts_version

        tf_ver = taught_facts_version()
    except ImportError:
        tf_ver = int(time.time())
    expect_line = (
        f'    <script>window.MIDEL_LIBRARY_EXPECT={{builtIn:{built_n},packFiles:{len(pack_files)},'
        f"taught:{taught_n},taughtVersion:{tf_ver}}};</script>\n"
    )
    block = (
        "<!-- MIDEL_PACK_SCRIPTS -->\n"
        + expect_line
        + "\n".join(f'    <script src="{n}?v={ver}"></script>' for n in pack_files)
        + "\n    <!-- /MIDEL_PACK_SCRIPTS -->\n"
    )
    text = page.read_text(encoding="utf-8")
    text = re.sub(
        r'\s*<script>window\.MIDEL_LIBRARY_EXPECT=\{[^}]+\};</script>\s*\n',
        "\n",
        text,
        count=1,
    )
    if "<!-- MIDEL_PACK_SCRIPTS -->" in text:
        text = re.sub(
            r"<!-- MIDEL_PACK_SCRIPTS -->.*?<!-- /MIDEL_PACK_SCRIPTS -->\n",
            block,
            text,
            flags=re.S,
        )
    else:
        text = re.sub(
            r'(<script src="pack_manifest\.js(?:\?v=[^"]+)?"></script>\s*\n)',
            r"\1" + block,
            text,
            count=1,
        )
    try:
        from pack_midel_backup import (
            pack_manifest_version,
            stamp_pack_manifest_cache_bust,
            stamp_science_library_cache_bust,
            stamp_taught_facts_cache_bust,
            taught_facts_version,
        )

        ver = pack_manifest_version()
        text = stamp_pack_manifest_cache_bust(text, ver)
        text = stamp_science_library_cache_bust(text, ver)
        text = stamp_taught_facts_cache_bust(text, taught_facts_version())
    except ImportError:
        pass
    page.write_text(text, encoding="utf-8")


def watch_packs():
    while True:
        try:
            write_manifest(pack_names())
        except OSError:
            pass
        time.sleep(2)


def parse_short_file(text):
    """Keep comment groups. Each group is a name plus the facts under that comment."""
    groups = []
    current = None
    removed = []
    section = None
    string_line = re.compile(r'^\s*("(?:\\.|[^"\\])*")\s*,?\s*$')
    for line in text.splitlines():
        stripped = line.strip()
        if section is None and '"added"' in line and "[" in line:
            section = "added"
            continue
        if section == "added" and stripped.startswith("]"):
            section = "removed" if '"removed"' in line else "after"
            continue
        if section == "after" and '"removed"' in line:
            section = "removed"
        if section == "added":
            if stripped.startswith("//"):
                name = stripped[2:].strip()
                current = {"name": name, "lines": []}
                groups.append(current)
                continue
            match = string_line.match(line)
            if not match:
                continue
            if current is None:
                current = {"name": "Other", "lines": []}
                groups.append(current)
            current["lines"].append(json.loads(match.group(1)))
        elif section == "removed":
            match = string_line.match(line)
            if match:
                removed.append(json.loads(match.group(1)))
    if not groups:
        raise ValueError("groups")
    return groups, removed


def render_short_file(groups, removed):
    names = [group["name"] for group in groups]
    lines = [
        "var SHORT_GROUPS = " + json.dumps(names, ensure_ascii=False) + ";",
        "",
        "var SHORT_ADDED = {",
        '  "added": [',
    ]
    for group in groups:
        lines.append("")
        lines.append("    // " + group["name"])
        for item in group["lines"]:
            lines.append("    " + json.dumps(item, ensure_ascii=False) + ",")
    lines.append("  ],")
    if removed:
        rendered = json.dumps(removed, ensure_ascii=False, indent=2)
        lines.append('  "removed": ' + rendered.replace("\n", "\n  "))
    else:
        lines.append('  "removed": []')
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


def tokenize_short_line(text):
    s = re.sub(r"(\d),(?=\d)", r"\1", str(text or "").lower())
    return re.findall(r"\d+(?:\.\d+)?%?|[a-z]+|[?.!,]", s)


def load_builtin_short_lines():
    page = ROOT / "neural_lab.html"
    if not page.is_file():
        return []
    text = page.read_text(encoding="utf-8")
    start = text.find("const CURRICULUM = {")
    end = text.find("CURRICULUM.master = [")
    if start < 0 or end <= start:
        return []
    chunk = text[start:end]
    return re.findall(r"'((?:\\'|[^'])*)'", chunk)


def compute_short_network_meta(groups, removed):
    added_lines = sum(len(group["lines"]) for group in groups)
    builtin = load_builtin_short_lines()
    words = set()
    skip = {str(line).lower() for line in removed}
    builtin_active = 0
    for line in builtin:
        if line.lower() in skip:
            continue
        builtin_active += 1
        words.update(tokenize_short_line(line))
    builtin_n = len(builtin)
    for group in groups:
        for line in group["lines"]:
            words.update(tokenize_short_line(line))
    vocab_total = max(2, len(words))
    d_model = SHORT_D_MODEL
    t_max = SHORT_MAX_SEQ
    weights_total = 2 * vocab_total * d_model + t_max * d_model + 8 * d_model * d_model + 3 * d_model
    lesson_total = builtin_active + added_lines
    return {
        "addedLines": added_lines,
        "removedLines": len(removed or []),
        "builtinLines": builtin_n,
        "lessonTotal": lesson_total,
        "vocabTotal": vocab_total,
        "weightsTotal": weights_total,
    }


def write_short_meta(meta):
    body = (
        "/* Auto-generated when short_added.js is saved. Do not edit by hand. */\n"
        "var SHORT_ADDED_STATS = "
        + json.dumps(meta, ensure_ascii=False)
        + ";\n"
    )
    tmp = SHORT_META.with_suffix(".js.tmp")
    tmp.write_text(body, encoding="utf-8")
    tmp.replace(SHORT_META)


def ensure_short_meta_file():
    """Write short_added.meta.js from short_added.js if missing or older than source."""
    if not SHORT.is_file():
        return None
    need = not SHORT_META.is_file()
    if not need:
        try:
            need = SHORT.stat().st_mtime > SHORT_META.stat().st_mtime
        except OSError:
            need = True
    if need:
        groups, removed = parse_short_file(SHORT.read_text(encoding="utf-8"))
        meta = compute_short_network_meta(groups, removed)
        write_short_meta(meta)
        return meta
    try:
        raw = SHORT_META.read_text(encoding="utf-8")
        blob = raw.split("=", 1)[1].strip().rstrip(";")
        return json.loads(blob)
    except (json.JSONDecodeError, OSError, IndexError):
        groups, removed = parse_short_file(SHORT.read_text(encoding="utf-8"))
        meta = compute_short_network_meta(groups, removed)
        write_short_meta(meta)
        return meta


def save_short_file(groups, removed):
    text = render_short_file(groups, removed)
    tmp = SHORT.with_suffix(".js.tmp")
    tmp.write_text(text, encoding="utf-8")
    tmp.replace(SHORT)
    meta = compute_short_network_meta(groups, removed)
    write_short_meta(meta)
    return sum(len(group["lines"]) for group in groups)


def write_short(payload):
    if not isinstance(payload, dict):
        raise ValueError("short")
    groups, removed = parse_short_file(SHORT.read_text())
    op = payload.get("op")
    if op == "add":
        text = str(payload.get("text") or "").strip()
        category = str(payload.get("category") or "").strip()
        if not text or len(text) > 240 or not category:
            raise ValueError("line")
        group = next((item for item in groups if item["name"] == category), None)
        if group is None:
            raise ValueError("category")
        key = text.lower()
        if any(line.lower() == key for item in groups for line in item["lines"]):
            return save_short_file(groups, removed)
        group["lines"].append(text)
        removed = [line for line in removed if line.lower() != key]
    elif op == "remove":
        text = str(payload.get("text") or "").strip()
        if not text:
            raise ValueError("line")
        key = text.lower()
        for group in groups:
            group["lines"] = [line for line in group["lines"] if line.lower() != key]
        if payload.get("builtin") and not any(line.lower() == key for line in removed):
            removed.append(text)
    elif op == "reset":
        for group in groups:
            group["lines"] = []
        removed = []
    else:
        raise ValueError("op")
    return save_short_file(groups, removed)


WIKI_USER_AGENT = "MidelNeuralLab/1.0 (local educational chat; contact: local user)"

_WIKI_STOP = {
    "what", "when", "where", "who", "why", "how", "which",
    "is", "are", "do", "does", "did", "the", "a", "an", "of", "to", "in", "on", "for",
    "and", "or", "with", "from", "by", "at", "as", "be", "was", "were", "can", "could",
    "has", "have", "had", "will", "would", "should", "may", "might", "much", "many",
    "located", "locate", "location", "situated", "based", "found", "position", "positioned",
    "lies", "lying",
}

_WIKI_META = {
    "main", "major", "primary", "common", "various", "different", "difference", "between",
    "compare", "comparison", "versus", "examples", "example", "types", "type", "kinds", "kind",
    "forms", "form", "categories", "category", "list", "overview", "aspects", "parts", "ways",
    "methods", "history", "develop", "development", "important", "importance", "significance",
    "used", "work", "relate", "related", "relationship", "role", "purpose", "function", "apply",
    "application", "benefit", "benefits", "advantage", "disadvantages", "impact", "effects",
    "cause", "causes", "result", "results", "describe", "explain", "definition", "notion",
    "concept", "concepts", "idea", "ideas", "theory", "field", "study", "branch", "basic",
    "fundamental", "essential", "key", "core", "general", "modern", "ancient", "current",
    "today", "human", "people", "social", "economic", "political", "cultural", "scientific",
    "natural",
}


_WIKI_TOKEN_NORMALIZE = {
    "forth": "fourth",
    "dimention": "dimension",
    "dimentions": "dimension",
}


def _normalize_wiki_token(word):
    w = str(word or "").lower()
    if w in _WIKI_TOKEN_NORMALIZE:
        return _WIKI_TOKEN_NORMALIZE[w]
    if len(w) > 5 and w.endswith("ies"):
        y = w[:-3] + "y"
        if len(y) >= 4:
            return y
    if (
        len(w) > 5
        and w.endswith("s")
        and not w.endswith("ss")
        and not re.search(r"(?:is|us|as)$", w)
    ):
        sing = w[:-1]
        if len(sing) >= 4:
            return sing
    return w


def wikipedia_search_terms(query):
    """Drop leading ask-words so opensearch gets a topic phrase."""
    q = re.sub(r"\s+", " ", str(query or "").strip()).rstrip("?").strip().lower()
    words = [_normalize_wiki_token(w) for w in re.findall(r"[a-z0-9]+(?:'[a-z]+)?", q)]
    words = [w for w in words if w not in _WIKI_STOP]
    while words and words[0] in _WIKI_STOP:
        words.pop(0)
    while words and words[-1] in _WIKI_STOP:
        words.pop()
    topic = " ".join(words).strip()
    if len(topic) >= 2:
        return topic
    return q


def wiki_content_words(query):
    raw = re.sub(r"\?+", " ", str(query or "").lower())
    words = [w for w in re.findall(r"[a-z0-9]+(?:'[a-z]+)?", raw) if len(w) >= 3 and w not in _WIKI_STOP]
    return [_normalize_wiki_token(w) for w in words]


def wiki_topic_words(query):
    words = [w for w in wiki_content_words(query) if w not in _WIKI_META]
    return words if words else wiki_content_words(query)


def _wiki_topic_word_in_blob(word, blob):
    w = str(word or "").lower()
    b = str(blob or "").lower()
    if w in b:
        return True
    if len(w) > 5 and not w.endswith("s") and (w + "s") in b:
        return True
    return False


def wiki_relevance_score(query, title, snippet):
    need = wiki_content_words(query)
    if not need:
        return 1
    blob = (str(title or "") + " " + str(snippet or "")).lower()
    return sum(1 for w in need if _wiki_topic_word_in_blob(w, blob))


def wiki_topic_relevance_score(query, title, snippet):
    need = wiki_topic_words(query)
    if not need:
        return 1
    blob = (str(title or "") + " " + str(snippet or "")).lower()
    return sum(1 for w in need if _wiki_topic_word_in_blob(w, blob))


def _definition_single_topic(query):
    raw = re.sub(r"\?+$", "", str(query or "").strip())
    if not re.match(r"^what is\b", raw, re.I):
        return None
    words = wiki_content_words(query)
    return words[0] if len(words) == 1 else None


def _word_boundary(word):
    return re.compile(r"\b" + re.escape(str(word)) + r"\b", re.I)


def _likely_person_or_entertainment(title, text):
    blob = str(title or "") + " " + str(text or "")
    return bool(
        re.search(
            r"\b(wrestler|wwe|wwf|ring name|professional wrestling|ambassador|actor|actress|singer|songwriter|country music artist|album|single)\b",
            blob,
            re.I,
        )
    )


def _definition_topic_accepts(topic, title, text):
    if not topic:
        return False
    tl = str(title or "").strip().lower()
    body = str(text or "").lower()
    re_topic = _word_boundary(topic)
    if re.search(r"stone cold|steve austin", str(title or ""), re.I):
        return False
    if _likely_person_or_entertainment(title, text):
        if tl != topic and not tl.startswith(topic + " (") and not tl.startswith(topic + "("):
            return False
    if tl == topic:
        return True
    if tl.startswith(topic + " (") or tl.startswith(topic + "("):
        return True
    if tl.startswith("list of ") and re_topic.search(body):
        return True
    if re_topic.search(body):
        return True
    if topic == "stone" and re.search(r"rock \(geology\)", title or "", re.I) and re.search(
        r"\b(geology|rock|mineral|solid)\b", body
    ):
        return True
    return False


def _wiki_extra_search_phrases(query):
    topic = _definition_single_topic(query)
    if not topic:
        return []
    if topic == "stone":
        return ["stone material", "rock geology", "building stone"]
    return [topic + " material", topic + " science"]


def _wiki_location_question(query):
    return bool(re.match(r"^\s*where\b", str(query or "").strip(), re.I))


def _wiki_where_title_matches_topics(query, title):
    if not _wiki_location_question(query):
        return True
    topics = wiki_content_words(query)
    if not topics:
        return True
    title_s = str(title or "").strip()
    if not title_s:
        return False
    for t in topics:
        if len(t) < 3:
            continue
        if _word_boundary(t).search(title_s):
            return True
    return False


def wiki_hit_relevant(query, title, text):
    need = wiki_topic_words(query)
    if not need:
        return True
    def_topic = _definition_single_topic(query)
    if def_topic:
        return _definition_topic_accepts(def_topic, title, text)
    if not _wiki_where_title_matches_topics(query, title):
        return False
    score = wiki_topic_relevance_score(query, title, text)
    if len(need) <= 4:
        return score >= len(need)
    return score >= math.ceil(len(need) * 0.65)


def _wiki_fetch_summary(title):
    page_url = "https://en.wikipedia.org/wiki/" + urllib.parse.quote(title.replace(" ", "_"))
    summary_path = "https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(
        title.replace(" ", "_"), safe=""
    )
    req2 = urllib.request.Request(summary_path, headers={"User-Agent": WIKI_USER_AGENT})
    with urllib.request.urlopen(req2, timeout=8) as resp2:
        summary = json.loads(resp2.read().decode("utf-8"))
    if summary.get("type") == "disambiguation":
        return None
    text = str(summary.get("extract") or "").strip()
    if not text:
        return None
    return {
        "ok": True,
        "source": "Wikipedia",
        "title": str(summary.get("title") or title),
        "text": text,
        "url": str((summary.get("content_urls") or {}).get("desktop", {}).get("page") or page_url),
    }


def _wiki_media_search(phrase, limit=8):
    url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(
        {"action": "query", "list": "search", "srsearch": phrase, "srlimit": limit, "format": "json"}
    )
    req = urllib.request.Request(url, headers={"User-Agent": WIKI_USER_AGENT})
    with urllib.request.urlopen(req, timeout=8) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    hits = (data.get("query") or {}).get("search") or []
    return [str(h.get("title") or "") for h in hits if h.get("title")]


def wikipedia_lookup(query):
    """Return a short Wikipedia extract for a user question, or None."""
    q = re.sub(r"\s+", " ", str(query or "").strip())
    if not q or len(q) > 240:
        raise ValueError("q")
    if len(q.rstrip("?").strip()) < 2:
        raise ValueError("q")
    search = wikipedia_search_terms(q)
    tried = set()

    def try_title(title):
        key = str(title or "").lower()
        if not key or key in tried:
            return None
        tried.add(key)
        hit = _wiki_fetch_summary(title)
        if hit and wiki_hit_relevant(q, hit.get("title"), hit.get("text")):
            return hit
        return None

    search_url = "https://en.wikipedia.org/w/api.php?" + urllib.parse.urlencode(
        {"action": "opensearch", "search": search, "limit": 10, "namespace": 0, "format": "json"}
    )
    req = urllib.request.Request(search_url, headers={"User-Agent": WIKI_USER_AGENT})
    with urllib.request.urlopen(req, timeout=8) as resp:
        opensearch = json.loads(resp.read().decode("utf-8"))
    if isinstance(opensearch, list) and len(opensearch) >= 3:
        titles = opensearch[1] or []
        snippets = opensearch[2] if len(opensearch) > 2 else []
        ranked = sorted(
            range(len(titles)),
            key=lambda i: wiki_relevance_score(q, titles[i], snippets[i] if i < len(snippets) else ""),
            reverse=True,
        )
        positive = [i for i in ranked if wiki_relevance_score(q, titles[i], snippets[i] if i < len(snippets) else "") > 0]
        walk = positive if positive else ranked[:6]
        for i in walk[:6]:
            hit = try_title(titles[i])
            if hit:
                return hit
    media_queries = _wiki_extra_search_phrases(q) + [" ".join(wiki_content_words(q)).strip() or search]
    for phrase in media_queries:
        if not phrase:
            continue
        for title in _wiki_media_search(phrase, 8):
            hit = try_title(title)
            if hit:
                return hit
    return None


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Private-Network", "true")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/taught":
            qs = urllib.parse.parse_qs(parsed.query or "")
            want_facts = (qs.get("facts") or [""])[0].lower() in ("1", "true", "yes")
            taught_rows = load_taught_rows_from_disk()
            taught_n = len(taught_rows)
            nxt = next_taught_id(taught_rows)
            body_obj = {
                "ok": True,
                "count": taught_n,
                "nextId": nxt,
                "patch": True,
                "merge": True,
                "version": 3,
            }
            if want_facts:
                body_obj["facts"] = taught_rows
            raw = json.dumps(body_obj, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return
        if parsed.path == "/lookup":
            qs = urllib.parse.parse_qs(parsed.query or "")
            q = (qs.get("q") or [""])[0]
            hit = None
            try:
                hit = wikipedia_lookup(q)
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    raw = json.dumps({"ok": False, "rateLimited": True}).encode()
                    self.send_response(429)
                    self._cors()
                    self.send_header("Content-Type", "application/json; charset=utf-8")
                    self.send_header("Content-Length", str(len(raw)))
                    self.end_headers()
                    self.wfile.write(raw)
                    return
                hit = None
            except (ValueError, urllib.error.URLError, TimeoutError, json.JSONDecodeError, OSError):
                hit = None
            if not hit:
                raw = json.dumps({"ok": False}).encode()
                self.send_response(404)
            else:
                raw = json.dumps(hit, ensure_ascii=False).encode()
                self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
            return
        self.send_response(404)
        self._cors()
        self.end_headers()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        if path not in ("/taught", "/taught/patch", "/short"):
            self.send_response(404)
            self._cors()
            self.end_headers()
            return
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > 20_000_000:
            self.send_response(400)
            self._cors()
            self.end_headers()
            return
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            if path == "/short":
                count = write_short(payload)
                taught_rows = load_taught_rows_from_disk()
                short_stats = None
                if SHORT_META.is_file():
                    try:
                        raw = SHORT_META.read_text(encoding="utf-8")
                        blob = raw.split("=", 1)[1].strip().rstrip(";")
                        short_stats = json.loads(blob)
                    except (json.JSONDecodeError, OSError, IndexError):
                        short_stats = None
                body = {"ok": True, "count": count, "nextId": next_taught_id(taught_rows), "shortStats": short_stats}
            elif path == "/taught/patch":
                if not isinstance(payload, dict):
                    raise ValueError("payload")
                patch = patch_taught_row(
                    payload.get("id"),
                    text=payload.get("text"),
                    question=payload.get("question"),
                    category=payload.get("category"),
                    relearn_deep=bool(payload.get("relearnDeep")),
                )
                body = {"ok": True, **patch}
            else:
                deleted = payload.get("deletedIds") if isinstance(payload, dict) else None
                if deleted is not None and not isinstance(deleted, list):
                    raise ValueError("deletedIds")
                count = write_taught(payload.get("facts"), deleted_ids=deleted)
                taught_rows = load_taught_rows_from_disk()
                body = {
                    "ok": True,
                    "count": count,
                    "nextId": next_taught_id(taught_rows),
                    "merge": True,
                }
        except (ValueError, TypeError, json.JSONDecodeError, OSError):
            self.send_response(400)
            self._cors()
            self.end_headers()
            return
        raw = json.dumps(body).encode()
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def log_message(self, fmt, *args):
        print("taught", self.address_string(), fmt % args, flush=True)


def install():
    """Keep the writer running for this user, including after login."""
    py = "/usr/bin/python3" if Path("/usr/bin/python3").exists() else sys.executable
    label = "com.midel.taught"
    plist_path = Path.home() / "Library" / "LaunchAgents" / f"{label}.plist"
    log_path = Path.home() / "Library" / "Logs" / "midel-taught.log"
    plist_path.parent.mkdir(parents=True, exist_ok=True)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    plist_path.write_bytes(plistlib.dumps({
        "Label": label,
        "ProgramArguments": [py, str(Path(__file__).resolve())],
        "RunAtLoad": True,
        "KeepAlive": True,
        "StandardOutPath": str(log_path),
        "StandardErrorPath": str(log_path),
    }))
    domain = f"gui/{os.getuid()}"
    subprocess.run(["launchctl", "bootout", domain, str(plist_path)], check=False)
    subprocess.run(["launchctl", "bootstrap", domain, str(plist_path)], check=True)
    print(f"the model database writer stays running ({label})", flush=True)


if __name__ == "__main__":
    if "--write-json" in sys.argv:
        payload = json.loads(sys.stdin.read())
        if isinstance(payload, list):
            facts = payload
            deleted = None
        else:
            facts = payload.get("facts")
            deleted = payload.get("deletedIds")
        n = write_taught(facts, deleted_ids=deleted)
        print(f"wrote {n} Teaching rows to {OUT.name}", flush=True)
    elif "--install" in sys.argv:
        install()
    elif "--sync-packs" in sys.argv:
        names = pack_names()
        write_manifest(names)
        print(f"lesson files: {', '.join(names)}", flush=True)
    else:
        names = pack_names()
        write_manifest(names)
        threading.Thread(target=watch_packs, daemon=True).start()
        print(f"writing Teaching lessons to {OUT.name} on http://{HOST}:{PORT}/taught", flush=True)
        print(f"online lookup (Wikipedia) on http://{HOST}:{PORT}/lookup?q=… when enabled in Teaching", flush=True)
        print(f"watching lesson files: {', '.join(names)}", flush=True)
        ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
