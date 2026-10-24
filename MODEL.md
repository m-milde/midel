<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Midel — resume notes

> **21 Oct 2026 — deep network rebuild:** the current deep network will be discarded and rebuilt from scratch. The plan, measured facts, target sizes and runbook are in **[DEEP_NETWORK_REBUILD_PLAN.md](./DEEP_NETWORK_REBUILD_PLAN.md)**. Until that rebuild is done, do not run long `learn:new:loop` sessions expecting them to improve recall.


The model is named **Midel**. Updated **4 October 2026**, so the next session can start from the machine as it is. Open `neural_lab.html`. That is the only page to edit. `index.html` only forwards the browser there, so opening the folder still lands on the lab.

**Forward plan (LLM direction):** [ROADMAP.md](./ROADMAP.md) — phases for knowledge pipeline, deep-network quality, scale-up, and pretrain/fine-tune tracks. This file stays the **operational resume**; the roadmap stays the **strategy**.

The page is opened as a file, or as a static folder on the web. Nothing is trained in the browser. A short line added from Teaching is stored in the small network (`short_added.js`), inside the group chosen in the Teaching panel. A full lesson is stored in the deep network’s lesson file (`taught_facts.js`). The page keeps the lesson only after that write succeeds. On another computer, or from a static host, open `neural_lab.html` from `dist/midel-2026-09-29-deploy.zip`. Chat needs nothing else. New Adds need **`npm run writer`** on the machine that owns the files (or `python3 save_taught.py --install` on a Mac). A static upload cannot run that writer, so Adds stay on a computer where the writer is running. Setup: [docs/MAC.md](docs/MAC.md) · [docs/WINDOWS.md](docs/WINDOWS.md). Steps are in [README.md](./README.md#on-another-computer).

`neural_lab_classic.html` is the backup of the older screen. It does not load gemstones, chemistry, the chat, or the side diagrams. Leave it alone.

---

## What answers a question

Three pieces work together. They are not one set of weights.

1. **Library.** A searchable list of lessons. This is what the chat sentence usually comes from.
2. **Small network.** The short lines (sky, ice, grass, yes/no, and the ones you add in that style). They are stored with the page and in `short_added.js`. The page answers by matching the stored line. It does not train those weights in the browser.
3. **Deep network.** A wider transformer whose weights are the file `stage3_brain.js`. It checks a lesson and sometimes continues it. Full lessons you add are stored in `taught_facts.js` and the chat answers from that file. They join the weights only with the command in [Teach a new lesson](#teach-a-new-lesson-to-the-deep-network).

A question in the prompt only asks. A short line (a question with an answer of one to three words, or a statement of two to five words) is stored in the small network. A plain statement of about six or more words, with no question mark and not an instruction such as “explain” or “list”, is stored in the deep network. The Teaching Add box uses the same split. For a short line, **Group for a short line** chooses which comment group in `short_added.js` receives it. For a full lesson, **Group for a full lesson** (or a typed new category) chooses the `//` section in `taught_facts.js`; new names are appended to `TAUGHT_GROUPS` and the header comment list. Add and Remove write the file before the page keeps the lesson. On this Mac the writer stays running, so the click itself stores the lesson. The original 111 short lines already live in the page. New short lines are the `added` list in `short_added.js`, 17,972 lines in 26 groups (18,083 short lines in all with the 111 built-in; implied weights 752,736, vocabulary 11,600 — see `short_added.meta.js`). Removing an original line records it under `removed` in that same file. The writer edits that file in place, so the group comments stay.

---

## Library

`pack_manifest.js` loads every lesson pack. The page also loads `taught_facts.js` directly so Teaching lessons stay available even if the manifest list is stale. `science_library.js` starts with the science and geography lessons, then appends every other `*_LIBRARY` list except `TAUGHT_LIBRARY`. Teaching lessons are counted separately. The writer refreshes the manifest when a new `*_facts.js` file appears in this folder and always keeps `taught_facts.js` in that list when the file exists.

| Pack | File | Lessons | Ids |
|---|---|---|---|
| Science and geography | `science_library.js` | 100 | original ids |
| Biology | `biology_facts.js` | 34 | 1003–1040 |
| Math | `math_facts.js` | 39 | 2001–2040 |
| Gemstones | `gemstone_facts.js` | 40 | 4001–4040 |
| Chemistry | `chemistry_facts.js` | 158 | 5001–5040 and 6001–6118 |
| Geography | `geography_facts.js` | 82 | 7001–7040, 8001–8040, plus 8041 Venezuela and 8042 Lake Titicaca |
| Skills | `skills_facts.js` | 9 | 9001–9003, 9005, 9007–9011 |
| Artificial intelligence | `ai_facts.js` | 100 | 11001–11100 |
| Design | `design_facts.js` | 200 | 12001–12200 |
| Bulgarian history | `bulgarian_history_facts.js` | 200 | 13001–13100, 13301–13400 |
| Materials | `materials_facts.js` | 128 | 6673–6800 |
| Scientists | `scientists_facts.js` | 100 | 13101–13200 |
| Teaching | `taught_facts.js` | 2,453 rows | **3001+** (skips pack blocks, e.g. **4001–4040** gemstone) — **Teaching ids** below |

Built-in total: **4,215** (science 100 plus **26** subject packs, counted 13 Oct 2026 from the loaded page, including Materials, Bulgarian history, and Scientists). The Teaching lessons are extra, in named categories (Earth and land, Science, Sky and space, **Wikipedia**, and others). The prompt counter is **4,215 + Teaching rows** (3,489 Teaching rows today) loaded from `taught_facts.js` (reload after Remember or Add). The page lists Teaching lessons under Deep network with a category tag on each row. They are not part of the 4,215. Most of them are stored sentences with no question of their own, so the chat can show them and `--learn-new` does not push them into the weights. A trailing comma after the last lesson in a `*_facts.js` file is valid in the page, and the trainer accepts it. Use straight quotes in those files. Curly quotes stop the trainer from reading the pack.

Skills currently in the file:

| Id | Question |
|---|---|
| 9001 | How long does honey last? |
| 9002 | Which planet rotates backwards? |
| 9003 | What is a token in AI? |
| 9005 | What is the attention mechanism? |
| 9007 | What is backpropagation? |
| 9008 | What is machine learning? |
| 9009 | Which are the planets in the solar system? |
| 9010 | virus vs bacteria? |
| 9011 | What is a Lippmann plate? |

Source text kept beside the scripts: `science_geography_facts.json`, `gemini_knowledge_prompt.txt` (biology prompt plus the pasted JSON), `math.txt`, `gemini_gemstones_prompt.txt`, `gemstones.txt`, `chem1.txt`, `chem2.txt`, `geo1.txt`, `geo2.txt`, `practice_questions.txt`.

Search scores lessons by how much of the question’s topic words they contain, with common words weighing less. A hit is strong at coverage 0.72 or above, and the page shows an answer only at that line. Matching treats close word forms as the same topic word, so “found” can match “founded” and “virus” matches “viruses”. A “when” question can still reach a dated lesson when one extra word is off but the subject and the stored question overlap. A “who” or “what” question prefers a lesson whose own stored question uses the same kind of ask. “How many” and “how much” mark a count question. The words “many” and “much” do not have to appear in the lesson. Among lessons that state a number, a fact you added wins a tie. A stored question of at least two content words that matches what you asked wins over a saved note that only shares the topic. A word that appears only after “than” is a comparison, not the subject, so “planet earth?” does not return the Jupiter sentence. Two lessons can be shown together when they add different words or nearly tie, and the chat draws them as separate cards. “What is the capital of Mars?” stays unknown.

The chat sentence is the full stored lesson. The deep network does not replace it with a shorter continuation. Yes or no is decided from the clause that mentions the subject, and the network’s yes or no is shown only when it matches that rule.

A fact you added is the answer when it covers at least as many topic words as the best built-in lesson, unless a built-in lesson’s own question is the question you asked. That is why “virus vs bacteria?” returns Biology #9010, while an older note about Mars does not replace “Which are the planets in the solar system?” When two notes share one topic, “what is” prefers the note that says what the thing is, and “when” prefers the note that gives a time.

Skipped on purpose: math lesson “What is zero?” because it collides with absolute zero. Several biology lines were skipped earlier for the same kind of overlap. Chemistry was kept, including pairs that now show as two cards.

---

## Small network

Described in `neural_lab.html`. One block, width 32, one head, context 64, seed 7. The page does not run its training and does not keep a browser copy of its weights.

`CURRICULUM.master` is 111 short lines. New short lines and removals are `short_added.js`. Those added lines are grouped under 26 comments (Shapes and numbers, Time and the calendar, Directions and maps, Sky and space, Weather and water, Earth and land, Animals, Plants, Living things, Body and health, Food and drink, Home and rooms, Clothes, Vehicles, Computers and information, Electricity and machines, Materials and physics, Tools and everyday objects, Measurement, Science, Writing and language, Art and media, Sports and exercise, Money and shops, Places, People and daily life). The load diagram counts the weights that shape implies from the words in the lines now stored. The chat answer for these lines is the stored answer, not a browser training pass.

Statement facts (no `?` in the line) also get **derived question forms in memory** when a question is asked: `what is X`, `X`, `what does X do`, `what joins X` when the sentence has a verb, and similar. Nothing extra is written to `short_added.js`. Matching uses the same stem rules as explicit question lines.

**Large `short_added.js`.** The page no longer parses that file at initial load (that blocked the UI on tens of thousands of lines). **`short_added.meta.js`** (tiny, loaded with the page) holds **lesson count, vocabulary, and implied weight total** for the full small network so Network Load stays accurate before the first Ask. Regenerate it with **`npm run sync:short-stats`** after bulk edits, or automatically when **`save_taught.py`** writes `short_added.js`. **`npm run backup`** also refreshes meta and stamps **`short_added.meta.js?v=<lessonTotal>`** in `neural_lab.html` (like `stage3_brain.js`). **FTP deploy:** the **deploy zip** embeds **`SHORT_ADDED_STATS` inside `neural_lab.html`** (no separate meta request). Still upload **`short_added.js`** for answers. Re-run **`npm run backup`** and upload the **new** `neural_lab.html` from the zip; hard-reload. On boot the page **fetches meta with `cache: no-store`** so stale CDN/browser cache does not show 111-lesson stats. Apache **`.htaccess`** sets **no-cache** on both short files when mod_headers is on. On the **first Ask**, the lab **fetches** `short_added.js`, builds a **word index**, and searches only **~160 candidate lines** plus the 111 built-in curriculum lines — not a full scan every time.

There is no Settings menu. Teaching stores a lesson only through the writer.

Tokenizer: lowercase, commas inside numbers removed, then numbers, words, and `? . ! ,`. A leading minus on `-273.15` is dropped. `ñ` in “El Niño” is dropped.

---

## Deep network

Installed file: `stage3_brain.js` (16,605,792 bytes). The page loads it as `stage3_brain.js?v=4691`. A successful `--learn-new` updates that number to the new vocabulary size so a reload does not keep the previous weights. The load diagram counts **1,745,408** weights.

| Setting | Value |
|---|---|
| Blocks | 4, pre-norm |
| Width | 128 |
| Heads | 4 (head size 32) |
| Context | 128 |
| Vocabulary | 4691 |
| MLP | width 256, ReLU |
| Seed | 7 |

`stage3_learned.json` lists ids **installed** into weights and ids in **`skipped`**. Counts change every `--learn-new` run — read **`LEARN-NEW-QUEUE`** in the trainer log (`installed=… pending=… teachable=…`) or inspect the JSON. The trainer always takes the **highest** teachable id not yet installed or skipped, so high pack ids (e.g. Bulgarian **130xx**) can run before older Teaching/Wikipedia rows with lower ids. Venus (**9002**) stays skipped because learning it flipped the Sahara and Mercury checks. The chat answers from the library even when a continuation has drifted.

A new lesson is practiced together with up to **64** recent installed lessons that still answer (see below). The first try can learn the new name and drop one of those replayed lessons; rescue then rehearses the dropped ids before it gives up. A failed rescue does not replace the previous brain file.

Each new lesson is practiced together with the **most recent** installed lessons that still answer (up to **64** replayed per run—not every id in `stage3_learned.json`, or epochs would take forever once hundreds are installed) and with the four yes/no checks. The save still requires the new needle word, zero loss among that replay set, and the gates. That does not put a forgotten lesson back outside the replay window.

Do not start another full 80-epoch train, and do not run `--absorb`. Use the command in the next section instead.

**Future work (after subscription reset):** The one-lesson **`--learn-new`** loop **forgets** most installed ids over time (~8% needle pass is typical while gates still pass). The planned fix is **joint training** on **all** teachable rows in `*_facts.js` and **`taught_facts.js`** (full corpus, longer Teaching answers included), then safer incremental installs, **LM-like** chat generation, and a **compare/contrast** level. Step-by-step agent checklist: **[CURSOR_DEEP_NETWORK_FIXES.md](./CURSOR_DEEP_NETWORK_FIXES.md)**; strategy summary: **[ROADMAP.md](./ROADMAP.md)** Phase B and Phase C2.

Gates before any export:

- The Angel Falls continuation still contains 979.
- “Is the Sahara hot?” → yes.
- “Is Antarctica the largest hot desert?” → no.
- “Is Antarctica the largest desert?” → yes.
- “Is Mercury closer to the sun?” → yes.

Trainer: `train_stage3.py`. Run it with **`npm run learn:new`** (NumPy venv; Mac or Windows). `step5_transformer.py` is the earlier tutorial model (width 24, context 20). It is not this brain.

Inference: `deep_model.js`. `stage3Forward` also returns per-layer attention and the four heads’ view of the last word, for the side panel.

Vocabulary size, byte size, and weight count in this file are refreshed by **`npm run backup`**. Do not hand-edit those numbers after every install.

---

## Stable operations (Oct 2026)

Use this checklist when running long sessions:

| Terminal / service | Command | Touches |
|--------------------|---------|---------|
| Writer (once) | `save_taught.py --install` or LaunchAgent on **8787** | `taught_facts.js`, `short_added.js` |
| Wikipedia batch | `npm run wiki:learn -- wiki-learn-expanded.md --limit 20 --delay 5000` | `taught_facts.js`, markdown **`[+]`** / **`[x]`** |
| Deep install loop | `npm run learn:new:loop` | `stage3_brain.js`, `stage3_learned.json` |
| Brain eval (read-only) | `npm run eval` | nothing (report only) |
| Corpus length audit (read-only) | `npm run corpus:stats` | nothing (report only) |

**Safe together:** wiki batch + learn-new loop; writer + learn-new. **Not safe:** two writers on **8787**; editing `stage3_brain.js` or `taught_facts.js` by hand while loops run. With **`neural_lab.html` open**, Add/Remove used to **replace the whole** `taught_facts.js` from an in-memory list that could lag behind disk (wiki batch or manual edits)—rows logged as **SAVED** could vanish. The writer now **merges by id** on **`POST /taught`** (optional **`deletedIds`** on Remove). The page reloads Teaching from **`GET /taught?facts=1`** after each save and when you return to the tab if the disk count is ahead. **Restart `save_taught.py`** after upgrading so merge is active. Rows still need **`npm run learn:new:loop`** (or a single **`--learn-new`**) to enter **`stage3_brain.js`**; chat reads the library immediately after sync.

**Trainer constants (see `train_stage3.py`):** `HELD_REPLAY_MAX = 64` (recent-lesson replay cap); `answer_needle()` skips weak glue words so gates use distinctive needles.

**Brain health (`npm run eval`).** Read-only: loads `stage3_brain.js` and runs the same **`fact_known`** needle test as `--learn-new` held replay on every id in **`stage3_learned.json` → `ids`**, plus Sahara/Mercury **gate** and Angel Falls **979**. Writes nothing. Use after a long **`learn:new:loop`** or weekly. **`npm run eval:strict`** exits non-zero if any lesson drifted or a gate fails. A low “still answer” percentage is common—the needle test is stricter than showing full library text in chat; **`drifted`** ids are candidates for **`relearn`**, not proof the library row is wrong.

**Corpus length audit (`npm run corpus:stats`).** Read-only. Measures how many tokens every teachable lesson takes once packed for training (question + answer, using the trainer's own `tokenize` and `pack_qa`) and compares that with the network's context window (`MAX_LEN`, 128). It answers one question before any joint training: does the library fit the network, or must the context or network grow first?

*How to read it.* **Length buckets** (short ≤64, medium 65–128, long >128) are the same buckets the stratified eval will use. **Share that fits each context size** shows what a bigger window would cover. **Over 128** counts the lessons that do not fit; the trainer keeps the *end* of a long pack, so the start of the question is cut off for those. **Vocabulary** lists distinct tokens and how many appear only once (rare words grow the embedding table without helping the network). **Duplicate ids** are ids used by more than one lesson. The last line, `CORPUS-STATS … verdict=FIT|LONG-TAIL|MISFIT`, applies the rule from `CURSOR_DEEP_NETWORK_FIXES.md` Step 1b: **MISFIT** (median above the window, or over half of the lessons too long) means a bigger context first; **LONG-TAIL** means joint training with chunk packs for the few long ids; **FIT** means everything fits.

*When to run it.* After a big batch of new lessons (Wikipedia batch, a new `*_facts.js` pack, any automatic source), and once more on the frozen library right before a joint or from-scratch retrain. It takes a few seconds, uses no GPU and does not need the writer on 8787 or the learn-new loop to be stopped.

*Options.* `--max-len N` tests a different window (for example `-- --max-len 256` for a bigger network); `--top N` lists the N longest lessons; `--json PATH` writes a machine-readable report; `--csv PATH` writes one line per lesson (id, category, tokens, bucket) for inspection in a spreadsheet. Write the files somewhere outside the library, for example `/tmp/corpus.csv`; the script refuses names that look like `*_facts.js`, `taught_facts` or `stage3_*`.

*Safety.* It changes nothing in the library, `stage3_brain.js` or `stage3_learned.json`. It imports `train_stage3.py` only for its tokenizer and row loader (training runs only under `__main__`), so Python may refresh `__pycache__/`.

*First measurement (12 Oct 2026, 6951 teachable lessons).* Median 40 tokens, p95 68, max 159. 92.7% are ≤64, 7.3% are 65–128, and only 4 lessons exceed 128 (`CORPUS-STATS … verdict=LONG-TAIL`). So the 128-token context is **not** the bottleneck today. The open capacity questions are the number of weights versus about 17.7k distinct tokens (35% appear once) and the 83 ids that two different fact files both use (see **Ids** below).

**`--learn-new` learning rate.** Default schedule: **warmup** (0.0001 → 0.0006 over 2 epochs) then **cosine decay** over 16 epochs; rescue phase uses the same shape with peak **0.0003** over 12 epochs. Legacy flat LR: `npm run learn:new -- --flat-lr`.

**Wikipedia batch:** duplicate = same **question** already in `taught_facts.js`; identical article text under a **different** question is saved separately. **`SKIP duplicate`** does not mark **`[+]`**.

**Ids:** `npm run audit:ids` after bulk Teaching edits. **Update 14 Oct 2026:** `audit:ids` now also checks packs against each other (duplicate ids across or within `*_facts.js` files fail it), prints a per-file table (count, first and last id), the highest id overall and the next free id. Gaps inside the Teaching sequence are only a warning. **History (12 Oct 2026):** it used to check Teaching ids against packs only; `npm run corpus:stats` also reports ids used by more than one teachable lesson across packs. On 12 Oct 2026 it found 82 pack-vs-pack clashes (`food_facts.js` and `sport_facts.js` rows sitting inside the blocks `geography_facts.js` owns). **Fixed:** those 82 rows were renumbered to 13201–13282 (content unchanged; map in `versions/id-renumber-2026-10-12.json`, originals in `versions/food_facts-pre-id-fix-2026-10-12.js` and `versions/sport_facts-pre-id-fix-2026-10-12.js`). The 82 new ids are not in `stage3_learned.json`, so they show as pending for the deep install. **Still open:** id 9509 is used by `science_fiction_facts.js` and by a broken Teaching row (no question, stray `"text":` fragment about toxins); `audit:ids` lists it, and the writer renumbers a clashing Teaching id on its next save. Delete or repair that row in the Teaching panel.

Strategy and future model work: **[ROADMAP.md](./ROADMAP.md)**.

---

## Teach a new lesson to the deep network

Use this after you add a lesson to a `*_facts.js` file and you want the deep network to know it, not only the lesson list. Saving the file and reloading the page is enough for the chat sentence. It does not change the weights. The side diagram stays empty for that lesson until this command succeeds.

From this folder:

```bash
npm run learn:new
```

What one run does:

1. Finds the newest lesson id that is not already taught or skipped in `stage3_learned.json`.
2. Teaches that one lesson to the installed weights. It does not start a full training run.
3. Saves `stage3_brain.js` only if the new name appears, the lessons that still answer stay in place, and the old checks still pass (Angel Falls 979, Sahara, Antarctica, Mercury). The same save points `neural_lab.html` at that new file. A new lesson is practiced as often as those older answers so it does not push them out.
4. If the new name is in and the old checks pass, but it pushed another installed lesson out, that run practices the dropped lesson again before it gives up. If the checks still fail, it leaves the previous weights in place, appends that id to **`skipped`** in `stage3_learned.json`, prints **`NOT INSTALLED`**, and the next run moves on.

**Skip a lesson manually.** Add its id to the **`skipped`** array in `stage3_learned.json` (same effect as a failed run). The lesson stays in the library for chat; only weight training moves on. Example: **#13022** (Cyrillic alphabet) was skipped after repeated failed installs.

**Slow runs / log lines.** Each epoch prints **`learn epoch NN start`** then **`absorb epoch`** when it finishes. After epoch 4, **`LEARN … known retention ok`** means the new needle and replay set passed; **`retention lost N`** means training dropped an older replayed lesson—epochs continue up to 10 (+ rescue). With the **64-lesson replay cap**, epochs are much shorter than when the trainer mixed in 500+ held rows. **`held False`** in old logs meant retention failed (misleading label); new logs say **`retention ok`** or **`retention lost N`**.

The side diagram draws when the continuation stays inside the lesson and contains at least one real content word. The chat still shows the full stored sentence. The attention drawing is the last step of that continuation: the word just read, which earlier words this block is using, and the next word it prefers. It is not a score of the question. The Signal card plays the same pass back as a grid. A short line such as “honey never spoils” is enough for a diagram when the continuation stays on it.

Then reload the page and ask the lesson’s question. Run the same command again to teach the next waiting lesson. One run teaches one lesson.

**Queue order.** “Newest” means the **highest numeric id** among lessons that have both **question** and **text** and are not in `stage3_learned.json` (installed or **skipped**). Pack ids beat Teaching ids when higher: e.g. Bulgarian **13021** runs before a **Wikipedia** row at **4137** in `taught_facts.js`. Adding Teaching rows increases **`pending`** count but does not change order unless new ids exceed the current head.

**Automated loop (recommended).** Do **not** use `while … | grep -q "still only in the library"` — that substring is printed after **every successful** install while thousands of lessons remain, so the loop never means “stuck on one lesson”; it only means “queue not empty.” A failed install prints **`skipped`** without that phrase and would **stop** the old loop early.

```bash
npm run learn:new:loop              # until LEARN-NEW-STATUS queue-empty
npm run learn:new:loop -- --max 30  # cap runs per session
npm run learn:new                   # single lesson once
```

`scripts/learn-new-loop.mjs` (or the Mac helper `scripts/learn-new-loop.sh`) appends to **`learn-new.log`**, exits on **`LEARN-NEW-STATUS queue-empty`**, and continues after **`installed`**, **`skipped`**, **`relearned`**, **`relearn-deferred`**, or **`install-deferred`**. A failed install is **deferred** (retried after other pending lessons), not permanently **skipped**, until four failures on the same id. Each run prints a human line and a machine line for progress:

- **`deep network: N installed …, S skipped, P waiting … (T teachable …)`**
- **`LEARN-NEW-QUEUE installed=N skipped=S pending=P teachable=T`**

Then **`LEARN-NEW-STATUS installed|skipped|queue-empty id=… pending=…`**. The loop echoes the queue summary after each install or skip.

**Wikipedia batch + `--learn-new` together.** Safe pattern: run **`npm run wiki:learn -- wiki-learn-expanded.md --limit 20 --delay 5000`** in one terminal (needs **`save_taught.py`** for saves), then **`npm run learn:new:loop`** in another—or run learn-new on a schedule. Wiki batch only grows **`taught_facts.js`**; weights change only via **`--learn-new`**. Avoid editing **`stage3_brain.js`** or stopping a loop mid-write (wait for `;` at end of file before backup). Hard lessons may train many epochs; use **`skipped`** in `stage3_learned.json` if you need to move on manually.

A full lesson added from the Teaching panel, or a plain statement stored from the prompt, is written into `taught_facts.js` before the page keeps it. The chat answers from that file. This command reads that file with the other lesson files, but it teaches only a lesson that has its own question, and only when that id is the newest one still waiting. A Teaching note with no question stays in the chat and is not pushed into the deep weights. A short line is not part of this command. It is stored in `short_added.js`.

---

## Page

Dark chat. Empty state: “Where should we start?” There are no starter questions under that line. The lockup `midel-logo.png` sits at the top of that screen, and the left rail shows only the mark, `midel-mark.png`. Both are drawn with `grayscale(.9)`. Behind the prompt, three smoke clusters fade in at random places and fade out again. They are not tied to the neurons. A fine grain is stamped once over the smoke and the neurons, one device pixel per speck, kept light. The rest of the screen stays dark. Neurons fire across the page in depth, at the earlier size, with hard pixel edges: a cell nearer the front is larger, a cell farther back is smaller and dimmer, and each one drifts forward and back. A spike shows a cell body with a few short dendrites, a cool pulse that shifts toward violet as it travels, and a gold point where the signal arrives. The question field is a solid dark field with a blue ring when it is focused. It has no glass blur. If the system asks for reduced motion, the field is painted once and the circuits do not run. The earlier flat circuit look is saved in `versions/neural_lab-glow-v1.html`. Reloading the page does not announce the 111 short lines. Left rail: the mark starts a new chat, the pencil opens Teaching, the diamond shows or hides the diagrams. The plus inside the composer also opens Teaching. There is no Settings menu and no Train button.

Teaching is a column of cards: Add a lesson (group menus for short lines and full lessons, plus an optional new category name for deep lessons), Deep network, Small network, and Network load. On a wide window the home logo and prompt sit in the space beside that panel. Network load draws both networks on one scale. The small bar is the architecture count for the short lines now stored. The deep bar is the live weight count, 1,732,608 (counted from the installed brain file, as the page does).

Each chat answer block (except “Remembered” / “Already known”) has its own **Copy** button. It copies only that block’s text (small network line, deep library sentence, or online paragraph)—see **Chat layout and Copy** below.

The prompt checks spelling against the lessons, the notes you added, and the deep network’s words. A finished word that is one or two letters off a known name is replaced when you type the space. As you type at least two characters, up to five lines appear: a corrected or completed word, then matching questions. A note with no question of its own still offers “what is …” or “when was …” from its sentence. Click a question, or highlight it and press Enter, to ask it. A word row only replaces the word you are typing. Escape closes the list.

The right panel scrolls on its own. It shows, for the latest question: the path taken, lessons considered, an animated attention drawing, the attention grid, a signal grid, the four heads, and the next word the network preferred. The title stays fixed while the cards scroll. Sizes of both networks stay on the Teaching panel’s Network load card.

Read the attention card as one moment, not as the whole answer. The sentence under the title is the chat’s stored lesson. The drawing is the last step while the deep network walks through that lesson. “just read” is the latest word already accepted. The curves are earlier words in that same sentence, and the percentages are how this block shared its look. The circle marked “now” is that same latest word. “next” is the word it wants to write after it. The Layer buttons are the four blocks. Layer 1 is the first look. Layer 4 is the last look before the next word is chosen. When the continuation leaves the lesson, the drawing stays empty instead of showing a stray guess.

The Signal card is a playback of that same deep pass. Columns are the tokens. Rows are the 128 units. The frames run from the tokens entering, through block 1 to block 4, then the preferred next words. A bright edge moves left to right. It is not a picture of every weight.

Under an answer, except “Remembered” and “Already known”, a link labeled **Ask Gemini** opens Google AI Mode for that question: `https://www.google.com/search?udm=50&hl=en&q=`. A direct `gemini.google.com` link does not prefill the question.

A local writer was wired to Ollama at `http://127.0.0.1:11434`, model name `qwen2.5:7b`. The download was stopped before the weights arrived, so that model is not installed. If it is missing, the page shows no extra paragraph. Do not start the download again unless asked. Ollama itself may still be installed (Homebrew, version 0.34.4) and its service may still be running. `OLLAMA_ORIGINS` was never set, so a `file://` page may be blocked from calling it even after a model exists.

**Installed vs library-only.** `stage3_learned.json` lists ids that `--learn-new` has saved into `stage3_brain.js`. The chat can answer from any `*_facts.js` file before that. The Signal and Attention panels need the lesson’s topic words in the brain file (for example `tantalum` after Chemistry **6073**, not `titanium` until **6022** is installed). The side panel says when a match is library-only.

When one library lesson matches (coverage about 72% or more), the chat may **show an answer the deep network writes** when that pass is **complete**: same question variants as training, tokens filtered to the lesson, key answer word present, and **`lessonNetworkAnswerComplete`** — enough token overlap and every stored sentence represented (multi-sentence Wikipedia rows need a signature word from each sentence, e.g. *interdisciplinary* on #4711). If the network only paraphrases the opening clause, the **full stored `text`** from `taught_facts.js` / packs is shown instead. Yes/no answers and two-lesson conflicts still use the library sentence (or the network yes/no vote when it agrees). The side diagram can still use the forward pass when a partial network line was rejected for display.

If the user asks a **shorter question** that is an exact prefix of a stored lesson question (same ask-word and topic words in order, e.g. “what is the strong force?” when the lesson question is “what is the strong force in physics?”), `science_library.js` treats that as the same lesson. When the small network also has a short line, the chat shows **both** answers—the short line and the full stored sentence (with source id).

**Typo-tolerant library match.** Every question token is spell-checked against **ask/stop words** (any position: **hat** → **what**, **whot**, missing letters). Remaining topic words are matched to each lesson’s vocabulary with the same rules: missing letters anywhere, dropped first letter, length-scaled edit budget (up to distance **2** on typical words, **3** on long ones), and **no match** when two candidates tie. Examples: **hat are infrared…**, **infrard**, **ultrviolet** → the same lesson as the correctly spelled question. (same first letter, length-aware cap: 1 edit for 4–6 letters, 2 for longer names). Ambiguous ties are rejected. Example: “Who is James **Maxuel**?” resolves to Scientists **#13125** (Maxwell) like the correctly spelled name. When typos helped but overlap is below 72% or some question words did not match, chat shows **Did you mean: …?** (click fills the composer). Very weak partial typo hits can still answer via **`tryPartialTypoPick`**. Regression check: **`npm run test:library`**. Wikipedia Remember still uses its own token normalizations in **`wiki_lookup.js`** (e.g. **forth** → **fourth**).

**Conversation context (24 Oct 2026, library/page side).** Each Ask used to be a new question. Follow-ups now keep the last topic. After “What is the capital of Bulgaria?” → Sofia, “And how many inhabitants does it have?” is looked up as “How many inhabitants does sofia have?” and answered from Geography **#13655** (about 1.3 million). Pronouns (`it`, `its`, `they`, `this`), a leading *and/also/what about*, or a short *what is the X / how / why* question are follow-up candidates — the page first looks for a lesson that names the last subject *and* the thing just asked (formula after quadratic → **#14699**, moons after Mars → **#9434**, size after Sahara). A bare **What is Earth?** / **What is nitrogen?** is a new subject even if the last answer mentioned that word (so Mars + “Earth-like” must not steal Earth). If the bind finds nothing, the original question is looked up on its own. Two or more new topic words, or an `of` other than the last subject, skip the bind. The thread still shows the words you typed; a quiet **Using earlier: Sofia** line marks a successful bind. Wikipedia, if used, must mention the same focus. The previous turn’s tokens are prefixed when the deep network generates. Stored in `chat_context.js`. `npm run test:context`.

**Chat layout and Copy.** While a turn is finishing (library match, optional Wikipedia lookup, Remember save), the thread shows the default **three breathing dots** inline where the reply will start, and the composer gets a soft glow so the wait feels intentional. Each answer block in the thread (small network, deep library, online paragraph) has its own **Copy** button that copies only that block’s text. Source lines under an answer use **`from Category #id`** for built-in and Teaching categories (e.g. `from Science #3208`). Rows saved automatically from Wikipedia (category **Wikipedia** in `taught_facts.js`) show **`Deep network learned #id`** instead of `from Wikipedia #id`. A misleading **loose library match** (shared word only) may appear as **Loose library match · …** until Remember replaces it with the saved Wikipedia row. **Ask Gemini** still opens Google AI Mode for the question.

**Several lessons for one prompt (library side, 13 Oct 2026).** Nothing here touches the weights; it changes only how `science_library.js` and `neural_lab.html` pick and show lessons.

- **Same question, several lessons.** When more than one lesson has exactly the question you typed (for example a Teaching row and two pack rows for "What are the Northern Lights?"), the chat shows each as its own block, up to **3**, each with its own source line and **Copy** button. Lessons with identical text show once. Yes/no answers stay a single answer. Only Teaching rows have a **Correct answer** button.
- **Topic prompts.** A prompt with **two or more topic words and no question word** ("The Odrysian Kingdom", "Bulgaria's population", "DNA sequencing") now finds lessons that are **about** the topic. A lesson counts when its text opens with exactly those words, or when its own question contains all of them (rule `lessonLeadsWithTopic` in `science_library.js`, used by the matcher and by `lessonAnswersAsked` in the page). A lesson that only mentions the words does not count. Single words, `when/where/who/why/how` prompts and typed questions behave as before. Before this rule, ties at 100% coverage went to the first lesson found, the page judged it not to answer the prompt, and the chat said "not in the library".
- **Several topic matches.** If more than one lesson is about the topic (up to 3), all show. The best one comes first and carries a quiet **BEST MATCH** tag at the top left (`.best-match` in `neural_lab.css`).
- **Wavy line.** A thin sine-wave line sits between answer blocks (`createSineSeparator`). Each line fades in when the answer below it starts typing, not before.
- **Deploy zip.** The `from Category #id` source lines are hidden (`.deploy-host .why`). The **BEST MATCH** tag stays visible, because it is not part of the source line.
- **Check used.** 2,406 prompts (questions, lower-case questions, bare topics, drawn from all packs and Teaching) were answered before and after the change. 76 changed, all from "not in the library" to an answer, none worse. Repeat this kind of before/after run after any change to matching.
- **Backups.** `versions/science_library-pre-topic-lead-2026-10-13.js`, `versions/science_library-pre-topic-several-2026-10-13.js` and the matching `neural_lab-pre-…html` copies.
- **Writer caution.** The writer on port 8787 rewrites `neural_lab.html` (script version numbers, library counts). Edit that file, wait a few seconds and check the edit is still there.

**Suggestions under an answer (13 Oct 2026, library side only).** After an answer has finished typing, a quiet row of clickable chips can appear above **Ask Gemini**. A click asks that question at once. The row also shows in the deploy zip (it is not part of the hidden source line).

- **DID YOU MEAN** — only after "not in the library", and only when the older typo hint did not already fire. `suggestCorrectedQuestions` in `science_library.js` tries one-letter fixes (missing, extra, wrong or swapped letter) on up to 3 words of the prompt, at most 18 test runs, and keeps only fixes that now find a real lesson. It offers the fixed prompt and the matching lesson's own question, up to 3, for example "where is ars?" gives "where is mars?" and "What is Mars?". A fix that adds a missing letter ranks above one that replaces a letter ("wher" gives "where" before "when"). Two typos in different words are not fixed.
- **RELATED** — after a normal library answer (not a loose match). `relatedQuestions` scores every other lesson that has a question by the **rare topic words** it shares with the lesson shown (a word must occur in under 3% of lessons), adds a small bonus for the same category, hides near-duplicate wordings, never repeats lessons already on screen, and never suggests a lesson from the **Poisons** category unless the answer shown is itself from it. Up to 3 questions. Answers from the small network alone have no row.
- **Cost.** The word index is built once per page load (about 1.7 s the first time, in the background after the answer; later calls take 20 to 500 ms). Nothing reads or writes the weights.
- **Limits.** Related questions are word overlap, not understanding, so some are loose (for example a crocodile next to the Odrysian Kingdom). After the deep-network rebuild, test whether the network's own representations do better (see `CURSOR_DEEP_NETWORK_FIXES.md`, Step 7b).
- **Backups.** `versions/*-pre-suggestions-2026-10-13.*`.
- **Name clash to avoid.** Global names in `science_library.js` share one scope with the page script. A first version called `suggestIndex` broke the whole page because `neural_lab.html` already uses that name; the helpers now start with `libSuggest`. Search the page for a name before adding a global to `science_library.js`.

**Chat scrollbar and home-screen animation.** The chat thread scrollbar is invisible at rest, fades in while scrolling and fades out about 1 second after (`.thread.scrolling`, small script at the end of `neural_lab.html`). The home-screen neuron animation runs automatically at all times. A version that fired neurons on each key press and paused the loop while typing was removed on 13 Oct 2026 because it slowed typing; a copy is in `versions/neural_lab-pre-typing-removal-2026-10-13.html`.

**`taught_facts.js` must end with `];`.** On 12 Oct 2026 one stray character after the closing `];` stopped the whole file from loading and broke `npm run test:library`. If the Teaching lessons vanish from the chat, check the end of the file first.

**Teaching ids (`taught_facts.js`).** All deep lessons you add outside the built-in packs share one **Teaching** sequence from **3001** upward: panel **Add**, **Remember Wikipedia** in chat, and **`npm run wiki:learn`**. They must **not** reuse ids from other **`*_facts.js`** files (gemstone **4001–4040**, chemistry **6000s**, Bulgarian **13001–13100**, etc.).

| Mechanism | Role |
|-----------|------|
| **`GET /taught`** | Returns **`count`** and **`nextId`**. Add **`?facts=1`** for the full Teaching array (page sync after wiki batch). |
| **`POST /taught`** | Body **`{ facts, deletedIds? }`**. Merges with disk by **id** (stale browser posts cannot drop wiki rows), then **`normalize_taught_fact_ids`**. |
| **`POST /taught/patch`** | Dev chat **Correct answer**: `{ id, text, question?, relearnDeep? }` updates one Teaching row; optional **`relearnDeep`** queues **`stage3_learned.json` → `relearn`**. |
| **Browser `nextLearnedId()`** | Prefers **`nextId`** from the writer; falls back to max id in file + memory. |
| **`wiki:learn` batch** | Reloads `taught_facts.js` from disk before each save; uses **`nextTaughtIdFromRows`** (same skip rules). |

**Layout.** Teaching ids are contiguous **except intentional holes** where a pack owns a block—for example **3001–4000**, then **4041–4137** (gemstone occupies **4001–4040**). **`nextId`** is the shared counter below (highest id in any lesson file + 1, **13655** on 14 Oct 2026), so new Teaching rows no longer fill holes between packs. Run **`npm run audit:ids`** after bulk saves or manual edits; it fails on duplicate ids, pack collisions or unreadable packs; stray gaps inside the Teaching sequence are only a warning (known unused hole: **8653–9000**, left from the old skip-ahead rule; do not renumber, ids are tied to the trained brain).

**Writer restart.** After changing `save_taught.py`, run **`npm run writer:restart`** (it waits up to 15 s for the writer to listen, then runs the health check; **`npm run writer:status`** repeats the check). Start it in the foreground with **`npm run writer`**. **`Address already in use`** on port **8787** means a writer is already running—you do not need a second copy. **`GET /taught`** includes **`"patch": true`** when the running writer supports **Correct answer** (`POST /taught/patch`). If save fails with “writer too old”, restart with **`npm run writer:restart`**.

**Duplicate questions.** The audit checks **ids** only; the same question text may appear twice under different ids (curate in Teaching if needed).

**Online lookup (optional).** In the left Teaching panel, **Use Wikipedia summaries in chat** turns on live lookup. When it is on, after your local library and networks answer, the page adds a short English Wikipedia extract as **Online · Wikipedia** with a link (unless it is nearly the same as the lesson already shown). Lookup runs for question-shaped prompts, for **not in the library**, and for short topic lines such as `berlin` or `ruse, bulgaria`—not only strings with `?`. On this Mac it tries `save_taught.py` first (`GET http://127.0.0.1:8787/lookup?q=…`); on **FTP / HTTPS** (or when the writer is off) the **browser** loads Wikipedia directly (`en.wikipedia.org`). Re-run **`npm run backup`** and re-upload the deploy zip after changing lookup code. Wikipedia text is [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) when shown or saved.

**Remember Wikipedia when not in the library (dev only).** A second toggle under Online lookup (hidden on the deploy/FTP build) saves when the **deep library did not really answer**. That includes:

| Situation | Example | Remember can save? |
|-----------|---------|-------------------|
| **Not in the library** | Unknown capital | Yes |
| **Small network only** | “speed of sound” + short “sound …” line | Yes (deep block added after save) |
| **Loose library overlap** | “what is time?” → time **zone** lesson | Yes (loose line may be dropped after save) |
| **Solid library answer** | “What is a time zone?” → #3721 | No |
| **Deploy / FTP host** | Any | No (read-only About panel) |

With Remember on, Wikipedia is still fetched for **saving** even if **Use Wikipedia summaries** is off. On a good hit it writes one trimmed lesson (category **Wikipedia**, one or two sentences) through **`POST http://127.0.0.1:8787/taught`**, same as Teaching **Add**. You get a toast on success; if nothing passes the gates, a toast says no close match was saved. Weights are **not** trained in the browser—run **`npm run learn:new`** per row. **`npm run writer`** must be running on the computer that owns the files (port **8787**); restart after changing `save_taught.py` with **`npm run writer:restart`**.

**Solid save gates (`wiki_lookup.js`).** Shared between the page, **`npm run test:wiki`**, and **`npm run wiki:learn`**. `save_taught.py` implements the same relevance rules on **`/lookup`** (restart the writer after changing Python lookup code). Before anything is written:

1. **Ranked candidates** — up to ten opensearch titles, then mediawiki search (plus extra phrases for single-word “what is …?” questions, e.g. stone → rock geology). The batch CLI uses the same walk in **`scripts/wikipedia-fetch.mjs`** (direct `en.wikipedia.org` from Node, throttled).
2. **Topic words** — **`wikiTopicWords`** drops template framing (**main**, **types**, **examples**, **history**, **difference**, **important**, and similar) so questions like “What are the main types of socialism?” match the **Socialism** article when the lede names the topic. Remaining anchors (e.g. **bird** and **fastest**) must appear in the chosen title or summary; substring traps (e.g. *Fastest Girl in Town* for “fastest bird”) are rejected. Common typos and plurals are normalized (e.g. **forth** → **fourth**). **Where is …?** questions ignore filler like **located**; the place you ask about (e.g. **Bulgaria**) must appear in the **article title**, not only in the body of a unrelated village article.
3. **Definition questions** — for `what is X` with one topic word, reject person/entertainment hits (wrestlers, songs); allow sensible redirects (e.g. **Stone** → **Rock (geology)** for “what is stone?”).
4. **Solid library** — if `lessonAnswersAsked` is true for a ≥72% match, do not save.
5. **Loose library only** — if every matched fact fails `lessonAnswersAsked`, Wikipedia may save when relevant (no need for the chat to say “not in the library”).
6. **Length and dedupe** — **`compressWikiForLesson`** keeps one or two sentences but can extend to four if abbreviations such as **U.S.** would otherwise push the trim below ~48 characters; skip duplicate question/text.

After changing gates, run **`npm run test:wiki`** in this folder. Curate or delete bad **Wikipedia** rows in Teaching if one slipped in before these gates.

---

## Wikipedia learning and manual lessons together

Three ways to grow what Midel knows. They stack; use more than one.

| Path | Where it lands | Chat after reload | Deep weights (`stage3_brain.js`) |
|------|----------------|-------------------|----------------------------------|
| **Teaching Add** (dev panel) | `taught_facts.js` or `short_added.js` | Yes, immediately after writer OK | One row per `--learn-new` if the lesson has a **question** |
| **Remember Wikipedia** (toggle, dev only) | `taught_facts.js`, category Wikipedia | Yes, same session once saved | Same as Add—queue with `--learn-new` |
| **New subject file** e.g. `skills_facts.js` | That `*_facts.js` + `pack_manifest.js` | Yes after manifest sync + reload | One id per `--learn-new` run, same queue rules |

**Automatic pipeline (Wikipedia).**

1. Open `neural_lab.html` with **`npm run writer`** so port **8787** is up ([Mac](docs/MAC.md) · [Windows](docs/WINDOWS.md)).
2. Turn on **Remember Wikipedia when not in the library** (and optionally **Use Wikipedia summaries** to always show the online paragraph).
3. Ask a question the deep library does not really answer (see table above). When English Wikipedia returns a summary that passes the gates, the writer appends a **Wikipedia** row. You get a toast when it saves.
4. Optional: turn on **Use Wikipedia summaries** to see the full extract and link (omitted when it would duplicate the saved text).
5. **Install into weights** when you want Attention/Signal on that topic: from this folder run **`npm run learn:new`** once per waiting lesson (see [Teach a new lesson](#teach-a-new-lesson-to-the-deep-network)). A long `--learn-new` loop in `learn-new.log` is fine; do not stop it for backup—wait until `stage3_brain.js` finishes writing (`;` at end) before copying for deploy.
6. **Ship to FTP:** `npm run backup`, upload the new **`midel-*-deploy.zip`**. Deploy users get read-only **About Midel** (lookup can show Wikipedia; no Remember toggle, no writes).

**Manual skills and subject packs (curated).**

Use this when you want controlled wording, Bulgarian or other languages, or many lessons at once—not whatever Wikipedia returned.

1. **Single facts:** Teaching **Add** with **Group for a full lesson** (or a new category name). Short yes/no style lines use **Group for a short line** → `short_added.js`.
2. **Whole skill or subject file:** Add or edit `skills_facts.js`, `design_facts.js`, or any `*_facts.js` with ids in a free block (see [How to add a new lesson file](#how-to-add-a-new-lesson-file)). Run `python3 save_taught.py --sync-packs` if the writer did not refresh `pack_manifest.js`, then reload the page.
3. **Curate Wikipedia rows:** Rows in category **Wikipedia** are normal deep lessons—change text, recategorize, or Remove in the panel. Remove junk before running `--learn-new` so weak summaries are not installed.

**Correct a wrong answer from chat (dev only).** When a reply comes from a row in **`taught_facts.js`** (Teaching id **≥ 3001**, including **Wikipedia**), the thread shows **Correct answer** next to **Copy** on that block—including when the small network also answered and **Deep network learned #id** is a second block (hidden on deploy/FTP builds). Edit the stored question and answer; **Save** calls **`POST http://127.0.0.1:8787/taught/patch`** (writer required). Chat and **`TAUGHT_LIBRARY`** update in memory without a full reload. Built-in **`*_facts.js`** pack rows are not patched from the page—edit those files on disk.

**Deep network after a correction.** If the id is already listed in **`stage3_learned.json`**, leave **Queue deep network relearn** checked: the writer appends the id to a **`relearn`** queue. By default **`--learn-new`** teaches **pending** lessons first (relearn waits until pending is empty). Use **`--relearn-first`** to correct queued ids before new installs. Relearn retrains on the **new** text and exports only when checks pass. When the **new lesson’s check word** appears and the Sahara/Mercury gates still pass, the run **saves** even if some recent lessons slipped; dropped ids go to **`relearn`** for repair. Needles are taken from the **opening** of the answer (not long list words like “cyanobacteria” on unrelated questions). On full relearn failure the id rotates to the end of **`relearn`** (`relearn-deferred`). Shorter answer text helps. Wait until **`stage3_brain.js`** finishes writing (`;` at end) before backup.
4. **Weights:** Same command for every deep lesson with a question—Teaching, Wikipedia, or pack file: **`npm run learn:new`**. The trainer picks the **highest id not yet** in `stage3_learned.json`. Pack ids (e.g. 13001+) can jump ahead of older waiting chemistry ids; that is expected.

**Together in practice:** Let Remember fill gaps while you browse; periodically review **Wikipedia** in the deep list; add polished **skills** or history in `*_facts.js`; run `--learn-new` on a schedule until the queue you care about is installed; **`npm run backup`** and redeploy when the public site should match.

### Batch Wikipedia learning from `wiki-learn.md`

**Status:** shipped — **`npm run wiki:learn`**, **`npm run wiki:unmark-x`**, **`npm run test:wiki`**. Question lists: [`wiki-learn-expanded.md`](wiki-learn-expanded.md) (~4k bullets) or [`wiki-learn.md`](wiki-learn.md) (shorter corpus). Intro notes in the expanded file describe markers and rate limits.

**Goal:** Same pipeline as **Remember Wikipedia** in the browser: gated English summary → one row in `taught_facts.js` (category **Wikipedia**) → optional **`train_stage3.py --learn-new`** per row. Implemented as **`scripts/wiki-learn-batch.mjs`** (not Playwright).

**Per question the batch:**

1. Parses `* …?` bullet lines (skips lines already marked **`[+]`** or **`[x]`**; **`--retry-x`** processes only **`[x]`** lines).
2. Skips **solid library** hits (marks **`[+]`** without calling Wikipedia).
3. Fetches Wikipedia via **`scripts/wikipedia-fetch.mjs`** — **direct** `en.wikipedia.org` from Node by default (throttled ~1.4s between HTTP calls, fewer title tries in batch mode, automatic **429** backoff). Optional **`--writer-lookup`** also tries **`GET /lookup`** on the writer first (doubles traffic; usually unnecessary).
4. Applies **`evaluateWikiSave`** from **`wiki_lookup.js`** (same gates as chat Remember).
5. Assigns the next Teaching id (**`GET /taught` → `nextId`**, or disk reload + **`load-midel-library.mjs`**), then appends via **`POST /taught`** on port **8787**, or **`--direct`** (`save_taught.py --write-json` stdin). The writer re-normalizes ids on save so batch + UI stay aligned.

**Markdown markers** (edited in place unless **`--no-mark`**):

| Mark | Meaning |
|------|---------|
| **`[+]`** | Saved to **`taught_facts.js`**, or library already answers solidly (**`solid-library`**) |
| **`[x]`** | Checked: no Wikipedia hit after writer (if used) **and** direct lookup |
| *(none)* | Not finished — gate rejected (Wikipedia matched but not saved), lookup/write error, or rate limit (not marked so you can retry) |

**Gate skips** log `SKIP gate:… (wiki hit: …, not marked)` — do not confuse with **`[x]`**. **`SKIP duplicate`** means that **question** is already in **`taught_facts.js`** (same wording); the line stays unmarked so you can fix the library and retry. Identical Wikipedia text under a **new** question is saved separately (template asks like “examples of CSS” vs “history of CSS”). Old fast runs sometimes marked **`[x]`** during Wikipedia **429** outages; use **`npm run wiki:unmark-x -- wiki-learn-expanded.md`** or **`--retry-x`** after a cooldown.

**Rate limits:** Default **`--delay 4000`** ms between questions. On repeated **429**, the batch pauses **3 minutes** and retries the same question (up to four times) before stopping. Prefer **`--limit 20 --delay 5000`** for long sessions; wait **15–30 minutes** if Wikipedia blocked your IP. Chat and batch share the same English Wikipedia quota from your network.

**CLI flags:** `--dry-run`, `--limit N`, `--offset N`, `--delay MS`, `--retry-x`, `--direct`, `--no-mark`, `--writer-lookup`, `--writer URL`, `--log PATH`. Log default: **`wiki-learn-batch.log`**.

**Writer:** **`save_taught.py` must be running** for **`POST /taught`** unless **`--direct`**. Lookups do **not** require the writer unless **`--writer-lookup`**.

**After a batch:** reload **`neural_lab.html`**; curate **Wikipedia** rows in Teaching; install weights with **`npm run learn:new:loop`** (or one-shot **`npm run learn:new`**). Section headings in the markdown are **not** auto-mapped to lesson categories (everything saves as **Wikipedia**). Do not stop a running learn-new loop for backup — see [Backup](#backup).

### Future: Bulgarian (and Cyrillic) knowledge base

**Status:** planned, not implemented.

**Today:** Midel is an **English (Latin-letter) lab**. You can store UTF-8 Cyrillic in lesson files, but **chat matching** (`science_library.js` → `scienceTokens`), **browser/trainer tokenizers** (`neural_lab.html`, `train_stage3.py` → only `[a-z]+`), and **Wikipedia** (`en.wikipedia.org` only in `save_taught.py` and the page) all assume English. The existing **`bulgarian_history_facts.js`** pack is **about** Bulgaria, in **English**. Manual Teaching Add and Remember do not yet deliver reliable **Bulgarian questions and answers** or **bg.wikipedia** summaries.

**Goal:** Learn and answer from a **Bulgarian knowledge base**—manual lessons (Teaching Add, `*_facts.js`, `taught_facts.js`) and optional **Bulgarian Wikipedia**—with the same library → chat → optional `--learn-new` pipeline as English.

**Likely work (phased):**

1. **Tokenizer** — Extend `tokenize()` in `neural_lab.html` and `train_stage3.py`, and `scienceTokens()` in `science_library.js`, to include **Cyrillic letters** (Bulgarian alphabet); keep one shared rule so matcher, chat, and trainer agree.
2. **Stop words / ask shapes** — Bulgarian equivalents of `SCIENCE_STOP`, `askShape`, and wiki gates (or a `lang=bg` profile) so “Къде е …?” matches like “Where is …?”.
3. **Library packs** — e.g. `bulgarian_general_facts.js` or BG rows in `taught_facts.js` with **Bulgarian** `question` + `text`; `pack_manifest.js` sync unchanged in spirit.
4. **Wikipedia** — Optional **`bg.wikipedia.org`** lookup and Remember (writer `/lookup?lang=bg`, browser CSP, relevance gates in `wiki_lookup.js` + `save_taught.py`); English Remember stays default.
5. **Deep weights** — After tokenizer work, `--learn-new` on BG lessons with questions; vocab growth must include new Cyrillic tokens; regression checks (existing English paraphrases) must still pass.
6. **UI (optional)** — Language toggle or auto-detect for lookup only; chat language follows the user’s question once matching works.

**Out of scope for v1:** Full machine translation layer, non-Bulgarian Cyrillic locales (Russian, Serbian) unless tokenizer is generalized deliberately.

**Test ideas (when built):** Bulgarian Teaching row round-trip; BG question hits BG lesson; Remember from bg.wikipedia; `npm run test:wiki` extended or `test:bg` for gate samples.

---

## New subject packs (`*_facts.js`) and id blocks

Use a **new pack file** when a whole subject (100 curated lessons, a history pack, etc.) should join the library and optionally the deep network. Do **not** put pack ids in `taught_facts.js`. Do not edit `neural_lab.html` for a new pack. Chat reads the file after manifest sync; weights need **`--learn-new`**.

### Occupied pack id ranges (do not reuse)

| Ids | File | Notes |
|-----|------|--------|
| (science) | `science_library.js` | Built-in 100, original ids in that file |
| 1003–1040 | `biology_facts.js` | |
| 2001–2040 | `math_facts.js` | **2003** = Pythagorean theorem |
| 4001–4040 | `gemstone_facts.js` | Teaching must skip this hole |
| 5001–5040, 6001–6118 | `chemistry_facts.js` | |
| 7001–7040, 8001–8042, 13401–13655 | `geography_facts.js` | 8041–8042 Venezuela / Titicaca. 13401–13654 renumbered 14 Oct 2026. **13655** Sofia inhabitants (follow-up to capital #8025). |
| 9001–9011 | `skills_facts.js` | gaps intentional |
| 11001–11100 | `ai_facts.js` | |
| 12001–12200 | `design_facts.js` | |
| 13001–13100, 13301–13400 | `bulgarian_history_facts.js` (200 rows) | Second block of 100 added 13 Oct 2026; 13101–13300 belong to the Scientists, Food and Sport packs |
| **6673–6800** | **`materials_facts.js`** | **`MATERIALS_LIBRARY`**, category **Materials** |
| **13101–13200** | **`scientists_facts.js`** | **`SCIENTISTS_LIBRARY`**, category **Scientists** |
| 13201–13240 | `food_facts.js` (40 rows) | Renumbered 12 Oct 2026 from 7001–7040, which `geography_facts.js` owns. Old→new map: `versions/id-renumber-2026-10-12.json` |
| 13241–13282 | `sport_facts.js` (42 rows) | Renumbered 12 Oct 2026 from 8001–8042, which `geography_facts.js` owns. Same map file |

**Next free block (suggested):** **13655–13800** for the next 100-lesson pack (or jump to **14001–14100** if you want a gap). Record new blocks in this table when you add a file.

**Geography clean-up (14 Oct 2026):** `geography_facts.js` had a pasted batch that clashed with World Records, AI and itself. The 273 rows were renumbered, then 19 duplicate capital rows were removed; 336 rows remain, the new ones at 13401–13654. Backups: `versions/geography_facts-pre-id-fix-2026-10-14.js` (before renumbering) and `versions/geography_facts-pre-dedupe-2026-10-14.js` (before removing duplicates). Map: `versions/id-renumber-2026-10-14-geography.json`. New ids are not in `stage3_learned.json` until `npm run learn:new`. Also: `save_taught.py` backup before the counter change is `versions/save_taught-pre-global-nextid-2026-10-14.py`.

**One shared counter (14 Oct 2026):** the next id for a new taught fact AND for a new pack file is always **the highest id in any lesson file + 1**. `npm run audit:ids` prints it, with a per-file table of counts and ranges. New taught facts therefore no longer fill holes between packs.

Packs added later without a table row (see `npm run audit:ids` for the live per-file ranges): `finance_facts.js` 10523–10703, `cryptocurrency_facts.js` 10704–10803, `world_records_facts.js` 10804–10923, `digital_design_facts.js` 11101–11220, plus cosmetics, disease, human body, life, nature, online platforms, philosophy, poison, science fiction, space, swear words in the 8xxx–10xxx range. When the table and the audit disagree, trust the audit.

**Teaching** (`taught_facts.js`) uses ids from **3001** upward but must **never** collide with pack ids (`save_taught.py` **`load_pack_lesson_ids`**, **`npm run audit:ids`**).

### Scientists pack (reference)

- **File:** `scientists_facts.js` · **Array:** `SCIENTISTS_LIBRARY` · **Category:** `"Scientists"`
- **100 lessons**, ids **13101–13200** (famous scientists; one person per id).
- **Manifest:** listed in `pack_manifest.js` (writer **`--sync-packs`** if you add the file by hand).
- **Chat:** reload `neural_lab.html`; labels like **`from Scientists #13101`**.
- **Weights:** each id installs with **`npm run learn:new`** / **`learn:new:loop`**. Queue order is **highest pending id first** (13200 down to 13101 before lower packs/Wikipedia rows).
- **Unicode names** in text are fine; matching favors **ASCII `[a-z]`** tokens—phrase `question` fields like the examples in the file when testing.

### Checklist for a future `*_facts.js` file

1. **Pick a unused contiguous id range** (see table above).
2. **Create** `subject_facts.js` with `var SUBJECT_LIBRARY = [ … ];` — each object: `"id"`, `"category"`, `"text"`, `"question"` (straight quotes only).
3. **Register:** add to `pack_manifest.js` or run **`python3 save_taught.py --sync-packs`**.
4. **Verify:** reload the lab, ask 2–3 questions; run **`npm run audit:ids`**.
5. **Optional:** **`npm run copyright:apply`** for the new file.
6. **Weights:** **`learn:new:loop`** (or one shot per lesson); update this table and the Library pack table in MODEL.md.
7. **Deploy:** **`npm run backup`** when `stage3_brain.js` is complete (`;` at end).

**Generating with GPT/Grok:** give the exact **filename**, **array name**, **id range**, the **forbidden ranges** table, **lesson count**, fixed **category** string, one **example object**, and ask for **JavaScript only**.

---

## How to add a new lesson file

Same steps as the checklist above; minimal example:

1. Create one file in this folder whose name ends in `_facts.js`, for example `bulgarian_history_facts.js`. The list name must end in `_LIBRARY`. Use straight quotes, not curly quotes. Give every lesson its own id, a category, the sentence, and a question. A lesson with no question can still be shown in chat, and `--learn-new` skips it.

```javascript
var BULGARIAN_HISTORY_LIBRARY = [
  {
    "id": 13001,
    "category": "Bulgarian History",
    "text": "The First Bulgarian Empire was founded in 681.",
    "question": "When was the First Bulgarian Empire founded?"
  }
];
```

Number the rest 13002, 13003, and so on. Do not reuse an id from another file.

2. Refresh the list the page loads. If `save_taught.py` is already running, it rewrites `pack_manifest.js` when the new file appears. If it is not running, from this folder:

```bash
python3 save_taught.py --sync-packs
```

The trainer sees every `*_facts.js` file by itself. The chat does not, until `pack_manifest.js` includes the new name.

3. Reload `neural_lab.html`. The chat can answer from the new file. The weights in `stage3_brain.js` are still the old ones, and the side diagram stays empty for these lessons.

4. Check a few old questions before keeping the pack: gold tarnish, diamond and graphite, coral reefs, pi, Sahara, capital of Mars. Then ask one question from the new file and confirm the stored sentence comes back.

5. Teach the new lessons into the weights, one lesson per run, from this folder:

```bash
npm run learn:new
```

Each run takes the **highest id that is not installed yet**. A pack that starts at 13001 jumps ahead of older lessons still waiting, such as chemistry ids in the 6000s. Lessons already saved in `stage3_learned.json` stay saved. The save updates `stage3_brain.js` only when the new lesson is known and the old checks still pass. Details of one run are in [Teach a new lesson](#teach-a-new-lesson-to-the-deep-network).

6. Reload the page and ask that lesson’s question. Run the same command again for the next waiting lesson. Repeat until the new file is installed. Until a lesson’s run succeeds, the chat still answers from the file, and the diagram says there is nothing to draw.

---

## Files that are the lab

| File | Role |
|---|---|
| `LICENSE` | Midel Free Use License (copyright M.Milde 2026). Shipped in deploy and dev zips. |
| `neural_lab.html` | The page. This is the only copy to edit. |
| `index.html` | Forwards the browser to `neural_lab.html`. |
| `midel-logo.png`, `midel-mark.png` | Home lockup and rail mark. |
| `versions/neural_lab-glow-v1.html` | Saved earlier home-screen animation. |
| `neural_lab_classic.html` | Frozen older page. |
| `pack_manifest.js` | The list of `*_facts.js` files the page loads. The writer refreshes it. |
| `run_midel_backup.py` | Full backup: refresh this file’s brain stats, PDF, then both zips. **`npm run backup`**. |
| `pack_midel_backup.py` | Zips only: `dist/midel-YYYY-MM-DD-deploy.zip` and `dist/midel-YYYY-MM-DD-dev.zip`. |
| `science_library.js` and `*_facts.js` | Lessons. Matcher and **`lessonDisplaySource`** (chat labels). Artificial intelligence is `ai_facts.js`. Design is `design_facts.js`. Skills are `skills_facts.js`. Teaching lessons are `taught_facts.js` (includes optional **Wikipedia** category from Remember). |
| `wiki_lookup.js` | Wikipedia relevance scoring, save gates (`evaluateWikiSave`), **`wikiTopicWords`** / template framing, and search helpers. Loaded by `neural_lab.html`; in deploy zips. Keep in sync with `save_taught.py` lookup logic. |
| `think_network.js` | Optional canvas particle-ring loader (not wired in `neural_lab.html` by default; kept for experiments). Still in deploy zips if present. |
| `scripts/test-wiki-remember.mjs` | Regression tests for Wikipedia gates. Run **`npm run test:wiki`**. |
| `scripts/wiki-learn-batch.mjs` | Batch Remember CLI (**`npm run wiki:learn`**). See [Batch Wikipedia learning](#batch-wikipedia-learning-from-wiki-learnmd). |
| `scripts/wikipedia-fetch.mjs` | Throttled direct Wikipedia lookup for the batch (browser-parity walk + gates). |
| `scripts/wiki-learn-unmark-x.mjs` | Strips mistaken **`[x]`** markers (**`npm run wiki:unmark-x`**) so lines can be retried. |
| `scripts/load-midel-library.mjs` | Loads lesson library in Node for batch solid-hit / gate checks. |
| `scripts/learn-new-loop.mjs` | Runs **`--learn-new`** until queue empty (**`npm run learn:new:loop`**). Mac helper: `scripts/learn-new-loop.sh`. |
| `scripts/run-learn-new.mjs` | Single **`--learn-new`** (**`npm run learn:new`**). |
| `scripts/audit-lesson-ids.mjs` | Verifies Teaching ids vs pack files and packs vs packs, prints per-file ranges and the next free id (**`npm run audit:ids`**). Exit 1 only on duplicates, collisions or unreadable packs. |
| `scripts/corpus-stats.py`, `scripts/run-corpus-stats.mjs` | Read-only corpus length audit (**`npm run corpus:stats`**). See [Corpus length audit](#stable-operations-oct-2026). |
| `wiki-learn.md` | Shorter curated question list for batch teaching. Not loaded by the page. |
| `wiki-learn-expanded.md` | Large question corpus + batch marker legend. Not loaded by the page. |
| `wiki-question-templates.md` | Template list for generating expanded questions. |
| `ROADMAP.md` | Forward plan toward stronger / LLM-like capabilities (phases A–E). |
| `save_taught.py` | Writer for both networks. Full lessons go to `taught_facts.js` in `TAUGHT_GROUPS` / `//` sections (new categories are appended automatically). **`TAUGHT_ID_MIN` 3001** — **`GET /taught`** returns **`count`** and **`nextId`**; **`POST /taught`** normalizes ids before write. Short lines go to the chosen group in `short_added.js`. **`GET /lookup?q=…`** returns a gated Wikipedia summary for chat. Add, Remove, and Remember POST to **`/taught`**. `--install` keeps it running on a Mac. |
| `short_added.js` | Short lines you added, in 26 groups, and original short lines you removed. |
| `stage3_brain.js` | Installed deep weights. Vocabulary 4691. 16,605,792 bytes. 1,745,408 weights. |
| `bulgarian_history_facts.js` | Bulgarian history pack. 200 lessons. Ids 13001–13100 and 13301–13400. |
| `materials_facts.js` | Materials pack. 128 lessons. Ids 6673–6800. `MATERIALS_LIBRARY`. |
| `scientists_facts.js` | Scientists pack. 100 lessons. Ids 13101–13200. `SCIENTISTS_LIBRARY`. |
| `deep_model.js` | Deep-network inference. |
| `train_stage3.py` | Deep-network trainer. `--learn-new` teaches one new lesson. Do not run a full export casually. |
| `stage3_learned.json` | Lesson ids taught or skipped. Taught does not always mean the continuation still answers. |
| `Midel-network-guide.pdf` | Plain-language guide to the network terms. |
| `.venv` | NumPy for the trainer on this Mac. It is not in the deploy archive, because that folder only runs on this machine. On another computer, create a new one and install `requirements.txt`. |
| `step1`–`step5` Python files | The original tutorial. Not the lab brain. |
| `*.txt`, `science_geography_facts.json`, `practice_questions.txt` | Source packs. |

Removed on 26 September 2026 because nothing in the lab loads them: `visual_app.py`, `visual_ui.html` (an older local server UI), `neural_brain_default.json` (an old small-network export, no yes/no tokens), plus `.DS_Store` and `__pycache__`. `neural_brain_curriculum_2026-09-26.json` and `neural_brain_curriculum_2026-09-27.json` are browser exports of the short network and are not loaded by the page.

## Checks, regression tests and baseline questions (added 21 Oct 2026)

Run these instead of discovering problems on the live page. All are plain `npm run …` commands and need no network.

| Command | What it does | Time |
|---------|--------------|------|
| `npm run check` | **Pre-pack check.** Every `*_facts.js` is strict JSON (a single backslash, such as LaTeX `\(`, makes `save_taught.py` silently drop the whole file); lesson ids are unique; every lesson file is in `pack_manifest.js` and has a `<script>` tag in `neural_lab.html`; the page's inline scripts have no syntax errors; every file the page loads exists **and** is in `DEPLOY_NAMES` of `pack_midel_backup.py`; `stage3_brain.js` is complete. Also prints library-quality counts (repeated questions, lowercase questions). Exit 1 on any `FAIL`. | < 1 s |
| `npm run backup` | Runs `check` first and **stops** if it fails (`MIDEL_SKIP_CHECK=1` packs anyway). | |
| `npm run test:features` | Percent calculator, answer formatter, conversation context, yes/no negation, typo guard. | ~8 s |
| `npm run test:all` | The four above plus `library`, `lesson-network`, `wiki`. | ~15 s |
| `npm run check:full` | `check`, then `test:all`. Run before every deploy and after every change to `science_library.js`, `percent_calc.js`, `chat_context.js`, `answer_format.js` or the page. | ~16 s |

Individual tests: `test:percent`, `test:format`, `test:polar`, `test:typo-guard`, `test:library`, `test:lesson-network`, `test:wiki`. Each was checked by **deliberately breaking the feature** and confirming the test fails. The tests look at lesson *question text*, not ids, so editing lessons does not break them; a case is skipped (with a note) if its lesson no longer exists.

**Gotchas these catch or remind of**
- `save_taught.py` (the writer) and `scripts/watch-css.js` re-save `neural_lab.html` and rotate its `?v=` tags. An edit made while they run can be overwritten: re-check about 15 s after saving. `npm run check` prints a note when they are running.
- The matcher exists twice in `science_library.js` (`rankLessons` and `rankLessonsAsync`); the page uses the async one. Change both.
- The test harness `scripts/load-midel-library.mjs` now also exposes `polarAnswer`, `relatedQuestions`, `suggestCorrectedQuestions`, `libFieldByName`, `libCategoryMenu`, `libRandomQuestionIn`.

### Baseline question sets (library-only reference for the deep-network rebuild)

- `npm run eval:sets` builds `scripts/fixtures/eval-baseline.json` (772 questions, seed 20261021, repeatable): 15 lessons from each of the **14 fields** (210 lessons; restricted categories excluded), each asked as **exact**, **casual** (lowercase, no "?"), **typo**, **reworded** and, where a word allows, **synonym**; plus 32 extra synonym questions and 40 **refusal** prompts (invented words and nonsense: the right answer is "not in the library"). 100 of the exact questions are marked `benchmark` for answer-writing tests. Lessons sharing a question (ignoring a/an/the) or an answer text count as the same target.
- `npm run eval:baseline` asks the library all 772 questions with 4 worker processes (~2 min) and writes `versions/eval-baseline-results-DATE.json`. Each answer is **pass**, **wrong** (a different lesson: the worst outcome) or **none** ("not in the library"). `--compare PREVIOUS.json` prints the change; `--limit N` is a quick look.

**Baseline (21 Oct 2026, 10,046 lessons, library only), before and after the one-word-typo fix:**

| | before | after |
|---|---|---|
| all lesson questions | 94% pass · 2% wrong · 4% none | **97%** pass · 1% wrong · 2% none |
| exact / casual | 100% / 100% | 100% / 100% |
| reworded / synonym | 97% / 94% | 97% / 94% |
| **typo** | 78% pass · 6% wrong · 16% none | **88%** pass · 2% wrong · 9% none |
| refusal (nonsense) | 98% | **100%** |
| weakest fields | Food & drink 85, Body & health 89, Business & brands 91 | Business & brands 91, Earth & space 92, Survival 95 |

Saved: `versions/eval-baseline-results-2026-10-21.json` (before) and `versions/eval-baseline-results-2026-10-21-after-typo-fix.json` (after). **Use the "after" file as the library-only reference.**

**What the typo fix was (in `science_library.js`).** Wrong answers on one-word typos (`parsite` → pyrite, `tenis` → "the penis", `roseary` → the capital of Dominica) had three causes: (1) every spelling candidate got the same score, so the winner was arbitrary; (2) a swapped pair of letters counted as two slips (`maekup` vs `makeup` tied with `mockup`); (3) a one-word question only counted as a strong match when the matched word was very rare or equal to the question's own word, so a correct lesson such as "What is a parasite?" was shut out while rare lookalikes got in. Now: a swapped pair counts as one slip (`osaDistance`); closer spellings score higher; "is this lesson about the asked word" is judged on the **corrected** word; 4–5 letter words may be off by one slip, not two; and when two equally good lessons point at different words (`maekup` → makeup or markup) the page asks "Did you mean" instead of guessing, unless one word is far more common in the library than the other (`tenis` → tennis, not the rare word a letter away). It also made answers faster (the whole baseline went from ~122 s to ~85 s) because words whose length differs too much are skipped before any distance is computed.

**Still imperfect:** the remaining "wrong" answers are mostly near-duplicate lessons about the same topic (`How to start a fire with a ferro rod?` answered by `How do I start a fire…`), or real ties (`bronzr` → bronze / bronzer); a handful of typos in longer questions get no answer (`cmposed`, `comomn`).

## Protecting the lesson files on a public site (added 22 Oct 2026)

**Honest limit:** the page runs in the visitor's browser, so every lesson file and the network file must be downloadable. Nothing here can stop a visitor from *saving* a file; it stops other websites from embedding your files, asks search engines not to store them, makes your ownership clear, and gives you evidence if the lessons are copied. Real protection would need the lessons on a server that sends only answers (a different architecture).

| Layer | What it does | Where |
|-------|--------------|-------|
| **Hotlink protection** | A `.js`/`.json` request that names *another* website as its origin gets **403**: by `Referer`, and by the browser's `Sec-Fetch-Site: cross-site` header (works even when the referer is stripped). Your own pages, direct visits (empty referer), the page itself and images keep working. Wrapped in `<IfModule mod_rewrite.c>`, so a host without it ignores the block instead of failing. | `.htaccess` |
| **Do not index** | `X-Robots-Tag: noindex, noarchive, nosnippet` on `.js`/`.json`. | `.htaccess` |
| **License and sources** | "About & license" card in the **About Midel** panel (deployed site): © notice, link to `LICENSE`, **Wikipedia CC BY-SA 4.0 attribution**, "general information, not professional advice". Meta tags `author` / `copyright` / `license`. Drafted by an AI; **not reviewed by a lawyer**. | `neural_lab.html`, `NOTICE.md` |
| **Canary lessons** | Five clearly fictional lessons (world *Orrowmere*, in `science_fiction_facts.js`, ids 15362–15366) and three short lines (`short_added.js`) with rare invented names. If those names appear in someone else's product, the lessons were copied. The list is **private**: `versions/canary-manifest.json` (not in the deploy zip; it **is** in the dev zip, so do not share the dev zip). | see below |

**Commands**
- `npm run canary:check -- <file-or-url> ...` searches for the canary names (a URL must point at the *data file*, e.g. the site's `.js`, not just the page). One name = a lead; 2+ different names = likely; 4+ = strong. `--self` confirms your own files still carry them; `--list` shows the names.
- `npm run test:htaccess` starts a **real Apache** on this Mac and sends 17 realistic requests (own site, other site, spoofed referer, cross-site script/fetch, navigation, page, logo, `.htaccess`); skipped if Apache is missing. `npm run test:canary` tests the checker. Both are part of `npm run test:all`. `npm run check` warns if `.htaccess`, the About card or a canary is missing.

**After you upload the deploy zip, test on your host** (it may be Apache with different settings, or not Apache at all):
`curl -I https://YOUR-SITE/taught_facts.js` → **200**; `curl -I -H "Referer: https://example.com/" https://YOUR-SITE/taught_facts.js` → **403**; open the site in a browser and ask a question (lessons must load). If the page shows no lessons after a deploy, rename `.htaccess` on the host and reload: if that fixes it, the host dislikes a rule (tell me which host and what the error log says). Other hosts: **Nginx** ignores `.htaccess` entirely (needs the same rules in its own config); some shared hosts disable `mod_rewrite`/`mod_headers` (the `IfModule` guards then skip the rules silently, so there is no protection and no breakage).

**Gotchas**
- The canary names were checked only against your library; **I had no web access**, so a name might exist elsewhere (unlikely).
- The canary lessons are real lessons: they answer "What is the Kelvarn Reach?", appear in Science Fiction, and are part of the training corpus. Do not delete them; `npm run check` warns if they change.
- Apache stops by signalling its whole process group; `scripts/test-htaccess.mjs` starts it in its own group (`detached: true`) so it cannot kill the shell that runs the test.
- When the new weight file format arrives (`stage3_brain.bin`, see DEEP_NETWORK_REBUILD_PLAN.md §5.2) extend the `.htaccess` file patterns from `\.(js|json)$` to include `bin`.

## Backup

When asked for a backup, a deploy archive, a copy for another computer, or an FTP upload, produce **two** new zips. Never replace or delete an older zip. If `dist/midel-YYYY-MM-DD-deploy.zip` already exists for that day, use `-2`, then `-3` on the suffix before `.zip` (same for `-dev`).

From this folder, one command runs the full pipeline (refresh brain stats in this file, rebuild `Midel-network-guide.pdf`, pack both archives):

```bash
npm run backup
```

From the parent repo: `npm run midel:backup`. The same steps without npm: `npm run backup` still finds the NumPy venv on Mac or Windows.

1. **`run_midel_backup.py`** updates the vocabulary, weight count, and byte size of a **complete** `stage3_brain.js` in this file, aligns `neural_lab.html`’s `stage3_brain.js?v=…` cache-bust with that vocabulary, rebuilds the PDF, then calls **`pack_midel_backup.py`**.
2. **`pack_midel_backup.py`** alone only writes the two zips (no doc or PDF refresh). Use it when the docs are already current.
3. **`dist/midel-YYYY-MM-DD-deploy.zip`** — static FTP / web host. One folder `midel/` with only what the live page loads: `index.html`, `neural_lab.html`, `neural_lab.css`, `favicon.svg` when present, logos, `pack_manifest.js`, `science_library.js`, **`wiki_lookup.js`**, every `*_facts.js`, `short_added.js`, `deep_model.js`, and `stage3_brain.js`. Open **`midel/DEPLOY-FILE-LIST`** in the zip — it lists every `*_facts.js` that must be on the server (e.g. `materials_facts.js`). Upload **all** of those files together with `pack_manifest.js` and `neural_lab.html`; uploading only the HTML leaves new packs missing. The deploy **`neural_lab.html`** in the zip **inlines plain `<script src="…_facts.js">` tags** for every subject pack (FTP hosts often break **`pack_manifest.js`**’s `document.write`). Dev **`neural_lab.html`** on your Mac still uses `pack_manifest.js`. **`.htaccess`** asks Apache not to cache lesson scripts. No `.txt` source packs, no trainer, no writer, no `stage3_learned.json`, no tutorial steps, no `versions/`. The packer sets **`class="deploy-host"`** on `<body>` in that zip only: the left panel is **About Midel** (network load, optional Wikipedia **display** toggle)—no **Library & networks** blurb, no Remember toggle, no Add form, and no editable lesson lists. **`midel-*-dev.zip`** keeps the full Teaching panel.
4. **`dist/midel-YYYY-MM-DD-dev.zip`** — full lab on another computer. Same `midel/` folder plus `README.md`, `MODEL.md`, `ROADMAP.md`, `docs/MAC.md`, `docs/WINDOWS.md`, `Midel-network-guide.pdf`, `requirements.txt`, `requirements-torch.txt`, `save_taught.py`, `train_stage3.py`, `build_network_guide.py`, `pack_midel_backup.py`, `stage3_learned.json`, `neural_lab_classic.html`, `step1`–`step5` scripts, `wiki_lookup.js`, `wiki-learn.md`, `wiki-learn-expanded.md`, `wiki-question-templates.md`, `scripts/` (wiki batch, learn-new, audit ids, tests), every `*_facts.js`, and `versions/` (tokenizer JSON; not `*.pt` checkpoints). Still no `.txt` or JSON source dumps, `.venv`, `.venv-torch`, `dist/`, `learn-new.log`, browser brain exports, `Midel-network-guide-bg.pdf`, `Untitled`, or `.cursor`.
5. Copy `stage3_brain.js` only when the file is complete (ends with `;`). If a lesson is still being taught, wait until that save has finished. Do not stop a running `--learn-new` loop for the backup.
6. Chat on FTP works from `neural_lab.html` with no Python. Teaching Add still needs `save_taught.py` on a computer that can write the lesson files, not on the static host.

The latest pair is `dist/midel-2026-10-25-deploy.zip` (FTP) and `dist/midel-2026-10-25-dev.zip` (dev). Older zips in `dist/` stay as history.
