#!/usr/bin/env bash
# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.
# Run train_stage3.py --learn-new until the queue is empty (or --max N runs).
# Appends to learn-new.log. Use instead of grepping "still only in the library"
# (that line appears after every successful install while thousands remain).
#
# Usage (from nn-tutorial):
#   npm run learn:new:loop
#   npm run learn:new:loop -- --max 50
#   LEARN_NEW_LOG=my.log npm run learn:new:loop
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
LOG="${LEARN_NEW_LOG:-learn-new.log}"
PY="${ROOT}/.venv/bin/python"
export PYTHONUNBUFFERED=1
MAX=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --max) MAX="${2:-0}"; shift 2 ;;
    *) echo "Unknown arg: $1" >&2; exit 2 ;;
  esac
done
if [[ ! -x "$PY" ]]; then
  echo "Missing $PY — create .venv and pip install -r requirements.txt" >&2
  exit 1
fi
run=0
while true; do
  run=$((run + 1))
  if [[ "$MAX" -gt 0 && "$run" -gt "$MAX" ]]; then
    echo "learn-new-loop: stopped after $MAX runs (queue may still have pending lessons)."
    exit 0
  fi
  echo "=== learn-new run $run $(date -u +%Y-%m-%dT%H:%M:%SZ) ===" | tee -a "$LOG"
  tmp="$(mktemp)"
  set +e
  "$PY" train_stage3.py --learn-new 2>&1 | tee "$tmp" | tee -a "$LOG"
  code=${PIPESTATUS[0]}
  set -e
  out="$(cat "$tmp")"
  rm -f "$tmp"
  if [[ "$code" -ne 0 ]]; then
    echo "learn-new-loop: trainer exited $code" | tee -a "$LOG"
    exit "$code"
  fi
  if echo "$out" | grep -q "LEARN-NEW-STATUS queue-empty"; then
    echo "learn-new-loop: all lessons with questions are in the deep network." | tee -a "$LOG"
    exit 0
  fi
  if echo "$out" | grep -qE "LEARN-NEW-STATUS (installed|skipped|relearned|relearn-deferred|install-deferred) "; then
    echo "$out" | grep -E "^(deep network:|LEARN-NEW-QUEUE )" | tail -2 | tee -a "$LOG" || true
    continue
  fi
  if echo "$out" | grep -q "every lesson file is already in the deep network"; then
    echo "learn-new-loop: queue empty." | tee -a "$LOG"
    exit 0
  fi
  if echo "$out" | grep -qE "^installed [0-9]+\\.|^skipped [0-9]+\\."; then
    continue
  fi
  echo "learn-new-loop: no install/skip/empty status in output — stopping (see log)." | tee -a "$LOG"
  exit 1
done
