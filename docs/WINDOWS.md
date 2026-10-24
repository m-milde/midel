<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Midel on Windows

Use the desktop for the same work as the Mac: chat, Teaching Add, `--learn-new`, and the PyTorch joint trainer. Commands below are **PowerShell** from the lab folder. Git Bash is not required. The same `npm run` names work on a Mac — see [MAC.md](MAC.md).

## Once

1. Install **Python 3** from [python.org](https://www.python.org/downloads/) or the Microsoft Store. Tick **Add python.exe to PATH**. Check with `py -3 --version`.
2. Install **Node LTS** from [nodejs.org](https://nodejs.org/). Check with `node -v` and `npm -v`.
3. Clone or pull:

```powershell
git clone https://github.com/m-milde/midel.git
cd midel
```

4. NumPy venv (live brain / `--learn-new`):

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python -m pip install -r requirements.txt
```

5. PyTorch venv (rebuild / joint trainer).

CPU (works on any PC, slower):

```powershell
py -3 -m venv .venv-torch
.\.venv-torch\Scripts\python -m pip install -r requirements-torch.txt
```

NVIDIA GPU (recommended on a desktop with a recent GeForce card):

```powershell
py -3 -m venv .venv-torch
.\.venv-torch\Scripts\python -m pip install torch --index-url https://download.pytorch.org/whl/cu124
.\.venv-torch\Scripts\python -m pip install -r requirements-torch.txt
```

The joint trainer uses CUDA when `torch.cuda.is_available()` is true, otherwise CPU. There is no MPS on Windows.

6. Teaching writer — leave this window open while you Add / Remember / Correct answer:

```powershell
npm run writer
```

It serves `http://127.0.0.1:8787`. Closing the window stops new saves. Lessons already in `taught_facts.js` and `short_added.js` still answer in chat.

`python save_taught.py --install` only prints this same hint on Windows (the Mac LaunchAgent does not exist here). To bounce the writer: stop the window, or `npm run writer:restart`, then `npm run writer:status`.

## Each session

```powershell
git pull
start neural_lab.html
```

| Task | Command |
| --- | --- |
| Teach one waiting lesson into `stage3_brain.js` | `npm run learn:new` |
| Drain the install queue | `npm run learn:new:loop` |
| Joint rebuild (do not stop a run that is already writing) | `npm run trainer:joint` or `npm run trainer:joint-phase2` |
| Brain health (read-only) | `npm run eval` |
| Deploy + dev zips | `npm run backup` |

`npm run` finds `.\.venv\Scripts\python.exe` or `.\.venv-torch\Scripts\python.exe` for you.

## Two machines

- Pull before you teach or train. Push after a finished save.
- Only **one** computer should write `taught_facts.js` or `stage3_brain.js` at a time.
- Do not commit `stage3_brain.js` unless the file ends with `;`.
- Do not stop a running joint job.

FTP upload still uses `npm run backup` and the **deploy** zip. Chat on a static host needs no Python. Teaching Add still needs `npm run writer` on this PC (or the Mac), not on the host.
