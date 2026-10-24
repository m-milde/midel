<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Midel on a Mac

Use this machine for chat, Teaching Add, `--learn-new`, and the PyTorch joint trainer. The same `npm run` names work on Windows — see [WINDOWS.md](WINDOWS.md).

## Once

1. Install **Python 3** (Xcode CLT or Homebrew) and **Node LTS**.
2. Clone or pull the lab:

```bash
git clone https://github.com/m-milde/midel.git
cd midel
```

3. NumPy venv (live brain / `--learn-new`):

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

4. PyTorch venv (rebuild / joint trainer). Uses the Mac GPU through MPS when available:

```bash
python3 -m venv .venv-torch
.venv-torch/bin/python -m pip install -r requirements-torch.txt
```

5. Start the Teaching writer so Add / Remember / Correct answer can save:

```bash
python3 save_taught.py --install
```

That installs a LaunchAgent (`com.midel.taught`) on port **8787** and keeps it after login. Restart after changing `save_taught.py`:

```bash
npm run writer:restart
npm run writer:status
```

To run the writer in a terminal instead: `npm run writer`.

## Each session

```bash
git pull
open neural_lab.html
```

| Task | Command |
| --- | --- |
| Teach one waiting lesson into `stage3_brain.js` | `npm run learn:new` |
| Drain the install queue | `npm run learn:new:loop` |
| Joint rebuild (do not stop a run that is already writing) | `npm run trainer:joint` or `npm run trainer:joint-phase2` |
| Brain health (read-only) | `npm run eval` |
| Deploy + dev zips | `npm run backup` |

`npm run` finds `.venv/bin/python` or `.venv-torch/bin/python` for you.

## Two machines

- Pull before you teach or train. Push after a finished save.
- Only **one** computer should write `taught_facts.js` or `stage3_brain.js` at a time.
- Do not commit `stage3_brain.js` unless the file ends with `;`.
- Do not stop a running joint job.

FTP upload still uses `npm run backup` and the **deploy** zip. Chat on a static host needs no Python. Teaching Add still needs this writer on a computer that can write the lesson files.
