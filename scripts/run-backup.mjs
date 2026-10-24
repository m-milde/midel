#!/usr/bin/env node
/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Run the Midel backup pipeline (docs, PDF, deploy + dev zips). */
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { ROOT, resolvePython } from "./midel-python.mjs";

const root = ROOT;
const py = resolvePython();
const script = join(root, "run_midel_backup.py");

// Refuse to pack when the library or the page is broken (set MIDEL_SKIP_CHECK=1 to pack anyway).
if (process.env.MIDEL_SKIP_CHECK !== "1") {
  const check = spawnSync(process.execPath, [join(root, "scripts", "preflight-check.mjs"), "--quiet"], {
    cwd: root,
    stdio: "inherit",
  });
  if ((check.status ?? 1) !== 0) {
    console.error("\nBackup stopped: fix the FAIL lines above, or run with MIDEL_SKIP_CHECK=1 to pack anyway.");
    process.exit(1);
  }
}

const r = spawnSync(py, [script], { cwd: root, stdio: "inherit" });
process.exit(r.status ?? 1);
