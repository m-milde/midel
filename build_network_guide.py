#!/usr/bin/env python3
# Copyright (c) 2026 M.Milde <m.milde@gmail.com>
# Free use; no sale, rebrand, or profit from this software.
# See LICENSE.
"""Build Midel-network-guide.pdf, a plain-language map of the network."""

from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageTemplate,
    NextPageTemplate,
    PageBreak,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    Flowable,
    CondPageBreak,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.graphics.shapes import Drawing, Rect, String, Line, Polygon, Circle
import json
import re
from pathlib import Path

OUT = "Midel-network-guide.pdf"

INK = HexColor("#1c2833")
MUTED = HexColor("#5d6b78")
LINE = HexColor("#d5dbe2")
PAPER = HexColor("#f6f3ec")
CARD = HexColor("#fffdf9")
INDIGO = HexColor("#243e6a")
INDIGO_SOFT = HexColor("#e6edf5")
TEAL = HexColor("#1b6556")
TEAL_SOFT = HexColor("#e4f2ee")
AMBER = HexColor("#9a5b16")
AMBER_SOFT = HexColor("#f8efe3")
CREAM = HexColor("#fbf8f2")

PAGE_W, PAGE_H = A4
LEFT = 18 * mm
RIGHT = 18 * mm
TOP = 16 * mm
BOTTOM = 16 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT


def esc(text):
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


class Bookmark(Flowable):
    def __init__(self, key, title, level=0):
        super().__init__()
        self.key = key
        self.title = title
        self.level = level
        self.width = 0
        self.height = 0

    def wrap(self, aw, ah):
        return (0, 0)

    def draw(self):
        self.canv.bookmarkPage(self.key)
        self.canv.addOutlineEntry(self.title, self.key, self.level, closed=False)


def styles():
    s = {}
    s["h1"] = ParagraphStyle(
        "h1", fontName="Helvetica-Bold", fontSize=22, leading=26, textColor=INK,
        spaceBefore=0, spaceAfter=6, keepWithNext=True,
    )
    s["kicker"] = ParagraphStyle(
        "kicker", fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=TEAL,
        spaceBefore=14, spaceAfter=2, keepWithNext=True,
    )
    s["h2"] = ParagraphStyle(
        "h2", fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=INDIGO,
        spaceBefore=12, spaceAfter=4, keepWithNext=True,
    )
    s["body"] = ParagraphStyle(
        "body", fontName="Helvetica", fontSize=9.8, leading=15, textColor=INK,
        alignment=TA_LEFT, spaceAfter=8,
    )
    s["lead"] = ParagraphStyle(
        "lead", parent=s["body"], fontSize=11.5, leading=17, textColor=INK, spaceAfter=10,
    )
    s["term"] = ParagraphStyle(
        "term", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=TEAL,
        spaceBefore=8, spaceAfter=2, keepWithNext=True,
    )
    s["caption"] = ParagraphStyle(
        "caption", fontName="Helvetica-Oblique", fontSize=8, leading=11, textColor=MUTED,
        spaceBefore=4, spaceAfter=12,
    )
    s["bullet"] = ParagraphStyle(
        "bullet", fontName="Helvetica", fontSize=9.8, leading=14.5, textColor=INK,
        leftIndent=14, bulletIndent=2, spaceAfter=4,
    )
    s["toc"] = ParagraphStyle(
        "toc", fontName="Helvetica", fontSize=10, leading=14, textColor=INK, leftIndent=0,
    )
    s["toc_n"] = ParagraphStyle(
        "toc_n", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=TEAL,
    )
    s["toc_d"] = ParagraphStyle(
        "toc_d", fontName="Helvetica", fontSize=8.2, leading=11, textColor=MUTED,
    )
    s["cover_kicker"] = ParagraphStyle(
        "cover_kicker", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=TEAL,
        spaceAfter=8,
    )
    s["cover_title"] = ParagraphStyle(
        "cover_title", fontName="Helvetica-Bold", fontSize=32, leading=36, textColor=INK,
        spaceAfter=8,
    )
    s["cover_sub"] = ParagraphStyle(
        "cover_sub", fontName="Helvetica", fontSize=13, leading=18, textColor=MUTED,
        spaceAfter=6,
    )
    s["footer_note"] = ParagraphStyle(
        "footer_note", fontName="Helvetica-Oblique", fontSize=8.5, leading=12, textColor=MUTED,
    )
    s["cell"] = ParagraphStyle(
        "cell", fontName="Helvetica", fontSize=8.4, leading=11.5, textColor=INK,
    )
    s["cell_h"] = ParagraphStyle(
        "cell_h", fontName="Helvetica-Bold", fontSize=8.4, leading=11.5, textColor=white,
    )
    s["note"] = ParagraphStyle(
        "note", parent=s["body"], fontSize=9.4, leading=14, spaceAfter=0,
    )
    return s


S = styles()


def P(text, style="body"):
    return Paragraph(text, S[style])


def bullet(text):
    return Paragraph("•  " + text, S["bullet"])


class Note(Flowable):
    """A shaded callout with a coloured edge. It stays together with its text."""

    def __init__(self, text, tone="teal"):
        super().__init__()
        self.text = text
        self.tone = tone
        self._p = None

    def wrap(self, aw, ah):
        self.fill, self.edge = (TEAL_SOFT, TEAL) if self.tone == "teal" else (AMBER_SOFT, AMBER)
        self._p = Paragraph(self.text, S["note"])
        w, h = self._p.wrap(aw - 28, ah)
        self.width = aw
        self.height = h + 20
        return aw, self.height

    def draw(self):
        c = self.canv
        c.setFillColor(self.fill)
        c.roundRect(0, 0, self.width, self.height, 6, fill=1, stroke=0)
        c.setFillColor(self.edge)
        c.roundRect(0, 0, 4, self.height, 2, fill=1, stroke=0)
        self._p.drawOn(c, 16, 10)


class Rule(Flowable):
    """A short accent bar under a chapter title."""

    def wrap(self, aw, ah):
        self.width = aw
        return aw, 12

    def draw(self):
        self.canv.setFillColor(INDIGO)
        self.canv.rect(0, 5, 34, 2.5, fill=1, stroke=0)
        self.canv.setFillColor(LINE)
        self.canv.rect(38, 5.7, self.width - 38, 0.8, fill=1, stroke=0)


def rrect(d, x, y, w, h, fill, stroke, sw=0.8, radius=6):
    d.add(Rect(x, y, w, h, rx=radius, ry=radius, fillColor=fill, strokeColor=stroke, strokeWidth=sw))


def txt(d, x, y, text, size=9, font="Helvetica", color=INK, anchor="start"):
    d.add(String(x, y, text, fontName=font, fontSize=size, fillColor=color, textAnchor=anchor))


def arrow_down(d, x, y_top, y_bot, color=INDIGO):
    d.add(Line(x, y_top, x, y_bot + 6, strokeColor=color, strokeWidth=1.2))
    d.add(Polygon([x - 3.5, y_bot + 6, x + 3.5, y_bot + 6, x, y_bot], fillColor=color, strokeColor=color, strokeWidth=0.2))


def arrow_right(d, x1, x2, y, color=INDIGO):
    d.add(Line(x1, y, x2 - 6, y, strokeColor=color, strokeWidth=1.2))
    d.add(Polygon([x2 - 6, y + 3.5, x2 - 6, y - 3.5, x2, y], fillColor=color, strokeColor=color, strokeWidth=0.2))


def card_bg(d, w, h):
    rrect(d, 0, 0, w, h, CREAM, LINE, 0.7, 8)


def three_parts():
    w, h = CONTENT_W, 168
    d = Drawing(w, h)
    card_bg(d, w, h)
    cols = [
        (TEAL, "Library", "A list of lessons", "This usually writes", "the answer sentence."),
        (INDIGO, "Short network", "1 block, width 32", "Stored short lines", "sky, ice, grass."),
        (AMBER, "Deep network", "4 blocks, width 128", "Saved in a file.", "One lesson at a time."),
    ]
    gap = 10
    cw = (w - 24 - gap * 2) / 3
    for i, (color, title, line2, line3, line4) in enumerate(cols):
        x = 12 + i * (cw + gap)
        rrect(d, x, 16, cw, 136, white, LINE, 0.7, 6)
        d.add(Rect(x, 132, cw, 20, fillColor=color, strokeColor=color))
        txt(d, x + cw / 2, 138, title, 10, "Helvetica-Bold", white, "middle")
        txt(d, x + 10, 108, line2, 9, "Helvetica", INK)
        txt(d, x + 10, 78, line3, 9, "Helvetica", MUTED)
        txt(d, x + 10, 64, line4, 9, "Helvetica", MUTED)
        txt(d, x + 10, 36, "They are not one", 9, "Helvetica-Oblique", INK)
        txt(d, x + 10, 24, "set of weights.", 9, "Helvetica-Oblique", INK)
    return d


def question_path():
    w, h = CONTENT_W, 292
    d = Drawing(w, h)
    card_bg(d, w, h)
    steps = [
        ("1", "Read the sentence", "A question asks. Typos are fixed when you press space."),
        ("2", "Split into tokens", "Lowercase pieces: words, numbers, and the marks ? . ! ,"),
        ("3", "Search the library", "Lessons are scored by shared content words. Small typos still match."),
        ("4", "Strong match", "At about 72% overlap, the stored lesson is the answer."),
        ("5", "Ask the deep network", "It may continue only with words that already belong to that lesson."),
        ("6", "Hide a stray guess", "If the guess leaves the lesson, the drawing is not shown beside the answer."),
    ]
    top = h - 18
    row_h = 42
    for i, (n, title, detail) in enumerate(steps):
        y = top - (i + 1) * row_h
        d.add(Circle(28, y + 16, 9, fillColor=INDIGO, strokeColor=INDIGO))
        txt(d, 28, y + 12.5, n, 9, "Helvetica-Bold", white, "middle")
        if i < len(steps) - 1:
            d.add(Line(28, y + 6, 28, y - row_h + 28, strokeColor=LINE, strokeWidth=1.2))
        txt(d, 48, y + 18, title, 11, "Helvetica-Bold", INK)
        txt(d, 48, y + 4, detail, 8.5, "Helvetica", MUTED)
    return d


