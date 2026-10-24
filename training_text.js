/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** Normalization for training copies only (library storage stays structured). See DEEP_NETWORK_REBUILD_PLAN §5.4. */
var TRAINING_TEXT_VERSION = 1;

var TRAINING_SYMBOL_WORDS = [
  ["×", " times "],
  ["÷", " divided by "],
  ["−", " minus "],
  ["–", " minus "],
  ["—", " "],
  ["±", " plus or minus "],
  ["√", " square root of "],
  ["π", " pi "],
  ["≤", " at most "],
  ["≥", " at least "],
  ["²", " squared"],
  ["³", " cubed"],
  ["%", " percent"]
];

/**
 * @param {string} answer stored library answer (may include markdown bullets, bold, symbols)
 * @returns {string} plain sentence text for tokenization / training
 */
function trainingText(answer) {
  var s = String(answer || "");
  s = s.replace(/\*\*/g, "");
  s = s.replace(/\r\n/g, "\n");
  var lines = s.split("\n");
  var parts = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].replace(/^\s*[-*•]\s+/, "").trim();
    if (!line) continue;
    parts.push(line);
  }
  s = parts.join(". ");
  s = s.replace(/\.\.+/g, ".");
  for (var j = 0; j < TRAINING_SYMBOL_WORDS.length; j++) {
    s = s.split(TRAINING_SYMBOL_WORDS[j][0]).join(TRAINING_SYMBOL_WORDS[j][1]);
  }
  s = s.replace(/(\d)\s*\/\s*(\d)/g, "$1 divided by $2");
  s = s.replace(/\s+/g, " ").trim();
  if (s && !/[.!?]$/.test(s)) s += ".";
  return s;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { trainingText, TRAINING_TEXT_VERSION, TRAINING_SYMBOL_WORDS };
}
