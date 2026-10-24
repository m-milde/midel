/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/** UTF-8 byte BPE v2 — keep in sync with midel_bpe.py */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.MidelTokenizerV2 = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var BASE = 256;

  function mergeInDoc(doc, a, b, newId) {
    var out = [];
    var i = 0;
    while (i < doc.length) {
      if (i < doc.length - 1 && doc[i] === a && doc[i + 1] === b) {
        out.push(newId);
        i += 2;
      } else {
        out.push(doc[i]);
        i++;
      }
    }
    return out;
  }

  function buildTokenBytes(merges) {
    var tb = [];
    for (var i = 0; i < BASE; i++) tb.push(new Uint8Array([i]));
    for (var m = 0; m < merges.length; m++) {
      var a = merges[m][0];
      var b = merges[m][1];
      var left = tb[a];
      var right = tb[b];
      var combined = new Uint8Array(left.length + right.length);
      combined.set(left);
      combined.set(right, left.length);
      tb.push(combined);
    }
    return tb;
  }

  function prepareText(text) {
    var s = String(text || '').toLowerCase();
    return s.replace(/(\d),(?=\d)/g, '$1');
  }

  function MidelBPE(merges) {
    this.merges = merges || [];
    this.mergeRanks = {};
    for (var i = 0; i < this.merges.length; i++) {
      this.mergeRanks[this.merges[i][0] + ',' + this.merges[i][1]] = i;
    }
    this.tokenBytes = buildTokenBytes(this.merges);
  }

  MidelBPE.prototype.encode = function (text) {
    var enc = new TextEncoder();
    var ids = Array.from(enc.encode(text));
    if (ids.length < 2) return ids;
    while (true) {
      var bestRank = Infinity;
      var best = null;
      for (var i = 0; i < ids.length - 1; i++) {
        var key = ids[i] + ',' + ids[i + 1];
        if (Object.prototype.hasOwnProperty.call(this.mergeRanks, key)) {
          var rank = this.mergeRanks[key];
          if (rank < bestRank) {
            bestRank = rank;
            best = [ids[i], ids[i + 1]];
          }
        }
      }
      if (best === null) break;
      var newId = BASE + bestRank;
      ids = mergeInDoc(ids, best[0], best[1], newId);
    }
    return ids;
  };

  MidelBPE.prototype.decode = function (ids) {
    var total = 0;
    for (var i = 0; i < ids.length; i++) total += this.tokenBytes[ids[i]].length;
    var out = new Uint8Array(total);
    var off = 0;
    for (var j = 0; j < ids.length; j++) {
      var chunk = this.tokenBytes[ids[j]];
      out.set(chunk, off);
      off += chunk.length;
    }
    return new TextDecoder().decode(out);
  };

  MidelBPE.fromJSON = function (data) {
    var merges = (data.merges || []).map(function (m) {
      return [m[0], m[1]];
    });
    return new MidelBPE(merges);
  };

  var loaded = null;

  return {
    prepareText: prepareText,
    loadFromObject: function (data) {
      loaded = MidelBPE.fromJSON(data);
      return loaded;
    },
    loadFromJSON: function (json) {
      return this.loadFromObject(typeof json === 'string' ? JSON.parse(json) : json);
    },
    encode: function (text, opts) {
      var s = opts && opts.prepared ? text : prepareText(text);
      return loaded.encode(s);
    },
    decode: function (ids) {
      return loaded.decode(ids);
    },
    vocabSize: function () {
      return loaded ? BASE + loaded.merges.length : 0;
    },
    MidelBPE: MidelBPE
  };
});