def neuron_diagram():
    w, h = CONTENT_W, 176
    d = Drawing(w, h)
    card_bg(d, w, h)
    inputs = [("hot", "0.8"), ("desert", "0.2"), ("largest", "-0.5")]
    for i, (word, weight) in enumerate(inputs):
        y = 128 - i * 40
        rrect(d, 16, y, 78, 26, INDIGO_SOFT, INDIGO, 0.8, 5)
        txt(d, 55, y + 9, word, 10, "Helvetica-Bold", INDIGO, "middle")
        d.add(Line(94, y + 13, 168, 78, strokeColor=MUTED, strokeWidth=1))
        txt(d, 118, y + 16, "weight " + weight, 8, "Helvetica-Oblique", AMBER)
    d.add(Circle(196, 78, 26, fillColor=white, strokeColor=INDIGO, strokeWidth=1.4))
    txt(d, 196, 82, "sum", 10, "Helvetica-Bold", INDIGO, "middle")
    txt(d, 196, 68, "+ bias", 8, "Helvetica-Oblique", MUTED, "middle")
    arrow_right(d, 222, 268, 78, INDIGO)
    rrect(d, 272, 62, 70, 32, AMBER_SOFT, AMBER, 0.9, 5)
    txt(d, 307, 73, "ReLU", 11, "Helvetica-Bold", AMBER, "middle")
    arrow_right(d, 342, 392, 78, TEAL)
    rrect(d, 396, 62, 84, 32, TEAL_SOFT, TEAL, 0.9, 5)
    txt(d, 438, 73, "output", 11, "Helvetica-Bold", TEAL, "middle")
    txt(d, 16, 14, "Negative weight: this input counts against the sum. ReLU: a negative sum becomes silence (zero).", 8, "Helvetica-Oblique", MUTED)
    return d


def layer_diagram():
    w, h = CONTENT_W, 132
    d = Drawing(w, h)
    card_bg(d, w, h)
    txt(d, 16, h - 22, "One layer  =  many neurons reading the same inputs at once", 10, "Helvetica-Bold", INK)
    labels = ["1", "2", "3", "4", "...", "128"]
    for i, lab in enumerate(labels):
        x = 24 + i * 78
        if lab == "...":
            txt(d, x + 16, 58, "...", 16, "Helvetica-Bold", MUTED, "middle")
            continue
        if lab == "128":
            x = w - 78
        d.add(Circle(x + 18, 62, 16, fillColor=INDIGO_SOFT, strokeColor=INDIGO, strokeWidth=1.1))
        txt(d, x + 18, 57, lab, 9, "Helvetica-Bold", INDIGO, "middle")
    txt(d, 16, 22, "Width of the deep network is 128. People also call this d_model. The short network's width is 32.", 8, "Helvetica-Oblique", MUTED)
    return d


def block_diagram():
    w, h = CONTENT_W, 318
    d = Drawing(w, h)
    card_bg(d, w, h)
    rows = [
        (TEAL_SOFT, TEAL, "Numbers in", "One list of 128 numbers for each word so far"),
        (white, INDIGO, "Layer norm", "Tidy the numbers so one word cannot shout over the rest"),
        (INDIGO, white, "Heads look back", "Four ways of weighing earlier words. This is attention."),
        (AMBER_SOFT, AMBER, "Add the original back", "The residual. The block adds its work; it does not replace the input."),
        (white, INDIGO, "Layer norm again", "Tidy once more, before the mixer"),
        (INDIGO, white, "MLP mixer", "Widen 128 to 256, ReLU, then narrow back to 128"),
        (AMBER_SOFT, AMBER, "Add the original back", "A second residual, so the mixer cannot wipe the words"),
        (TEAL, white, "Numbers out", "Same shape as the input. Ready for the next block."),
    ]
    box_w = w - 70
    y = h - 36
    for i, (fill, stroke_or_ink, title, detail) in enumerate(rows):
        ink = white if fill == INDIGO or fill == TEAL else INK
        sub = white if ink == white else MUTED
        if fill == INDIGO:
            sub = HexColor("#d5e0ee")
        if fill == TEAL:
            sub = HexColor("#d7eee8")
        rrect(d, 46, y - 28, box_w, 32, fill, stroke_or_ink if fill == white else fill, 0.8, 5)
        d.add(Circle(26, y - 12, 8, fillColor=INDIGO, strokeColor=INDIGO))
        txt(d, 26, y - 15, str(i + 1), 8, "Helvetica-Bold", white, "middle")
        txt(d, 58, y - 10, title, 9.5, "Helvetica-Bold", ink)
        txt(d, 200, y - 10, detail, 8, "Helvetica", sub)
        if i < len(rows) - 1:
            d.add(Line(26, y - 22, 26, y - 36, strokeColor=LINE, strokeWidth=1.1))
        y -= 36
    return d


def heads_diagram():
    w, h = CONTENT_W, 196
    d = Drawing(w, h)
    card_bg(d, w, h)
    txt(d, 16, h - 20, "The last word is \"hot\". Each head looks back at earlier words.", 10, "Helvetica-Bold", INK)
    words = ["the", "sahara", "is", "hot"]
    heads = [
        ("Head 1", [0.05, 0.72, 0.13, 0.10], "mostly sahara"),
        ("Head 2", [0.08, 0.10, 0.14, 0.68], "mostly the word itself"),
        ("Head 3", [0.22, 0.28, 0.30, 0.20], "spread out"),
        ("Head 4", [0.06, 0.18, 0.62, 0.14], "mostly is"),
    ]
    for i, (name, shares, note) in enumerate(heads):
        y = h - 52 - i * 34
        txt(d, 16, y + 6, name, 9, "Helvetica-Bold", INDIGO)
        for j, (word, share) in enumerate(zip(words, shares)):
            x = 78 + j * 78
            bw = 68
            rrect(d, x, y, bw, 16, INDIGO_SOFT, INDIGO_SOFT, 0, 3)
            rrect(d, x, y, max(3, bw * share), 16, INDIGO if share > 0.4 else TEAL, INDIGO if share > 0.4 else TEAL, 0, 3)
            txt(d, x + bw / 2, y + 4, word, 8, "Helvetica", INK, "middle")
        txt(d, 400, y + 4, note, 8, "Helvetica-Oblique", MUTED)
    return d


def grid_diagram():
    """A small causal attention grid. Rows read earlier columns only."""
    w, h = CONTENT_W, 210
    d = Drawing(w, h)
    card_bg(d, w, h)
    txt(d, 16, h - 22, "The weight grid is attention as a table", 10, "Helvetica-Bold", INK)
    words = ["the", "sahara", "is", "hot"]
    # row = word being written, col = word looked at. Upper triangle is forbidden.
    grid = [
        [1.0, None, None, None],
        [0.35, 0.65, None, None],
        [0.15, 0.55, 0.30, None],
        [0.08, 0.62, 0.18, 0.12],
    ]
    cell = 28
    left = 120
    top = h - 58
    for j, word in enumerate(words):
        txt(d, left + j * cell + cell / 2, top + 8, word, 8, "Helvetica-Bold", MUTED, "middle")
    for i, word in enumerate(words):
        txt(d, left - 10, top - i * cell - 18, word, 8, "Helvetica-Bold", INK, "end")
        for j, val in enumerate(grid[i]):
            x = left + j * cell
            y = top - (i + 1) * cell
            if val is None:
                rrect(d, x + 2, y + 2, cell - 4, cell - 4, HexColor("#f0f1f3"), LINE, 0.4, 2)
            else:
                # darker = more attention
                shade = Color(0.14 + 0.7 * (1 - val), 0.28 + 0.45 * (1 - val), 0.42 + 0.3 * (1 - val))
                rrect(d, x + 2, y + 2, cell - 4, cell - 4, shade, shade, 0, 2)
                ink = white if val > 0.45 else INK
                txt(d, x + cell / 2, y + 9, str(int(val * 100)), 7, "Helvetica-Bold", ink, "middle")
    txt(d, 280, h - 78, "Each row adds up to 100.", 9, "Helvetica", INK)
    txt(d, 280, h - 94, "Empty cells are the future.", 9, "Helvetica", INK)
    txt(d, 280, h - 110, "The network is causal:", 9, "Helvetica", INK)
    txt(d, 280, h - 126, "it cannot look ahead.", 9, "Helvetica", INK)
    txt(d, 280, h - 152, "Darker means more of", 9, "Helvetica", INK)
    txt(d, 280, h - 168, "the attention sits there.", 9, "Helvetica", INK)
    return d


def deep_stack():
    w, h = CONTENT_W, 430
    d = Drawing(w, h)
    card_bg(d, w, h)
    steps = [
        (INDIGO_SOFT, INDIGO, INK, "1   Your words", "capital of bulgaria ?"),
        (AMBER_SOFT, AMBER, INK, "2   Tokenizer", "lowercase pieces, punctuation kept"),
        (AMBER_SOFT, AMBER, INK, "3   Unknown words drop out", "a word not yet taught is dropped"),
        (INDIGO_SOFT, INDIGO, INK, "4   Embedding", "each remaining word -> 128 numbers"),
        (INDIGO_SOFT, INDIGO, INK, "5   Position added", "the order of the words is marked"),
        (INDIGO, INDIGO, white, "6   Block 1 of 4", "look back, then mix"),
        (INDIGO, INDIGO, white, "7   Blocks 2, 3 and 4", "the same two jobs, three more times"),
        (TEAL, TEAL, white, "8   A score for every known word", "one score per vocabulary word"),
        (TEAL, TEAL, white, "9   Next word", "the largest share is written, then the pass can repeat"),
    ]
    box_w = 360
    x = (w - box_w) / 2
    y = h - 28
    bh = 32
    gap = 12
    for fill, edge, ink, title, _detail in steps:
        y -= bh
        rrect(d, x, y, box_w, bh, fill, edge, 0.8, 5)
        txt(d, x + box_w / 2, y + 12, title, 10, "Helvetica-Bold", ink, "middle")
        y -= gap
        if y > 20:
            arrow_down(d, w / 2, y + gap, y + 2, edge)
    return d


