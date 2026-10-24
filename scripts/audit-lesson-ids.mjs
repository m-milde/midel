/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */
/** Audit lesson ids: taught_facts.js vs pack files. Exit 1 on duplicate/colliding ids or unreadable packs; gaps are only a warning. */
import { spawnSync } from 'child_process';
import { ROOT, resolvePython } from './midel-python.mjs';

const py = resolvePython();
const r = spawnSync(
  py,
  [
    '-c',
    `
import json, re, sys
from pathlib import Path
ROOT = Path(${JSON.stringify(ROOT)})
sys.path.insert(0, str(ROOT))
from save_taught import load_taught_rows_from_disk, load_pack_lesson_ids, next_taught_id, next_free_id, TAUGHT_ID_MIN

pack_bad = False
pack = load_pack_lesson_ids()
taught = load_taught_rows_from_disk()
ids = sorted(int(r["id"]) for r in taught)
used = set(ids)
dups = len(ids) - len(used)
coll = [i for i in ids if i in pack]
# gaps in taught sequence except intentional pack-reserved holes
gaps = []
for i in range(min(ids), max(ids) + 1):
    if i not in used and i not in pack:
        gaps.append(i)
print("taught rows:", len(ids), "range", ids[0], "-", ids[-1], "nextId", next_taught_id(taught))
print("duplicate taught ids:", dups)
print("taught ids colliding with packs:", len(coll), coll[:8] if coll else "")
print("WARNING unexpected gaps (not pack-reserved, not an error):", len(gaps), gaps[:12] if gaps else "none")
# pack-vs-pack (and within-pack) duplicate ids
owners = {}
for path in sorted(ROOT.glob("*_facts.js")):
    if path.name == "taught_facts.js":
        continue
    try:
        text = path.read_text(encoding="utf-8")
        blob = text[text.index("[") : text.rindex("]") + 1]
        blob = re.sub(r",(\\s*[\\]}])", r"\\1", blob)
        rows = json.loads(blob)
    except (ValueError, json.JSONDecodeError, OSError) as e:
        print("could not read pack", path.name, e)
        pack_bad = True
        continue
    for row in rows:
        try:
            owners.setdefault(int(row.get("id") or 0), []).append(path.name)
        except (TypeError, ValueError, AttributeError):
            pass
pack_dups = {i: f for i, f in owners.items() if i > 0 and len(f) > 1}
per_file = {}
for i, fs_ in owners.items():
    for f in fs_:
        per_file.setdefault(f, []).append(i)
print("per file (count, first id - last id):")
for f in sorted(per_file, key=lambda f: min(per_file[f])):
    v = per_file[f]
    print("  %-32s %4d  %d - %d" % (f, len(v), min(v), max(v)))
print("  %-32s %4d  %d - %d" % ("taught_facts.js", len(ids), ids[0], ids[-1]))
print("highest id in ALL files:", next_free_id(taught) - 1, "-> next free id for a new pack or taught fact:", next_free_id(taught))
print("pack files checked:", len({f for fs in owners.values() for f in fs}), "pack ids:", len(owners))
print("duplicate ids across/within packs:", len(pack_dups))
for i in sorted(pack_dups)[:12]:
    print("  ", i, "->", ", ".join(pack_dups[i]))
if dups or coll or pack_dups or pack_bad:
    sys.exit(1)
print("OK")
`
  ],
  { encoding: 'utf8' }
);
process.stdout.write(r.stdout || '');
process.stderr.write(r.stderr || '');
process.exit(r.status ?? 1);
