#!/usr/bin/env bash
# Restart the Midel taught_facts writer on localhost:8787 (LaunchAgent or foreground hint).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LABEL="gui/$(id -u)/com.midel.taught"
PLIST="$HOME/Library/LaunchAgents/com.midel.taught.plist"

if [[ -f "$PLIST" ]]; then
  echo "Restarting LaunchAgent com.midel.taught …"
  launchctl kickstart -k "$LABEL" 2>/dev/null || launchctl bootstrap "$LABEL" "$PLIST" 2>/dev/null || true
  # wait up to ~15s for the writer to start listening before the health check
  for _ in $(seq 1 15); do
    lsof -i :8787 -sTCP:LISTEN >/dev/null 2>&1 && break
    sleep 1
  done
else
  echo "No LaunchAgent plist at $PLIST"
  if lsof -i :8787 -sTCP:LISTEN >/dev/null 2>&1; then
    echo "Port 8787 already in use — stop that process or: python3 save_taught.py --install"
    exit 1
  fi
  echo "Start manually in another terminal: cd $ROOT && python3 save_taught.py"
  exit 1
fi

cd "$ROOT"
node scripts/writer-health.mjs