def training_loop():
    w, h = CONTENT_W, 168
    d = Drawing(w, h)
    card_bg(d, w, h)
    boxes = [
        (INDIGO, "Forward", "Read a lesson\nand guess"),
        (AMBER, "Loss", "How wrong\nthe guess was"),
        (TEAL, "Backward", "Which weights\ncaused the error"),
        (INDIGO, "Step", "Nudge those\nweights a little"),
    ]
    # manual two-line labels, no newline in String
    lines = [
        ("Forward", "Read a lesson", "and guess the next word"),
        ("Loss", "A number for", "how wrong the guess was"),
        ("Backward", "Find which weights", "caused that error"),
        ("Step", "Nudge those weights", "by a tiny amount"),
    ]
    cw = 104
    gap = 18
    total = 4 * cw + 3 * gap
    x0 = (w - total) / 2
    for i, (title, a, b) in enumerate(lines):
        x = x0 + i * (cw + gap)
        rrect(d, x, 36, cw, 100, white, INDIGO, 1, 6)
        d.add(Rect(x, 112, cw, 24, fillColor=INDIGO if i % 2 == 0 else TEAL, strokeColor=INDIGO if i % 2 == 0 else TEAL))
        txt(d, x + cw / 2, 120, title, 10, "Helvetica-Bold", white, "middle")
        txt(d, x + cw / 2, 84, a, 8, "Helvetica", INK, "middle")
        txt(d, x + cw / 2, 70, b, 8, "Helvetica", INK, "middle")
        if i < 3:
            arrow_right(d, x + cw + 2, x + cw + gap - 2, 86, AMBER)
    txt(d, w / 2, 16, "One epoch  =  one pass through the training sentences. Then the loop runs again.", 8.5, "Helvetica-Oblique", MUTED, "middle")
    return d


STATS = {}


def answer_blocks():
    w, h = CONTENT_W, 238
    d = Drawing(w, h)
    card_bg(d, w, h)
    rows = [
        (INDIGO, "Small network line", "A stored short line matched the question. Shown first, in its own block."),
        (TEAL, "Deep library sentence", "A lesson matched at about 72% or more. The full stored sentence is shown."),
        (TEAL, "Deep network sentence", "Only when its own pass is complete: it covers every stored sentence of the lesson."),
        (AMBER, "Did you mean...?", "Typos helped the match, but overlap is below 72%. Click to fill the prompt."),
        (MUTED, "Online - Wikipedia", "Optional. A short extract with a link, added after the local answers."),
    ]
    row_h = 40
    top = h - 14
    for i, (color, title, desc) in enumerate(rows):
        y = top - (i + 1) * row_h + 6
        rrect(d, 14, y, w - 28, 34, white, LINE, 0.7, 6)
        d.add(Rect(14, y, 5, 34, fillColor=color, strokeColor=color, strokeWidth=0))
        txt(d, 30, y + 20, title, 10, "Helvetica-Bold", INK)
        txt(d, 30, y + 8, desc, 8.2, "Helvetica", MUTED)
    return d


def teach_split():
    w, h = CONTENT_W, 196
    d = Drawing(w, h)
    card_bg(d, w, h)
    rrect(d, w / 2 - 80, h - 46, 160, 30, INDIGO, INDIGO, 0, 6)
    txt(d, w / 2, h - 35, "What you type or add", 10, "Helvetica-Bold", white, "middle")
    cols = [
        (INDIGO, "Question only", "A question in the prompt", "just asks. Nothing is stored."),
        (TEAL, "Short line", "Question with a 1 to 3 word", "answer, or a statement of 2 to 5", "words. Goes to short_added.js", "in the group you pick."),
        (AMBER, "Full lesson", "A plain statement of about 6 or", "more words, no question mark.", "Goes to taught_facts.js in the", "category you pick."),
    ]
    gap = 10
    cw = (w - 28 - gap * 2) / 3
    for i, c in enumerate(cols):
        color, title, lines = c[0], c[1], c[2:]
        x = 14 + i * (cw + gap)
        d.add(Line(w / 2, h - 46, x + cw / 2, 128, strokeColor=LINE, strokeWidth=1.2))
        rrect(d, x, 14, cw, 114, white, LINE, 0.7, 6)
        d.add(Rect(x, 106, cw, 22, fillColor=color, strokeColor=color, strokeWidth=0))
        txt(d, x + cw / 2, 113, title, 9.5, "Helvetica-Bold", white, "middle")
        for j, ln in enumerate(lines):
            txt(d, x + 8, 92 - j * 12, ln, 7.6, "Helvetica", MUTED)
    return d


def install_loop():
    w, h = CONTENT_W, 128
    d = Drawing(w, h)
    card_bg(d, w, h)
    steps = [
        ("Waiting", "newest id first", INDIGO_SOFT, INDIGO),
        ("Replay set", "up to 64 recent", INDIGO_SOFT, INDIGO),
        ("Train one", "warm-up, then ease", TEAL_SOFT, TEAL),
        ("Gates", "5 checks", AMBER_SOFT, AMBER),
        ("Save or skip", "weights file", TEAL, white),
    ]
    gap = 14
    cw = (w - 20 - gap * 4) / 5
    for i, (a, b, fill, ink) in enumerate(steps):
        x = 10 + i * (cw + gap)
        rrect(d, x, 54, cw, 44, fill, ink, 0.8, 6)
        txt(d, x + cw / 2, 79, a, 8.6, "Helvetica-Bold", ink, "middle")
        txt(d, x + cw / 2, 65, b, 7.2, "Helvetica", ink, "middle")
        if i < 4:
            arrow_right(d, x + cw + 1, x + cw + gap - 1, 76, AMBER)
    txt(d, w / 2, 32, "One run teaches one lesson. If a gate fails, the old weights stay and the lesson is deferred.", 8, "Helvetica-Oblique", MUTED, "middle")
    txt(d, w / 2, 18, "The lesson is still in the library either way, so the chat can answer.", 8, "Helvetica-Oblique", MUTED, "middle")
    return d


def compare_table():
    header = [
        P("Word on the screen", "cell_h"),
        P("Plain meaning", "cell_h"),
        P("In Midel", "cell_h"),
    ]
    rows_raw = [
        ("Neuron", "One small decision: weigh inputs, add them, keep or silence the result.", "You never see a single neuron. Width 128 means 128 of them side by side."),
        ("Weight", "How much one input counts. Positive pulls toward, negative pushes away.", "Learned numbers inside the file stage3_brain.js. Not the lesson text."),
        ("Layer", "A row of neurons that read the same inputs together.", "Inside a block there are layer-norm steps and the mixer. The buttons say Block, not Layer, for the stack."),
        ("Block", "One full step: look back, mix, and add the result onto what came in.", "Deep network: 4 blocks. Short network: 1 block."),
        ("Head", "One way of looking back at earlier words.", "Deep network: 4 heads. The panel shows which earlier word each head preferred."),
        ("Attention", "How the 100% of 'looking back' is shared across earlier words.", "The curves and the grid on the right. Darker or thicker means a larger share."),
        ("Token", "A piece of text the network is allowed to hold.", "A word, a number, or one of ? . ! , after lowercasing."),
        ("Embedding", "The list of numbers that stands for one token before thinking starts.", "128 numbers per token in the deep network."),
        ("Parameter", "Any stored number the training is allowed to change.", "Deep network: the embeddings, the block weights, and the final scores. About %s numbers right now." % f"{STATS.get('deep_weights', 0):,}"),
        ("Context", "How many recent tokens fit in one pass.", "Deep network: 128. Short network: 64. Older tokens slide out of the window."),
    ]
    data = [header]
    for a, b, c in rows_raw:
        data.append([P(esc(a), "cell"), P(esc(b), "cell"), P(esc(c), "cell")])
    col = [92, 190, CONTENT_W - 92 - 190]
    table = Table(data, colWidths=col, repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("BACKGROUND", (0, 1), (-1, 1), white),
        ("BACKGROUND", (0, 2), (-1, 2), INDIGO_SOFT),
        ("BACKGROUND", (0, 3), (-1, 3), white),
        ("BACKGROUND", (0, 4), (-1, 4), INDIGO_SOFT),
        ("BACKGROUND", (0, 5), (-1, 5), white),
        ("BACKGROUND", (0, 6), (-1, 6), INDIGO_SOFT),
        ("BACKGROUND", (0, 7), (-1, 7), white),
        ("BACKGROUND", (0, 8), (-1, 8), INDIGO_SOFT),
        ("BACKGROUND", (0, 9), (-1, 9), white),
        ("BACKGROUND", (0, 10), (-1, 10), INDIGO_SOFT),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
    ]))
    return table


def glossary_table(entries):
    header = [P("Term", "cell_h"), P("What it means here", "cell_h")]
    data = [header]
    for i, (term, meaning) in enumerate(entries):
        data.append([P(esc(term), "cell"), P(esc(meaning), "cell")])
    table = Table(data, colWidths=[110, CONTENT_W - 110], repeatRows=1)
    style_cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("FONTNAME", (0, 1), (0, -1), "Helvetica-Bold"),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(("BACKGROUND", (0, i), (-1, i), INDIGO_SOFT))
        else:
            style_cmds.append(("BACKGROUND", (0, i), (-1, i), white))
    table.setStyle(TableStyle(style_cmds))
    return table


