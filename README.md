<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# 🧠 Build & Teach a Neural Network (Interactive Tutorial & Standalone Lab)

A complete journey from a single mathematical neuron to an in-browser, persistent **Causal Transformer (Micro-GPT)** with Self-Attention!

Where the project stands, and how to resume, is in **[MODEL.md](./MODEL.md)**. The **forward plan** toward stronger / LLM-like behavior is in **[ROADMAP.md](./ROADMAP.md)**. The model is named **Midel**. **License:** [LICENSE](./LICENSE) — Copyright (c) 2026 M.Milde; free use; no sale, rebrand, or profit from this software without written permission. Open `neural_lab.html`. The chat reads a lesson library (science, biology, math, gemstones, chemistry, geography, skills, artificial intelligence, design, Bulgarian history, and Scientists) and checks it with two networks: a small one whose short lines are stored with the page, and a wider one loaded from `stage3_brain.js`. When a single deep lesson matches, the page tries to show an answer the deep network writes from that lesson; if that pass is not confident enough, it shows the stored sentence instead. The page does not train either network in the browser. The library matcher treats close word forms as the same topic word, so a question does not have to repeat the stored wording exactly.

After you add a `*_facts.js` file, leave the writer running so it refreshes `pack_manifest.js`, then reload the page so the chat can use the new lessons. **Id ranges and checklist:** [MODEL.md — New subject packs](MODEL.md#new-subject-packs-_factsjs-and-id-blocks). To teach one waiting lesson into the deep network, run **`npm run learn:new`** once, then reload again. One run teaches one lesson, and it keeps the previous weights if the old checks fail. The full sequence, including which id to start at, is in [MODEL.md](./MODEL.md#how-to-add-a-new-lesson-file).

When chat shows a **Teaching** / **Wikipedia** row from `taught_facts.js`, use **Correct answer** in the thread to fix bad text (writer on **8787**; optional relearn via **`npm run learn:new`**). Deploy zips hide this control. Writer health: **`npm run writer:status`** · start: **`npm run writer`** · restart: **`npm run writer:restart`** (do not start a second writer if port 8787 is already in use). Setup: [Mac](docs/MAC.md) · [Windows](docs/WINDOWS.md).

On a dev Mac you can also turn on **Remember Wikipedia when not in the library** so a gap is saved into `taught_facts.js` from English Wikipedia (writer on port **8787** required—only one process on that port; **`Address already in use`** means it is already running). That works when the chat says **not in the library**, when only the **small network** matched, or when the library gave a **loose** word overlap—not only on a bare miss. Gates live in **`wiki_lookup.js`**; run **`npm run test:wiki`** after changing them. **Teaching ids** (manual Add, Remember, and **`wiki:learn`**) share **`nextId`** from the writer and skip pack-owned numbers (e.g. gemstone **4001–4040**); run **`npm run audit:ids`** after bulk changes. Saved rows show in chat as **Deep network learned #id** (category **Wikipedia** in the file). Full pipeline: [MODEL.md — Wikipedia learning](./MODEL.md#wikipedia-learning-and-manual-lessons-together) and **Teaching ids** under **Page** in the same file.

---

## The page

Open [`neural_lab.html`](neural_lab.html) directly in a browser (Chrome, Safari, Firefox, Edge). That is the page to use and to edit. Opening the folder loads `index.html`, which forwards to the same page.

The chat, the lesson library, and both networks run in the page. No server is required to ask a question. Storing a new Teaching lesson needs the writer in [On another computer](#on-another-computer). Teaching one library lesson into the deep weights uses the Python command in [MODEL.md](./MODEL.md#teach-a-new-lesson-to-the-deep-network).

While you type, the prompt corrects and completes words from the lessons, the notes you added, and the deep network. It also lists up to five matching questions. A note saved as a plain sentence still offers “what is …” or “when was …”. Arrow keys and Enter accept a question. A word row only replaces the word you are typing. Escape closes the list. “What is” and “when” choose between two notes about the same subject.

### What the page stores

1. **Lessons** in the `*_facts.js` files. `pack_manifest.js` loads them, and the page also loads `taught_facts.js` directly. Teaching deep lessons live in grouped categories (`TAUGHT_GROUPS` and `//` sections in that file). The counter beside the prompt is built-in library lessons plus Teaching rows. The short lines are not in that number.
2. **Small network** lessons (sky, ice, yes/no, and the other short lines) live in the page. A new short line, or a removal, is `short_added.js`. Short lines are kept in groups. The Teaching panel asks which group a new short line belongs to. The page does not train this network.
3. **Deep network** weights in `stage3_brain.js`. They change only when `--learn-new` saves.

The right-hand panel draws the latest question when the deep network stays on the lesson. Attention is the last step of that lesson: the word just read, the earlier words this block is using, and the next word it prefers. Signal plays the same pass as a grid of tokens and units. A matched lesson is shown as the full stored sentence. Two matching lessons are two cards, each with its source. Each answer block in the chat (small network, deep library, optional **Online · Wikipedia** paragraph) has its own **Copy** button. Built-in lessons are labeled **`from Category #id`**; rows saved from Wikipedia show **`Deep network learned #id`**.

### Wikipedia (dev machine)

| Toggle | Effect |
|--------|--------|
| **Use Wikipedia summaries in chat** | Adds **Online · Wikipedia** with a link when lookup runs (after local answers). |
| **Remember Wikipedia when not in the library** | Saves a gated summary into `taught_facts.js` when the deep library did not really answer. |

Both need a reload after you change them. Remember needs the writer on the machine that owns the files (`npm run writer`, or `python3 save_taught.py --install` on a Mac). The deploy/FTP zip has display lookup only—no Remember, no writer.

**Quality check:** `npm run test:wiki` (see `scripts/test-wiki-remember.mjs`). Gates use **`wikiTopicWords`** so template questions (“main types of …”, “examples of …”) match the right article; **`compressWikiForLesson`** handles abbreviations such as **U.S.** when trimming saves.

### On another computer

| Machine | Guide |
| --- | --- |
| Mac laptop | [docs/MAC.md](docs/MAC.md) |
| Windows desktop | [docs/WINDOWS.md](docs/WINDOWS.md) |

Clone [github.com/m-milde/midel](https://github.com/m-milde/midel), install the two venvs from the OS guide, then use the same commands on both: **`npm run writer`**, **`npm run learn:new`**, **`npm run trainer:joint`**. Pull before you teach or train; push after a finished save. Only one machine should write `taught_facts.js` or `stage3_brain.js` at a time.

For static FTP or the web, upload **`dist/midel-YYYY-MM-DD-deploy.zip`** (only the files the page loads). For another computer with trainer and writer you can also use **`dist/midel-YYYY-MM-DD-dev.zip`**, or just `git clone`. Both zips unpack to a folder named `midel`. The deploy archive does not need Python. Create a new pair from this folder with **`npm run backup`** (see [MODEL.md](./MODEL.md#backup)).

1. Open `midel/neural_lab.html` in Chrome, Safari, Firefox, or Edge. Opening the `midel` folder loads `index.html`, which forwards to the same page.
2. Built-in library lessons plus Teaching rows in `taught_facts.js` answer immediately after reload.

To put the same folder on the web, upload the contents of `midel` to a static host. Adding or removing a lesson does not work on that host — the writer has to run on a computer that can change `taught_facts.js` and `short_added.js`.

To add or remove a lesson from the Teaching panel, start the writer first (`npm run writer`, or `python3 save_taught.py --install` on a Mac). A short line is stored in the small network. A full lesson is stored in the deep network. The page keeps it only after that write.

---

## 📚 Step-by-Step Python Learning Scripts

If you want to study the core Python code behind each concept:

| Step | Script | Concept |
| :--- | :--- | :--- |
| **Step 1** | [`step1_single_neuron.py`](step1_single_neuron.py) | A single neuron, weights, bias, and Sigmoid activation (pure Python, zero dependencies) |
| **Step 2** | [`step2_learning.py`](step2_learning.py) | How learning works: Gradient Descent & Loss on an AND gate |
| **Step 3** | [`step3_network.py`](step3_network.py) | Multi-layer networks: Hidden layers and Backpropagation on XOR |
| **Step 4** | [`step4_interactive.py`](step4_interactive.py) | Interactive CLI sentiment teaching (Bag-of-Words) |
| **Step 5** | [`step5_transformer.py`](step5_transformer.py) | Causal Self-Attention Transformer (Micro-GPT) solving question answering |

### Running the Python scripts:

```bash
# Step 1 (pure python) — Windows: py step1_single_neuron.py
python3 step1_single_neuron.py

# Steps 2-5 (NumPy venv). Prefer: npm run learn:new for the live lab brain.
# Mac: .venv/bin/python step2_learning.py
# Windows: .\.venv\Scripts\python step2_learning.py
```

### Lab tooling (from this folder)

```bash
npm run backup        # deploy + dev zips, PDF, MODEL brain stats
npm run test:wiki     # Wikipedia save/lookup regression checks
npm run wiki:learn -- wiki-learn-expanded.md --limit 20 --delay 5000
npm run wiki:unmark-x -- wiki-learn-expanded.md   # clear mistaken [x] marks
npm run learn:new              # one deep-network lesson (highest pending id)
npm run learn:new:loop         # repeat until queue empty (see learn-new.log)
npm run learn:new:loop -- --max 50
npm run audit:ids       # id collisions (taught vs packs, packs vs packs), per-file ranges, next free id
```

**Typical workflow:** writer on **8787** (restart after `save_taught.py` upgrades) → **`wiki:learn`** in chunks → **`npm run audit:ids`** if you edited ids by hand → **`learn:new:loop`** to install **Wikipedia** rows into **`stage3_brain.js`**. Do not loop with `grep "still only in the library"`. To skip a stubborn lesson, add its id to **`skipped`** in `stage3_learned.json`. See [MODEL.md — Teach a new lesson](MODEL.md#teach-a-new-lesson-to-the-deep-network) and [MODEL.md — Stable operations](MODEL.md#stable-operations-oct-2026).

**Long-term direction:** incremental scale-up, eval harness, tokenizer v2, optional pretrain/fine-tune — [ROADMAP.md](./ROADMAP.md) (phases A–E; Bulgarian track in MODEL.md).

**Batch Wikipedia teaching** (`scripts/wiki-learn-batch.mjs`): reads bullet questions from **`wiki-learn-expanded.md`** or **`wiki-learn.md`**, skips solid library hits, fetches English Wikipedia (direct lookup in Node by default), applies the same **`evaluateWikiSave`** gates as Remember, and appends **Wikipedia** rows via **`POST /taught`**. Marks **`[+]`** only when saved (or solid-library); **`[x]`** when no article is found; gate skips, duplicates, and rate-limit errors stay unmarked. Flags: `--dry-run`, `--limit`, `--offset`, `--delay` (default **4000** ms), `--retry-x` (re-run **`[x]`** lines), `--direct` (write without HTTP), `--no-mark`, `--writer-lookup` (optional double lookup via the writer). **`save_taught.py`** must be running for saves unless **`--direct`**. Log: **`wiki-learn-batch.log`**. Full detail: [MODEL.md — batch Wikipedia learning](MODEL.md#batch-wikipedia-learning-from-wiki-learnmd). **Also planned:** Bulgarian / Cyrillic lessons and optional **bg.wikipedia**—see [MODEL.md — Future: Bulgarian knowledge base](MODEL.md#future-bulgarian-and-cyrillic-knowledge-base).
