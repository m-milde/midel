<!-- Copyright (c) 2026 M.Milde <m.milde@gmail.com> Free use; no sale, rebrand, or profit from this software. See LICENSE. -->

# Midel Wikipedia Question Templates

Use these templates selectively according to the type of entity.

## Core
* What is X?
* What was X?
* Who was X?
* Where is X?
* When did X happen?

## Explanation
* Why is X important?
* How does X work?
* How did X develop?
* What is the history of X?
* What is X used for?
* What is X made of?

## Classification and examples
* What are the main types of X?
* What are examples of X?

## Comparison
* What is the difference between X and Y?
* How is X different from Y?

## Practical rule

Do not blindly apply every template to every term. Choose questions that make grammatical and semantic sense:
* people -> Who was X? / What did X do? / When did X live?
* places -> Where is X? / What is X known for? / What is the history of X?
* events -> When did X happen? / Why is X important? / What caused X?
* concepts -> What is X? / How does X work? / What are its types? / Why is X important?
* technologies -> How does X work? / What is X used for? / What is X made of?
* works of art/media -> Who created X? / When was X created? / What is X about?
* organizations/institutions -> What does X do? / When was X founded? / How does X work?

## Batch teaching

Expanded lists built from these templates live in **`wiki-learn-expanded.md`**. Run **`npm run wiki:learn`** (see **`MODEL.md`** — Batch Wikipedia learning). Wikipedia gates treat template words (**main**, **types**, **examples**, **history**, etc.) as framing, not topic anchors, so “What are the main types of X?” can match the X article.

Each saved row gets the next **Teaching** id from the writer (**`nextId`**, starting at **3001**, skipping pack-owned blocks such as gemstone **4001–4040**). Use **`npm run audit:ids`** after large batches. Mark progress in the markdown with **`[+]`** (saved) or **`[x]`** (verified no Wikipedia match—do not use **`[x]`** after rate limits; the batch retries **429** instead). **`SKIP duplicate`** means that question is already in **`taught_facts.js`** — the line stays unmarked. Use correct acronym casing (**CSS**, **HTML**, not **`cSS`**) so Wikipedia resolves the right article. Install weights with **`npm run learn:new:loop`**. Strategy: **[ROADMAP.md](./ROADMAP.md)**.