GLOSSARY = [
    ("Activation", "The rule that turns a neuron's sum into its output. Midel's mixer uses ReLU: negative becomes zero, positive passes through."),
    ("Adam", "The optimizer used for most of the deep network. It remembers which weights have been jumpy and takes smaller steps on those."),
    ("Attention", "A share of 100% across earlier tokens. The network is deciding which previous words matter for the word it is about to write."),
    ("Backpropagation", "The backward pass. After the loss is known, the trainer works out how each weight contributed, so it knows which way to nudge."),
    ("Bias", "A number added inside a neuron or layer before the activation. It lets the unit fire even when the inputs are near zero."),
    ("Block", "One full transformer step: tidy, look back with the heads, add that onto the input, tidy, mix with the MLP, add again. Deep network: 4. Short network: 1."),
    ("Causal", "The network may look at tokens it has already read, and not at tokens that would come later. The empty corner of the grid is that rule."),
    ("Checkpoint", "A saved copy of the weights. The installed copy is stage3_brain.js. A lesson that fails the gates does not replace it."),
    ("Context", "The maximum number of tokens in one pass. Deep: 128. Short: 64. This is also called the context window or max sequence length."),
    ("Coverage", "The library's match score: how many of the question's meaningful words appear in a lesson. A strong answer needs about 0.72 or more, and more than half the content words."),
    ("Curriculum", "The list of short sentences stored with the small network. The page answers from those lines. It does not train them in the browser."),
    ("Deep network", "The wider transformer whose weights live in stage3_brain.js. Four blocks, width 128, four heads. Its vocabulary grows as library lessons are taught."),
    ("Embedding", "A learned list of numbers for one token. Similar use in training can pull embeddings closer, but closeness is not a dictionary definition."),
    ("Epoch", "One full pass over the training sentences. A from-scratch deep run uses 80. Teaching one library lesson uses a short run: 2 warm-up passes, then up to 16, plus a rescue phase of up to 12 if an older lesson slips. The page does not run these passes."),
    ("Feed-forward", "Another name for the MLP mixer inside a block. It looks at each word's numbers on their own, without looking back at other words."),
    ("Fine-tune", "More training that starts from weights you already have, instead of starting from random numbers. Teaching one waiting lesson is this kind of run."),
    ("Forward pass", "Reading tokens from left to right and producing the next-word scores. Asking a question uses a forward pass. It does not by itself change any weights."),
    ("Gate", "A check that must pass before new deep weights are saved. Examples: Angel Falls still produces 979, and the Sahara and Mercury yes/no answers stay correct."),
    ("Gradient", "The direction and size of 'this weight made the loss worse.' The step moves the weight the opposite way."),
    ("Gradient clipping", "A safety limit so one wild sentence cannot shove the weights by a huge amount in a single step."),
    ("Greedy decoding", "Always write the single most likely next token, then repeat. The network does not plan a whole sentence and then pick the best one."),
    ("Head", "One attention look-back. Four heads read the same tokens and are allowed to care about different earlier words. Head size here is 32, because 128 / 4 = 32."),
    ("Hidden state", "The numbers that stand for the tokens after a block has mixed them. Still 128 per token in the deep network."),
    ("Inference", "Using the network to answer. No weights change. The opposite of training."),
    ("Layer", "A row of units that transform the numbers once. Layer norm is a layer. The MLP contains layers. A block is several layers wrapped together."),
    ("Layer norm", "A tidy-up that recenters and rescales a word's numbers. Pre-norm means this tidy-up happens before attention and before the mixer."),
    ("Learning rate", "How large each nudge is. The deep from-scratch run starts at 0.003. A fine-tune uses a smaller rate so old answers move less."),
    ("Library", "The searchable lessons: science, biology, math, gemstones, chemistry, geography, skills, artificial intelligence, design, Bulgarian history, and scientists, plus the Teaching rows you add. This is not a neural network."),
    ("Logits", "The raw scores for the next word, before they are turned into percentages. Bigger means more preferred, but they are not yet probabilities."),
    ("Loss", "One number that says how surprised the network was by the correct next word. Training tries to make this number smaller."),
    ("MLP", "Multi-layer perceptron. The small mixer inside each block: a wide layer (256), ReLU, then back to 128."),
    ("Neuron", "One unit. It multiplies inputs by weights, adds a bias, and applies an activation. Also called a unit or a cell. The home screen draws decorative neurons. The side panel shows attention and activations, not one circle per weight."),
    ("Optimizer", "The rule that turns gradients into a step. Adam for most deep-network weights. Clipped SGD for some short-network weights."),
    ("Overfitting", "The weights get very good at the practice sentences and worse at a new wording of the same idea."),
    ("Parameter", "A stored number training can change: a weight, a bias, or an embedding entry. More parameters can hold more patterns, until the patterns collide."),
    ("Positional encoding", "Numbers added so position 1 is different from position 4 even when the word is the same. Without them the network would see a bag of words."),
    ("Pre-norm", "Layer norm is applied before each sub-step inside the block, and a residual adds the result back. This is the deep network's layout."),
    ("Probability", "A share between 0 and 1. The next-word bars are probabilities. They add up to 1 across the whole vocabulary."),
    ("ReLU", "Rectified linear unit. If the sum is negative, output 0. If it is positive, output the sum. Used in the MLP."),
    ("Residual", "A skip connection. The block's output is 'what came in, plus what this step added.' Information can pass through even if a head is unsure."),
    ("Seed", "The starting number for random draws. Seed 7 makes a fresh training run begin the same way each time. It does not fix the meaning of a word."),
    ("SGD", "Stochastic gradient descent. A plain step along the gradient. 'Stochastic' means the sentences are taken in a shuffled order, not as one giant sum."),
    ("Short network", "The tiny transformer described in the page. One block, width 32, one head, context 64. Its lessons are stored with the page. A new short line is written into a chosen group in short_added.js. The page does not train it in the browser."),
    ("Softmax", "The function that turns logits into probabilities that add up to 100%. A large logit takes most of the share."),
    ("Token", "One item in the sequence: a word, a number such as 3.14 or 979, or a mark such as ?"),
    ("Tokenizer", "The rule that cuts text into tokens. Midel lowercases, strips commas inside numbers, and keeps words, numbers, and ? . ! ,"),
    ("Training", "Changing weights so the next-word guesses get less wrong. Asking a question in the chat is not training."),
    ("Transformer", "The kind of network Midel uses. Its main trick is attention over the tokens already read, stacked in blocks."),
    ("Vocabulary", "The list of tokens the network has a row for. The deep list grows when a library lesson is taught. A token outside that list is dropped."),
    ("Weight", "A single learned number that scales one connection. The lesson text is not a weight. The file of weights is the brain file."),
    ("Width", "How many numbers represent one token. Deep network: 128. Short network: 32. Also written d_model."),
    ("Deferred", "A lesson whose install failed. It is retried after the other waiting lessons and becomes skipped after four failures."),
    ("Library-only", "A lesson that chat can show but whose topic words are not in the brain file yet. The side panel says so instead of drawing a guess."),
    ("Meta file", "short_added.meta.js. A tiny file with the short-line counts, so the Network load card is right before the big file is fetched."),
    ("Needle", "A distinctive word from the opening of a lesson's answer. A saved lesson must still produce it. Glue words such as the or of never count."),
    ("Pack", "A file of lessons on one subject, named something_facts.js, with its own block of ids."),
    ("Queue", "The lessons waiting to be taught to the deep network. Highest id first."),
    ("Relearn", "A second queue for lessons whose text was corrected or that drifted. The trainer teaches the new text and exports only if the checks pass."),
    ("Remember", "A dev-only switch that saves a trimmed Wikipedia lesson when the library did not really answer."),
    ("Replay", "Practicing up to 64 recently installed lessons together with a new one, so the new one does not push them out."),
    ("Retention", "After a few passes, the new lesson and every replayed lesson must still come out right. Otherwise training continues, then a rescue rehearses what slipped."),
    ("Skipped", "A lesson the weights could not learn without breaking an older answer. It stays in the library."),
    ("Teaching row", "A full lesson saved from the Add box, from Remember, or from a Wikipedia batch. Ids start at 3001."),
    ("Typo match", "Matching that tolerates missing letters, a dropped first letter, and small swaps, with an allowance that grows with word length."),
    ("Writer", "save_taught.py. The small local program that saves Teaching to disk. It listens on port 8787 on this computer only."),

]


def recap_strip():
    w, h = CONTENT_W, 92
    d = Drawing(w, h)
    card_bg(d, w, h)
    items = [
        ("Words", INDIGO_SOFT, INDIGO),
        ("Tokens", INDIGO_SOFT, INDIGO),
        ("Embed", INDIGO_SOFT, INDIGO),
        ("4 blocks", INDIGO, white),
        ("Scores", TEAL, white),
        ("Next word", TEAL, white),
    ]
    gap = 8
    cw = (w - 20 - gap * 5) / 6
    y = 28
    for i, (label, fill, ink) in enumerate(items):
        x = 10 + i * (cw + gap)
        rrect(d, x, y, cw, 36, fill, fill, 0, 5)
        txt(d, x + cw / 2, y + 13, label, 8, "Helvetica-Bold", ink, "middle")
        if i < len(items) - 1:
            arrow_right(d, x + cw + 1, x + cw + gap - 1, y + 18, AMBER)
    txt(d, w / 2, 12, "Library answers the sentence. This row is the deep network's guess, one token at a time.", 8, "Helvetica-Oblique", MUTED, "middle")
    return d


CHAPTER = {"n": 0}
FOOT = {"chapter": ""}


def section(key, title, level=0):
    if level:
        return [Bookmark(key, title, level), P(title, "h2")]
    CHAPTER["n"] += 1
    return [
        CondPageBreak(150),
        Bookmark(key, title, level),
        P("CHAPTER %02d" % CHAPTER["n"], "kicker"),
        P(title, "h1"),
        Rule(),
        Spacer(1, 4),
    ]


class GuideDoc(BaseDocTemplate):
    def afterFlowable(self, flowable):
        if isinstance(flowable, Bookmark) and flowable.level == 0:
            FOOT["chapter"] = flowable.title


COVER = {}


def draw_cover(c, doc):
    c.saveState()
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    band = 96 * mm
    c.setFillColor(INDIGO)
    c.rect(0, PAGE_H - band, PAGE_W, band, fill=1, stroke=0)
    c.setFillColor(HexColor("#2f4d82"))
    c.circle(PAGE_W - 30 * mm, PAGE_H - 22 * mm, 46 * mm, fill=1, stroke=0)
    c.setFillColor(HexColor("#1b3358"))
    c.circle(PAGE_W - 8 * mm, PAGE_H - 70 * mm, 28 * mm, fill=1, stroke=0)
    c.setFillColor(HexColor("#7fd1bf"))
    c.setFont("Helvetica-Bold", 10)
    c.drawString(LEFT, PAGE_H - 30 * mm, "MIDEL  \u00b7  NETWORK GUIDE")
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 38)
    c.drawString(LEFT, PAGE_H - 50 * mm, "How the network")
    c.drawString(LEFT, PAGE_H - 63 * mm, "works")
    c.setFont("Helvetica", 12.5)
    c.setFillColor(HexColor("#d9e3f3"))
    c.drawString(LEFT, PAGE_H - 78 * mm, "Neuron, layer, block, head, teaching, and the other")
    c.drawString(LEFT, PAGE_H - 84.5 * mm, "words on the screen, in plain language.")
    c.setFillColor(TEAL)
    c.rect(0, 0, PAGE_W, 10, fill=1, stroke=0)
    c.restoreState()


def draw_body(c, doc):
    c.saveState()
    c.setFillColor(HexColor("#fbfaf7"))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(INDIGO)
    c.rect(0, PAGE_H - 6, PAGE_W, 6, fill=1, stroke=0)
    c.setFillColor(TEAL)
    c.rect(0, PAGE_H - 6, 60, 6, fill=1, stroke=0)
    c.restoreState()


def draw_footer(c, doc):
    c.saveState()
    c.setStrokeColor(LINE)
    c.setLineWidth(0.4)
    c.line(LEFT, 14 * mm, PAGE_W - RIGHT, 14 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(LEFT, 10 * mm, "MIDEL")
    c.setFont("Helvetica", 7.5)
    c.drawString(LEFT + 30, 10 * mm, FOOT["chapter"])
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(INDIGO)
    c.drawRightString(PAGE_W - RIGHT, 10 * mm, str(doc.page))
    c.restoreState()


def installed_brain():
    """Vocabulary size and file size of the weights on disk."""
    path = Path("stage3_brain.js")
    size = path.stat().st_size if path.exists() else 0
    vocab = 0
    try:
        raw = path.read_text()
        data = json.loads(raw.split("=", 1)[1].strip().rstrip(";"))
        vocab = len(data["i2w"])
    except (OSError, json.JSONDecodeError, IndexError, KeyError, UnicodeError):
        log = Path("learn-new.log")
        if log.exists():
            for line in reversed(log.read_text(errors="replace").splitlines()):
                if line.startswith("vocab "):
                    vocab = int(line.split()[1])
                    break
    return vocab, size


def lab_stats():
    """Live numbers from the files in this folder, so the guide never goes stale."""
    out = {"short_lines": 0, "short_added": 0, "short_vocab": 0, "short_weights": 0,
           "installed": 0, "taught_rows": 0, "deep_weights": 0}
    try:
        meta = Path("short_added.meta.js").read_text()
        for key, name in (("lessonTotal", "short_lines"), ("addedLines", "short_added"),
                          ("vocabTotal", "short_vocab"), ("weightsTotal", "short_weights")):
            m = re.search(r'"%s":\s*(\d+)' % key, meta)
            if m:
                out[name] = int(m.group(1))
    except OSError:
        pass
    try:
        out["installed"] = len(json.loads(Path("stage3_learned.json").read_text()).get("ids", []))
    except (OSError, json.JSONDecodeError):
        pass
    try:
        out["taught_rows"] = len(re.findall(r'"id":\s*\d+', Path("taught_facts.js").read_text()))
    except OSError:
        pass
    try:
        raw = Path("stage3_brain.js").read_text()
        data = json.loads(raw.split("=", 1)[1].strip().rstrip(";"))

        def count(x):
            if isinstance(x, list):
                return sum(count(i) for i in x)
            if isinstance(x, dict):
                return sum(count(v) for v in x.values())
            return 1 if isinstance(x, (int, float)) else 0

        out["deep_weights"] = sum(count(data[k]) for k in ("E", "P", "lnF_g", "lnF_b", "Whead", "layers"))
    except (OSError, json.JSONDecodeError, IndexError, KeyError, UnicodeError):
        pass
    return out


def stat_cards(items):
    """A row of big-number cards for the cover."""
    w, h = CONTENT_W, 62
    d = Drawing(w, h)
    gap = 8
    cw = (w - gap * (len(items) - 1)) / len(items)
    for i, (num, label, color) in enumerate(items):
        x = i * (cw + gap)
        rrect(d, x, 0, cw, h, white, LINE, 0.7, 7)
        d.add(Rect(x + 10, h - 14, 18, 3, fillColor=color, strokeColor=color, strokeWidth=0))
        txt(d, x + 10, 26, num, 16, "Helvetica-Bold", INK)
        txt(d, x + 10, 12, label, 7.5, "Helvetica", MUTED)
    return d


def toc_table(rows):
    data = []
    for n, title, desc in rows:
        data.append([
            Paragraph('<a href="#%s" color="#1b6556">%02d</a>' % (n[0], n[1]), S["toc_n"]),
            [Paragraph(title, S["toc"]), Paragraph(desc, S["toc_d"])],
        ])
    t = Table(data, colWidths=[28, CONTENT_W - 28])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, LINE),
    ]))
    return t


def build():
    vocab_n, brain_bytes = installed_brain()
    vocab_label = f"{vocab_n:,}"
    brain_mb = f"{brain_bytes / 1_000_000:.1f}"
    st = lab_stats()
    STATS.update(st)
    doc = GuideDoc(
        OUT,
        pagesize=A4,
        title="Midel: a plain-language guide to the network",
        author="Midel",
        subject="Neuron, layer, block, head, teaching, and every related term used in this lab",
    )
    frame_cover = Frame(LEFT, 18 * mm, CONTENT_W, PAGE_H - 96 * mm - 28 * mm, id="cover", showBoundary=0)
    frame_body = Frame(LEFT, 18 * mm, CONTENT_W, PAGE_H - 28 * mm, id="body", showBoundary=0)
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame_cover], onPage=draw_cover),
        PageTemplate(id="body", frames=[frame_body], onPage=draw_body, onPageEnd=draw_footer),
    ])

    CHAPTER["n"] = 0
    story = []
    story.append(P(
        "This guide is for the lab in this folder. It uses Midel's real sizes: a library of lessons, a small network of stored short lines, and a deep network saved as a file of weights. It also explains how lessons are added, how the deep network is kept up to date, and how an answer reaches the screen. The page does not train either network. No background in mathematics is required.",
        "lead",
    ))
    story.append(stat_cards([
        (f"{st['short_lines']:,}", "short lines in the small network", INDIGO),
        (f"{vocab_label}", "words the deep network knows", TEAL),
        (f"{st['deep_weights'] / 1e6:.2f} M", "weights in the deep network", AMBER),
        (f"{962 + st['taught_rows']:,}", "library lessons", TEAL),
    ]))
    story.append(Spacer(1, 12))
    story.append(three_parts())
    story.append(P("Figure 1. Three pieces answer a question. Only two of them are neural networks.", "caption"))
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(P("CONTENTS", "kicker"))
    story.append(P("What is inside", "h1"))
    story.append(Rule())
    story.append(Spacer(1, 6))
    toc = [
        (("confused", 1), "The words that get mixed up", "One table that sorts everyday words from lab words."),
        (("path", 2), "The path of one question", "From the sentence you type to the answer on screen."),
        (("token", 3), "Tokens, vocabulary, embeddings", "How text becomes numbers."),
        (("neuron", 4), "A neuron", "Weight, bias, and ReLU with a worked sum."),
        (("layer", 5), "A layer, and what width means", "Width and depth are not the same."),
        (("block", 6), "A block", "Residual, layer norm, and the mixer."),
        (("head", 7), "Heads and attention", "Query, key, value, softmax, and the causal grid."),
        (("stack", 8), "The deep network, end to end", "One forward pass, step by step."),
        (("two", 9), "The short network and the deep network", "Side by side, with live sizes."),
        (("train", 10), "Training, in one loop", "Loss, gradient, learning rate, epoch."),
        (("why", 11), "Why a new lesson does not always enter the weights", "Interference and the gates."),
        (("answer", 12), "How an answer reaches the screen", "Spelling help, matching, sources, Copy, Wikipedia."),
        (("teach", 13), "Teaching: adding lessons", "Short lines, full lessons, groups, and the writer."),
        (("keepup", 14), "Keeping the deep network up to date", "The install queue, replay, skipped, relearn, and health checks."),
        (("builds", 15), "Two builds: dev and deploy", "What a hosted copy can and cannot do."),
        (("panel", 16), "The side panel, card by card", "Each drawing and what it shows."),
        (("gloss", 17), "Glossary", "Every term used in this lab."),
        (("keep", 18), "What to keep in mind", "The short version."),
    ]
    story.append(toc_table(toc))
    story.append(Spacer(1, 8))
    story.append(P("4 October 2026. Open the page, ask something, and keep this beside it.", "footer_note"))

    story.append(PageBreak())

    story += section("confused", "The words that get mixed up")
    story.append(P(
        "Most of the confusion is that everyday English and this lab reuses the same short words for different things. Read this page once. The rest of the guide is the longer version of the table.",
        "body",
    ))
    story.append(compare_table())
    story.append(P("Figure 2. The same word, said carefully. Later sections draw each one.", "caption"))
    story.append(Note(
        "<b>A useful test.</b> If you can point to it in a lesson sentence, it is text. If it is a number stored in the brain file, it is a weight or another parameter. Sofia, as a fact, lives in the library. Sofia, as a token the deep network can write, lives only if that word is already in the vocabulary. This brain file has " + vocab_label + " entries."
    ))

    story += section("path", "The path of one question")
    story.append(P(
        "Before any neuron is involved, the page decides what kind of sentence you typed. The picture below is the whole product, not only the deep network.",
        "body",
    ))
    story.append(question_path())
    story.append(P("Figure 3. Six steps. The answer sentence usually comes from step 4, the library.", "caption"))
    story.append(P(
        "A question mark, or a sentence that starts with what, why, how, is, and similar words, is treated as a question. A short line, a question with an answer of one to three words or a statement of two to five words, is stored with the small network. A plain statement of about six or more words, with no question mark and not a request such as explain or list, is stored with the deep network's lessons. Neither write changes the deep weights by itself.",
        "body",
    ))
    story.append(P(
        "Yes or no is a special case. The page looks at the clause that actually mentions the subject. The deep network is allowed to say yes or no only when its vote matches that reading of the lesson. Otherwise you see the stored sentence.",
        "body",
    ))

    story.append(CondPageBreak(220))
    story += section("token", "Tokens, vocabulary, embeddings")
    story.append(P("Token", "term"))
    story.append(P(
        "A token is one piece the network can hold in its sequence. In this lab a token is a word, a number, or a single mark. The sentence is not sent in as a picture of letters. It is sent in as a row of tokens.",
        "body",
    ))
    story.append(P("Tokenizer", "term"))
    story.append(P(
        "The tokenizer is the cutting rule. Midel lowercases everything, removes commas that sit inside numbers, and then keeps numbers (including decimals and a trailing percent), words made of letters, and the marks ? . ! , A leading minus on a temperature is dropped. Letters outside plain English, such as n-tilde, are dropped, so a name can arrive shorter than you typed it.",
        "body",
    ))
    story.append(P("Vocabulary", "term"))
    story.append(P(
        "The vocabulary is the closed list of tokens the deep network has a row for. It began with the biology training and grows each time a library lesson is taught and the gates pass. This file has " + vocab_label + " entries. If a token is not on the list, it is dropped before the network runs. A name from a lesson that is still waiting can be missing. The network never receives that word, which is why some drawings used to wander.",
        "body",
    ))
    story.append(P("Embedding", "term"))
    story.append(P(
        "An embedding is the list of numbers that stands for one token at the start of the pass. In the deep network that list is 128 numbers long. The network does not store the spelling. It stores this list, and training moves the numbers. Two tokens can end up with similar lists if they were useful in similar places. That is a habit of the training, not a definition from a dictionary.",
        "body",
    ))
    story.append(P("Positional encoding", "term"))
    story.append(P(
        "Word order matters: capital of Bulgaria is not Bulgaria of capital. A second list of numbers, one per position, is added to the embedding so the first token is not interchangeable with the fourth. Those added numbers are the positional encoding. People also say position vector.",
        "body",
    ))
    story.append(P("Context", "term"))
    story.append(P(
        "Context, or the context window, is how many tokens fit in one pass. The deep network keeps the most recent 128. The short network keeps 64. Anything older falls out of the window and cannot be looked at on that pass.",
        "body",
    ))

    story += section("neuron", "A neuron")
    story.append(P(
        "A neuron is one small decision. It is also called a unit. It is not a copy of a biological cell. The picture uses three toy inputs so the arithmetic is visible. A real layer has many more inputs, and you do not edit them by hand.",
        "body",
    ))
    story.append(neuron_diagram())
    story.append(P("Figure 4. One neuron. Each input is scaled by a weight, the results are added, a bias is added, then ReLU keeps or silences the sum.", "caption"))
    story.append(P("Weight", "term"))
    story.append(P(
        "A weight is the number on one arrow in that picture. Multiply the input by the weight. A weight of 0.8 means this input counts a lot. A weight of -0.5 means this input counts against the total. A weight near zero means this input barely matters. Training's whole job is to change weights.",
        "body",
    ))
    story.append(P("Bias", "term"))
    story.append(P(
        "The bias is a number added after the weighted inputs, before ReLU. It shifts the decision. With a bias, the neuron can output a positive number even when every input is zero.",
        "body",
    ))
    story.append(P("Activation and ReLU", "term"))
    story.append(P(
        "The activation is the rule applied to that sum. ReLU, short for rectified linear unit, is the rule inside Midel's mixer. If the sum is negative, the output is 0. The neuron stays silent. If the sum is positive, the output is the sum itself. Silence is how a network ignores a combination that did not matter.",
        "body",
    ))
    story.append(Note(
        "<b>Worked sum.</b> Suppose the inputs are 1, 1 and 1, with weights 0.8, 0.2 and -0.5, and the bias is 0.1. The sum is 0.8 + 0.2 - 0.5 + 0.1 = 0.6. ReLU leaves 0.6 as it is. If the sum had been -0.2, ReLU would have output 0."
    ))

    story += section("layer", "A layer, and what width means")
    story.append(P(
        "A layer is a whole row of neurons that read the same inputs together and produce a new row of numbers. One neuron makes one number. A layer of 128 neurons makes 128 numbers. That count is the width. In papers it is often called d_model.",
        "body",
    ))
    story.append(layer_diagram())
    story.append(P("Figure 5. Width. The deep network carries 128 numbers per token. The short network carries 32.", "caption"))
    story.append(P(
        "Depth is a different idea. Depth is how many steps sit on top of each other. The deep network is deep because it stacks 4 blocks, not because 128 is a large number. A wide network and a deep network are not the same phrase.",
        "body",
    ))
    story.append(P(
        "You will also meet the word layer inside a block: layer norm is a tidy-up step, and the MLP is made of layers. When the side panel says Block 1, Block 2, Block 3, Block 4, it means the four stacked steps, not four single neurons.",
        "body",
    ))

    story += section("block", "A block")
    story.append(P(
        "A block is one complete step of a transformer. It is much larger than a neuron. Each block does two jobs, and it keeps a copy of its input so it can add that copy back at the end of each job. The deep network runs four blocks in a row. The output row of numbers from block 1 is the input to block 2.",
        "body",
    ))
    story.append(block_diagram())
    story.append(P("Figure 6. Inside one block. Steps 4 and 7 are residual connections: add the new work onto the numbers that entered, instead of replacing them.", "caption"))
    story.append(P("Residual, or skip connection", "term"))
    story.append(P(
        "The residual is that addition. If a head is unsure, its contribution can be small, and the numbers that entered the block still pass through. The network can stack several blocks without each one being forced to rebuild the sentence from nothing.",
        "body",
    ))
    story.append(P("Layer norm, and pre-norm", "term"))
    story.append(P(
        "Layer norm recenters and rescales one token's numbers so a few huge values do not dominate the next step. Pre-norm means the tidy-up happens first, then the work, then the residual add. That is the layout of the deep network. You do not set these numbers yourself.",
        "body",
    ))
    story.append(P("MLP, or feed-forward mixer", "term"))
    story.append(P(
        "After the heads look across words, the MLP looks at each word's own 128 numbers. It widens them to 256, applies ReLU, and narrows them back to 128. MLP means multi-layer perceptron, which is an older name for a small stack of neuron layers. Feed-forward means this part does not look at other positions. The looking-across is the attention's job, not the mixer's.",
        "body",
    ))

    story += section("head", "Heads and attention")
    story.append(P(
        "Attention is the looking-back. For the token the network is finishing, every earlier token gets a share of the attention, and those shares add up to 100 percent. A head is one such look. The deep network has four heads, so it can keep four opinions about what mattered. They are combined before the residual add.",
        "body",
    ))
    story.append(heads_diagram())
    story.append(P("Figure 7. Four heads on the same four words. The bars are invented numbers to show the idea. A real pass uses the weights, and the shares change with the sentence.", "caption"))
    story.append(P(
        "Head size is the width of one head's private numbers. The deep network splits its 128 numbers into 4 heads, so each head is 32 wide. The short network has one head, and its whole width is 32, so that single head is also 32 wide.",
        "body",
    ))
    story.append(P("Query, key, and value", "term"))
    story.append(P(
        "Inside one head, each token is turned into three lists. The query is what this token is looking for. The key is what each earlier token offers as a label. The value is the information that gets mixed in if the query and the key match. You do not need to compute this to read the panel. The panel already shows the result: the shares.",
        "body",
    ))
    story.append(P("Softmax", "term"))
    story.append(P(
        "Softmax turns a list of raw match scores into shares that add up to 1. A score that is much larger than the others takes most of the share. The percentages on the heads and on the next-word bars are this kind of share.",
        "body",
    ))
    story.append(P("Causal", "term"))
    story.append(P(
        "Causal means the share on future tokens is forced to zero. While the network is at the word is, it may look at the and sahara and is. It may not look at hot, because hot has not been written yet. The grid shows that as empty cells.",
        "body",
    ))
    story.append(grid_diagram())
    story.append(P("Figure 8. A causal grid for four words. Read across a row to see where that word's attention went. Empty cells are the future. The bottom row is what the panel means by the last word.", "caption"))

    story += section("stack", "The deep network, end to end")
    story.append(P(
        "This is the forward pass of the deep network. Nothing in this picture changes a weight. It only reads the current weights and writes one next token. The example is a capital question. The chat sentence comes from the library. The network can continue it only with tokens it already has.",
        "body",
    ))
    story.append(deep_stack())
    story.append(P("Figure 9. One forward pass. Steps 6 and 7 are the four blocks from Figure 6. Step 9 can repeat: the new word is appended, and the pass runs again.", "caption"))
    story.append(P("Logits and probability", "term"))
    story.append(P(
        "At step 8 the network produces one raw score per vocabulary token. Those raw scores are the logits. Softmax turns them into probabilities, which are the bars in Next word the network preferred. The tallest bar is the greedy choice.",
        "body",
    ))
    story.append(P("Greedy decoding", "term"))
    story.append(P(
        "Greedy means: take the single highest probability, write that token, and run the forward pass again with the new token on the end. The network does not draft several full sentences and then choose. If the first token is the wrong city, the rest of the sentence often follows that wrong city, because each new pass is continuing what was just written.",
        "body",
    ))
    story.append(P("Hidden state", "term"))
    story.append(P(
        "After each block, every token still has 128 numbers, but they are no longer the raw embedding. They have been mixed with other tokens through attention and with the MLP. That mixed list is the hidden state. It is the block's working memory for those tokens.",
        "body",
    ))
    story.append(Note(
        "<b>What happened with Bulgaria.</b> The library contains the lesson that Sofia is the capital, and that lesson has since been taught into the weights, so bulgaria is on the list. Before that lesson was taught, step 3 dropped the name and the forward pass continued from older habits. The page still shows the stored sentence, and it hides a free guess that has left the lesson.",
        "amber",
    ))

    story += section("two", "The short network and the deep network")
    story.append(P(
        "Both are transformers. They are not two views of one brain. A lesson you add goes into one of them: a short line into the small network, a full lesson into the deep network’s lesson file. The page does not train either one in the browser.",
        "body",
    ))

    header = [P(" ", "cell_h"), P("Short network", "cell_h"), P("Deep network", "cell_h")]
    raw = [
        ("Where it lives", "Lessons in short_added.js (loaded on the first question)", "Weights in stage3_brain.js, lessons in the library"),
        ("Blocks", "1", "4, pre-norm"),
        ("Width", "32", "128"),
        ("Heads", "1", "4, each of size 32"),
        ("Context", "64 tokens", "128 tokens"),
        ("Mixer", "A small MLP", "MLP, width 256, then ReLU"),
        ("What it practices", "111 built-in short lines plus " + f"{st['short_added']:,}" + " added lines in 26 groups", "One waiting library lesson at a time, replayed with up to 64 recent ones. A save is kept only when the gates pass. " + f"{st['installed']:,}" + " lessons are installed."),
        ("When weights change", "Not in the browser. Lessons are stored as text.", "One lesson at a time, only if the gates pass."),
        ("Rough size", "About " + f"{st['short_weights']:,}" + " weights now. The count grows with the words in the stored lines. Vocabulary " + f"{st['short_vocab']:,}", f"{st['deep_weights']:,}" + " weights, " + brain_mb + " MB, vocabulary " + vocab_label),
    ]
    data = [header]
    for a, b, c in raw:
        data.append([P(esc(a), "cell"), P(esc(b), "cell"), P(esc(c), "cell")])
    table = Table(data, colWidths=[120, 180, CONTENT_W - 300], repeatRows=1)
    cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
    ]
    for i in range(1, len(data)):
        cmds.append(("BACKGROUND", (0, i), (-1, i), white if i % 2 else INDIGO_SOFT))
    table.setStyle(TableStyle(cmds))
    story.append(table)
    story.append(P("Figure 10. Two networks. The library is a third piece and is not in this table, because it has no weights.", "caption"))

    story += section("train", "Training, in one loop")
    story.append(P(
        "Training is the only time weights change. The page does not run this loop. The deep-network trainer does, for one waiting library lesson at a time. The picture is that one step.",
        "body",
    ))
    story.append(training_loop())
    story.append(P("Figure 11. One training step. An epoch is this picture repeated until every practice sentence has been used once. Then a new epoch starts.", "caption"))
    story.append(P("Loss", "term"))
    story.append(P(
        "The loss is a single number for how surprised the network was by the correct next token. If the correct token already had almost all the probability, the loss is small. If the correct token had almost none, the loss is large. Training tries to push the loss down. It does not try to memorize a sentence as a paragraph you can scroll. It tries to make the next token less surprising, one position at a time.",
        "body",
    ))
    story.append(P("Gradient and backpropagation", "term"))
    story.append(P(
        "The gradient of one weight is 'if I increase this weight a tiny bit, does the loss go up or down, and by how much?' Backpropagation is the method that computes that for every weight, starting at the loss and walking backward through the blocks. The step then moves each weight a little in the direction that reduces the loss.",
        "body",
    ))
    story.append(P("Learning rate", "term"))
    story.append(P(
        "The learning rate is the size of that little move. A large rate learns fast and can wreck older answers. A small rate is gentler and may not pick up a new name before training ends. The from-scratch deep run starts at 0.003 and slowly shrinks. Teaching one lesson starts tiny (0.0001), warms up to 0.0006 over two passes, then eases down along a curve. The short network uses 0.005.",
        "body",
    ))
    story.append(P("Epoch", "term"))
    story.append(P(
        "An epoch is one pass through the whole set of practice sentences. A from-scratch deep run is built for 80 epochs. The page does not run those passes. More epochs are not automatically better. After some point the network is fitting the practice wording rather than the idea.",
        "body",
    ))
    story.append(P("Optimizer, Adam, and SGD", "term"))
    story.append(P(
        "The optimizer is the rule that turns a gradient into a step. SGD, stochastic gradient descent, takes a plain step. Stochastic means the sentences arrive in a shuffled order. Adam keeps a running memory of recent gradients and of how jumpy each weight has been, and it takes smaller steps on jumpy weights. The deep network uses Adam. Parts of the short network use a clipped form of SGD, which also limits how large any single step can be. That limit is gradient clipping.",
        "body",
    ))
    story.append(P("Seed", "term"))
    story.append(P(
        "The seed is the start of the random number generator. Embeddings begin as small random numbers. Seed 7 makes that start repeatable. It does not encode facts.",
        "body",
    ))
    story.append(P("Parameter", "term"))
    story.append(P(
        "A parameter is any number the optimizer is allowed to change: one entry of an embedding, one weight in a head, one bias in the mixer. The deep network's parameters are exactly the contents of the brain file. The lesson sentences are not parameters.",
        "body",
    ))
    story.append(P("Inference", "term"))
    story.append(P(
        "Inference is a forward pass used to answer, with the optimizer switched off. Every question you type is inference. The page does not train. The separate deep-network trainer is the training step, and only when you run it.",
        "body",
    ))
    story.append(P("Checkpoint, fine-tune, and absorb", "term"))
    story.append(P(
        "A checkpoint is a saved brain file. Fine-tuning means more training that starts from a checkpoint instead of from random numbers. Absorb is the fine-tune that reads every lesson file in this folder and tries to teach those lessons to the installed deep network. It writes a new brain file only if the old checks still pass.",
        "body",
    ))

    story += section("why", "Why a new lesson does not always enter the weights")
    story.append(P(
        "The library can hold a new fact immediately, because a library is a list. A network can hold a new fact only by moving weights until the forward pass prefers the right next token. Those are different kinds of memory.",
        "body",
    ))
    story.append(P(
        "Many geography lessons share a shape: a city name, then is the capital of, then a country. The shared words are easy. The one token that makes Bulgaria different from Afghanistan is easy to mix up, because the sentences are almost the same. During a fine-tune the network often learns the shape and then attaches the wrong name. That mix-up is called interference. A stronger learning rate, or more epochs, can also move the old biology answers until a yes becomes a no.",
        "body",
    ))
    story.append(P(
        "The checks that refuse a bad save are called gates. Angel Falls must still continue with the number 979. The Sahara must still be hot. Antarctica must still not be called the largest hot desert, and must still be the largest desert. Mercury must still be closer to the Sun. If a gate fails, the previous brain file stays. The new lessons remain in the library, which is why the chat can still say Sofia.",
        "body",
    ))
    story.append(P(
        "A new lesson is never practiced alone. Each run replays up to 64 of the most recently installed lessons, plus the yes and no checks, so the new name does not push them out. After a few passes the trainer checks <b>retention</b>: the new needle word, the new lesson, and every replayed lesson must still come out right. If one slipped, training goes on, and a short rescue rehearses the dropped lesson before the run gives up. A needle is a distinctive word taken from the opening of the answer, so a glue word such as the or of never counts.",
        "body",
    ))
    story.append(Note(
        "<b>What you should expect.</b> A short line is stored with the small network at once. A full lesson is stored with the deep network's lessons at once. The deep weights change only when that lesson's training run finishes and the gates pass. Until then, the chat still uses the stored sentence, and the side diagram will not pretend a free guess is the lesson."
    ))

    story += section("answer", "How an answer reaches the screen")
    story.append(P(
        "Chapter 2 drew the path in six steps. This chapter is what you actually see in the thread: what helps you type, which blocks can appear, and what the small links under them do.",
        "body",
    ))
    story.append(P("Spelling help in the prompt", "term"))
    story.append(P(
        "The prompt checks spelling against the lessons, the notes you added, and the deep network's words. A finished word that is one or two letters off a known name is replaced when you type the space. After two characters, up to five lines appear: a corrected or completed word first, then matching questions. Click one, or highlight it and press Enter, to ask it. A word row replaces only the word you are typing. Escape closes the list.",
        "body",
    ))
    story.append(P("Typo-tolerant matching", "term"))
    story.append(P(
        "Matching is forgiving on purpose. Every word of the question is compared with the ask words (what, who, where) and with each lesson's own vocabulary. Missing letters, a dropped first letter, and small swaps are allowed. The allowance grows with word length: up to two edits on typical words, three on long ones. If two candidates tie, nothing is guessed. When typos helped but the overlap is under about 72%, the chat shows <b>Did you mean...?</b>, and a click fills the prompt.",
        "body",
    ))
    story.append(answer_blocks())
    story.append(P("Figure 12. The blocks an answer can have, from top to bottom. Most questions show one or two of them.", "caption"))
    story.append(P("Which sentence is shown", "term"))
    story.append(P(
        "When one lesson matches well, the chat may show a sentence the deep network wrote itself, but only if that pass is <b>complete</b>: it used the same question forms as training, stayed on the lesson's words, contains the key answer word, and covers every stored sentence of the lesson. A partial paraphrase is never shown. The full stored text is shown instead. Yes or no answers, and questions where two lessons disagree, use the library sentence, or the network's yes or no when it agrees.",
        "body",
    ))
    story.append(P(
        "A shorter question that is an exact start of a lesson's question counts as the same lesson. If the small network also holds a short line for it, both answers appear: the short line and the full stored sentence.",
        "body",
    ))
    story.append(P("Source lines, Copy, and Ask Gemini", "term"))
    story.append(P(
        "Under an answer, a source line names where it came from, such as <i>from Science #3208</i>. A row saved from Wikipedia reads <i>Deep network learned #id</i>. A weak, shared-word-only hit is labelled <i>Loose library match</i> until a better row replaces it. Each answer block has its own <b>Copy</b> button that copies only that block. <b>Ask Gemini</b> opens Google AI Mode for the same question. While a reply is finishing, three breathing dots sit where it will start.",
        "body",
    ))
    story.append(P("Online lookup and Remember", "term"))
    story.append(P(
        "In the left panel, <b>Use Wikipedia summaries in chat</b> adds a short English extract, labelled <i>Online - Wikipedia</i>, with a link. On the Mac that owns the files it asks the writer program first. On a hosted copy the browser loads Wikipedia directly. The extract is licensed CC BY-SA. A second switch, <b>Remember</b>, exists only in the dev build. When the deep library did not really answer, it saves one trimmed lesson of one or two sentences, in the category Wikipedia, if the article passes the relevance gates. Weights are not trained by that save.",
        "body",
    ))
    story.append(Note(
        "<b>Remember the difference.</b> Showing a Wikipedia paragraph and teaching the network are two separate things. The paragraph is read from the web. A saved row becomes a library lesson at once, and reaches the weights only when the install loop in chapter 14 gets to it."
    ))

    story += section("teach", "Teaching: adding lessons")
    story.append(P(
        "Teaching is the pencil icon on the left rail. It is how new knowledge is written down. What you type is sorted by its shape, and the Add box uses the same sorting as the prompt.",
        "body",
    ))
    story.append(teach_split())
    story.append(P("Figure 13. Where a line goes. Only the second and third branches write anything.", "caption"))
    story.append(P("Groups", "term"))
    story.append(P(
        "A short line goes into one of 26 groups in <font name='Courier'>short_added.js</font>, such as Animals, Sky and space, or Money and shops. A full lesson goes into a category section of <font name='Courier'>taught_facts.js</font>. Type a new category name and it is added to the list. Statement lines also answer as questions: a line such as <i>Honey never spoils.</i> is also matched by <i>what is honey</i>. Those question forms are built in memory and are never written to the file.",
        "body",
    ))
    story.append(P("The writer", "term"))
    story.append(P(
        "The page cannot write files. A small local program, the <b>writer</b> (<font name='Courier'>save_taught.py</font>, port 8787, this computer only), does it. Add and Remove are saved to disk first, and the page keeps the lesson only after that succeeds. On a Mac it is installed once and keeps running after login. On Windows it is started and left open. A static host cannot run it, so adding lessons works only on the computer where the writer runs.",
        "body",
    ))
    story.append(P("Ids and corrections", "term"))
    story.append(P(
        "Every full lesson has an id. Teaching rows count up from 3001 and skip the blocks owned by packs, for example 4001 to 4040 for gemstones. Saves merge by id, so a page with an old copy of the list cannot erase newer rows. <b>Correct answer</b> in the dev chat changes one row, and it can queue that lesson to be relearned by the deep network. An audit command checks for id collisions and stray gaps.",
        "body",
    ))
    story.append(P("Packs", "term"))
    story.append(P(
        "A <b>pack</b> is a file of lessons on one subject, named <font name='Courier'>something_facts.js</font>: biology, math, gemstones, chemistry, geography, skills, artificial intelligence, design, Bulgarian history, and scientists. With the science and geography lessons, that makes 962 built-in lessons. Teaching rows (" + f"{st['taught_rows']:,}" + " now) are counted separately. A new pack file is picked up automatically, and it must use its own block of ids.",
        "body",
    ))
    story.append(P("A large file, loaded late", "term"))
    story.append(P(
        "The short-line file is big. The page does not read it at start-up. A tiny companion file, <font name='Courier'>short_added.meta.js</font>, carries the counts so the Network load card is right from the first second. On the first question the page fetches the full file, builds a word index, and then searches only about 160 candidate lines plus the 111 built-in ones.",
        "body",
    ))

    story += section("keepup", "Keeping the deep network up to date")
    story.append(P(
        "A lesson is usable in the chat the moment it is saved, because the library is just a list. Reaching the deep network's weights is slower and is done by a separate trainer, one lesson at a time.",
        "body",
    ))
    story.append(install_loop())
    story.append(P("Figure 14. One install run. The same loop repeats until the queue is empty.", "caption"))
    story.append(P("The queue", "term"))
    story.append(P(
        "Only a lesson that has its own question and answer can be taught. A note with no question stays in the chat. Each run takes the highest id that is not yet installed or skipped, so a high pack id can go before an older Teaching row. The trainer prints a queue line such as <i>installed 920, skipped 7, pending, teachable</i>. A loop command repeats runs until the queue is empty.",
        "body",
    ))
    story.append(P("Installed, skipped, deferred, relearn", "term"))
    story.append(P(
        "<b>Installed</b> means the weights learned it and every check passed. <b>Deferred</b> means a run failed; it is retried after the other waiting lessons, and after four failures it becomes <b>skipped</b>. A skipped lesson stays in the library for chat. You can also skip one by hand. <b>Relearn</b> is a second queue for lessons whose text was corrected, or that drifted: the trainer teaches the new text and exports only if the checks still pass. Currently " + f"{st['installed']:,}" + " lessons are installed.",
        "body",
    ))
    story.append(P("Health check", "term"))
    story.append(P(
        "A read-only <b>eval</b> command loads the weights and re-asks every installed lesson, plus the Sahara, Mercury, and Angel Falls gates. It writes nothing. A low score is common because its needle test is stricter than the chat, which shows the full library sentence. Lessons that drifted are candidates for relearn, not proof that the library is wrong.",
        "body",
    ))
    story.append(P("Wikipedia batch", "term"))
    story.append(P(
        "A batch command reads a long list of questions, fetches a summary for each, and saves rows that pass the same relevance gates as Remember. It only grows the lesson file. The install loop is what moves them into the weights, and the two can safely run side by side. Two writers on the same port, or editing the weights file by hand while a loop runs, is not safe.",
        "body",
    ))
    story.append(P("Backup", "term"))
    story.append(P(
        "One <b>backup</b> command refreshes the numbers in the model notes, rebuilds this guide, and packs the two zip files. Wait until the weights file ends with a semicolon before running it, so a half-written file is never packed.",
        "body",
    ))

    story += section("builds", "Two builds: dev and deploy")
    story.append(P(
        "The same page ships in two ways. The <b>dev</b> zip is the full lab for another Mac. The <b>deploy</b> zip is a static folder for a web host. Chat, answers, and the side panel work the same in both.",
        "body",
    ))
    bh = [P(" ", "cell_h"), P("Dev build", "cell_h"), P("Deploy build", "cell_h")]
    braw = [
        ("Left panel", "Full Teaching: Add form, lesson lists, Remember switch", "About Midel: network load and the Wikipedia display switch"),
        ("Add or remove lessons", "Yes, with the writer running", "No. The page is read-only"),
        ("Remember Wikipedia", "Yes, dev only", "No"),
        ("Wikipedia display", "Through the writer, or straight from the browser", "Straight from the browser"),
        ("Short-line counts", "short_added.meta.js", "Counts are embedded in the page itself"),
        ("Contains", "Page, packs, trainer, writer, scripts, notes, this guide", "Only what the page loads: page, packs, weights, logos"),
    ]
    bd = [bh]
    for a, b, c in braw:
        bd.append([P(esc(a), "cell"), P(esc(b), "cell"), P(esc(c), "cell")])
    bt = Table(bd, colWidths=[100, 190, CONTENT_W - 290], repeatRows=1)
    bcmds = [
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEBELOW", (0, 0), (-1, -1), 0.3, LINE),
    ]
    for i in range(1, len(bd)):
        bcmds.append(("BACKGROUND", (0, i), (-1, i), white if i % 2 else INDIGO_SOFT))
    bt.setStyle(TableStyle(bcmds))
    story.append(bt)
    story.append(P("Figure 15. The two builds. After changing lookup or page code, run the backup again and upload the new page from the zip.", "caption"))

    story += section("panel", "The side panel, card by card")
    story.append(P(
        "The panel on the right is a view of the latest question. It is not a second brain. The cards, from top to bottom:",
        "body",
    ))
    cards = [
        ("<b>Path.</b> The route the page took: the words, whether the library matched, whether the network was allowed to replace the sentence, and what was shown."),
        ("<b>Lessons considered.</b> The closest lessons and the overlap score. The one marked used is the lesson behind the answer."),
        ("<b>Attention.</b> The last step of a pass that stayed on the lesson. The stored sentence is the answer above this card. The drawing has just read one word of that sentence and is choosing the next. The curves are earlier words in the same sentence. The circle is the word just read. The footer names the next word. This is not a score of how well the question matched the lesson. If the free guess left the lesson, this drawing is hidden on purpose."),
        ("<b>Signal.</b> The same deep pass, played back. Columns are the tokens. Rows are the 128 units. The frames run from the tokens entering, through the four blocks, then the preferred next words. Brighter means a larger activation."),
        ("<b>Heads on the last word.</b> One row per head. The word and the percentage are that head's largest share. Four rows means the deep network. One head means you are looking at the short network."),
        ("<b>Library-only notice.</b> When a lesson is in the library but its topic words are not in the brain file yet, the panel says so instead of drawing a guess. The drawings return after that lesson is taught."),
        ("<b>Next word the network preferred.</b> The probability bars from step 8 of Figure 9. The top bar is the greedy choice. It is a guess about the next token, not a definition."),
    ]
    for line in cards:
        story.append(bullet(line))
    story.append(Spacer(1, 6))
    story.append(P(
        "The Layer buttons switch which of the four blocks you are looking at. Layer 1 is the first look. Layer 4 is the last look before the next word is chosen. They do not retrain anything. The animation on the curves is only a way to see the same shares move. The numbers are the pass. The motion is not a separate computation. The sizes of both networks are on the Teaching panel, on the Network load card.",
        "body",
    ))

    story += section("gloss", "Glossary")
    story.append(P(
        "Every term used while building and running this lab, in one place. If a sentence in a later session uses one of these words, this is the meaning it has here.",
        "body",
    ))
    # Split glossary so a header can repeat and a section isn't one giant unbreakable table.
    story.append(glossary_table(sorted(GLOSSARY, key=lambda e: e[0].lower())))
    story.append(P("Figure 16. The working vocabulary of this lab. The same words in another product can be sized differently. The ideas match.", "caption"))

    story += section("keep", "What to keep in mind")
    story.append(recap_strip())
    story.append(P("Figure 17. The whole deep pass in one row. Pair it with Figure 3 when you want the page's full path, including the library.", "caption"))
    story.append(bullet("The chat sentence comes from the library when the match is strong enough."))
    story.append(bullet("The short network and the deep network are two transformers. Training one leaves the other as it was."))
    story.append(bullet("A neuron is one decision. A layer is a row of them. A block is look-back plus mixer. A head is one way of looking back."))
    story.append(bullet("Attention is a split of 100 percent over earlier tokens. The grid's empty cells are the future, which a causal network cannot see."))
    story.append(bullet("A token missing from the vocabulary is dropped. The deep network cannot attend to a word it never received."))
    story.append(bullet("Asking is a forward pass. Weights move only during training, and a deep-network save is kept only when the gates pass."))
    story.append(bullet("A lesson is usable in chat the moment it is saved. It reaches the weights only when the install loop teaches it and the gates pass."))
    story.append(bullet("Adding lessons needs the writer program, so it works only on the computer where it runs. A hosted copy is read-only."))
    story.append(bullet("A Wikipedia paragraph on screen is read from the web. A saved Wikipedia row is a library lesson."))
    story.append(Spacer(1, 8))
    story.append(P(
        "When a word on the screen is still unclear, look it up in the glossary, then find its picture: the neuron in Figure 4, the block in Figure 6, the heads in Figure 7, the full pass in Figure 9, the training loop in Figure 11.",
        "body",
    ))

    doc.build(story)


if __name__ == "__main__":
    build()
    print("wrote", OUT)
