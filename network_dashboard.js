/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Interactive rebuild network + corpus dashboard.
 */

(function () {
  'use strict';

  var state = {
    snapshot: null,
    live: null,
    heatmaps: null,
    embed: null,
    arch: null,
    selectedTensor: null,
    selectedTokenId: 0,
    selectedArchBlock: null,
    pollTimer: null,
    weightDots: null,
    corpusGrid: null,
    tokenizerReady: false,
    embedLoading: false,
    encodeRun: 0
  };

  var COLORS = {
    accent: '#6b9aa3',
    accent2: '#8a7a9a',
    good: '#6a9a78',
    muted: '#7a8494'
  };

  function $(id) {
    return document.getElementById(id);
  }

  function fmt(n) {
    if (n == null || n !== n) return '—';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
    return String(n);
  }

  function fmtPct(p) {
    return p == null ? '—' : p.toFixed(1) + '%';
  }

  function safeRun(name, fn) {
    try {
      fn();
    } catch (e) {
      console.error('dashboard:' + name, e);
      var err = $('boot-err');
      if (err && !err.textContent) err.textContent = 'Partial load: ' + e.message;
    }
  }

  async function loadSnapshot() {
    try {
      var r = await fetch('versions/network-dashboard-summary.json?_=' + Date.now());
      if (r.ok) return r.json();
    } catch (e) {
      /* file:// or offline */
    }
    if (typeof NETWORK_DASHBOARD_SUMMARY !== 'undefined') return NETWORK_DASHBOARD_SUMMARY;
    if (typeof NETWORK_DASHBOARD_SNAPSHOT !== 'undefined') return NETWORK_DASHBOARD_SNAPSHOT;
    throw new Error('No dashboard data — run npm run dashboard:export from nn-tutorial');
  }

  async function loadHeatmapsOnce() {
    if (state.heatmaps) return state.heatmaps;
    try {
      var r = await fetch('versions/network-dashboard-heatmaps.json?_=' + Date.now());
      if (r.ok) {
        state.heatmaps = await r.json();
        return state.heatmaps;
      }
    } catch (e) {
      /* ignore */
    }
    var rb = state.snapshot && state.snapshot.rebuild;
    state.heatmaps = (rb && rb.heatmaps) || {};
    return state.heatmaps;
  }

  function schedulePoll() {
    if (state.pollTimer) clearInterval(state.pollTimer);
    var ms = state.live && state.live.status === 'training' ? 2000 : 7000;
    state.pollTimer = setInterval(pollLive, ms);
  }

  async function pollLive() {
    try {
      var r = await fetch('versions/network-live.json?_=' + Date.now());
      if (r.ok) {
        var prev = state.live && state.live.status;
        state.live = await r.json();
        if (prev !== state.live.status) schedulePoll();
      }
    } catch (e) {
      /* file:// or offline */
    }
    safeRun('live-pills', renderLivePills);
    safeRun('live-banner', renderLiveBanner);
    safeRun('charts', renderTrainingCharts);
    if (state.snapshot) {
      safeRun('overview-refresh', function () { renderOverview(state.snapshot); });
      safeRun('insights-refresh', function () { renderInsights(state.snapshot); });
      safeRun('pixels-live', function () { applyLiveWeightGrid(); });
    }
  }

  async function loadEmbeddingsLazy(arch) {
    if (!arch || state.embed || state.embedLoading) return;
    state.embedLoading = true;
    try {
      var r = await fetch('versions/network-dashboard-embeddings.f32?_=' + Date.now());
      if (!r.ok) return;
      var buf = await r.arrayBuffer();
      state.embed = new Float32Array(buf);
      state.arch = arch;
    } catch (e) {
      /* file:// or missing export */
    } finally {
      state.embedLoading = false;
    }
  }

  function mergedHistory() {
    var hist = [];
    if (state.live && state.live.history && state.live.history.length) hist = state.live.history.slice();
    else if (state.snapshot && state.snapshot.training_history) hist = state.snapshot.training_history.slice();
    hist = hist.filter(function (p) {
      return p && (p.epoch != null || p.loss != null || p.pass_pct != null);
    });
    hist.sort(function (a, b) {
      return (a.epoch || 0) - (b.epoch || 0);
    });
    return hist;
  }

  function lastPassPct(snap) {
    if (state.live && state.live.pass_pct != null) return state.live.pass_pct;
    var hist = mergedHistory();
    for (var i = hist.length - 1; i >= 0; i--) {
      if (hist[i].pass_pct != null) return hist[i].pass_pct;
    }
    return null;
  }

  function trainingProgressFrac(live, rebuild) {
    var planned = (live && live.epochs_planned) || (rebuild.meta && (rebuild.meta.epochs_planned || rebuild.meta.epochs)) || 40;
    var done = live && live.epoch_done != null ? live.epoch_done : (rebuild.meta && rebuild.meta.epoch_done) || 0;
    var batchFrac = 0;
    if (live && live.status === 'training' && live.batch_pct != null) {
      batchFrac = live.batch_pct / 100 / Math.max(1, planned);
    }
    var epochBase = live && live.epoch_in_progress ? live.epoch_in_progress - 1 : done;
    return Math.min(1, (epochBase + (live && live.batch_pct != null ? live.batch_pct / 100 : 0)) / planned);
  }

  function renderLivePills() {
    var el = $('live-pills');
    if (!el) return;
    var live = state.live;
    var html = '';
    if (live && live.status === 'training') {
      var ep = live.epoch_in_progress || live.epoch_done || '?';
      html +=
        '<span class="pill live">● Learning — epoch ' +
        ep +
        '/' +
        (live.epochs_planned || '?') +
        (live.batch_pct != null ? ' · ' + live.batch_pct + '% of epoch' : '') +
        '</span>';
    } else {
      html += '<span class="pill idle">○ ' + (live && live.status ? live.status : 'idle — open via local HTTP server') + '</span>';
    }
    html += '<span class="pill"><a href="neural_lab.html">Open Midel lab</a></span>';
    html += '<span class="pill">Snapshot: npm run dashboard:export</span>';
    el.innerHTML = html;
  }

  function renderLiveBanner() {
    var el = $('live-learning-banner');
    if (!el) return;
    var live = state.live;
    if (!live || live.status !== 'training') {
      el.classList.add('hidden');
      el.classList.remove('visible');
      return;
    }
    el.classList.remove('hidden');
    el.classList.add('visible');
    var loss = live.running_loss != null ? live.running_loss : live.last_loss;
    el.innerHTML =
      '<strong>Live training</strong> — epoch ' +
      (live.epoch_in_progress || live.epoch_done) +
      ' of ' +
      (live.epochs_planned || '?') +
      (live.batch_no ? ', batch ' + live.batch_no + '/' + (live.batches_in_epoch || '?') : '') +
      (loss != null ? '. Running loss ≈ ' + Number(loss).toFixed(3) : '') +
      '. Weight map on the right refreshes each epoch and while batches run.';
  }

  function renderOverview(snap) {
    var corpus = snap.corpus || {};
    var lab = corpus.lab_library || {};
    var trainer = corpus.trainer || {};
    var small = corpus.small_network || {};
    var rebuild = snap.rebuild || {};
    var arch = rebuild.architecture || {};
    var legacy = snap.legacy || {};
    var live = state.live || {};

    var fullTarget =
      corpus.target_trainable_full_rebuild ||
      (corpus.row_counts &&
        (corpus.row_counts.fact_pack || 0) +
          (corpus.row_counts.science_core || 0) +
          (corpus.row_counts.short || 0)) ||
      corpus.total_rows;

    $('stat-lab-total').textContent = fmt(lab.lab_deep_total);
    $('stat-lab-split').textContent =
      fmt(lab.lab_built_in) + ' built-in + ' + fmt(lab.lab_teaching) + ' Teaching (same as lab left panel)';
    $('stat-short-total').textContent = fmt(small.lesson_total);
    $('stat-short-note').textContent =
      (small.added_lines ? fmt(small.added_lines) + ' added lines' : 'short_added.js') +
      ' · transfer to deep net: planned, lower weight';
    $('stat-trainer-qa').textContent = fmt(trainer.all_question_answer_rows);
    var packTrain =
      trainer.fact_pack_trainable != null
        ? trainer.fact_pack_trainable
        : trainer.after_restricted_exclusion;
    $('stat-trainer-note').textContent =
      fmt(packTrain) +
      ' fact packs (all categories) · tier ' +
      (arch.tier || live.tier || rebuild.meta && rebuild.meta.tier || '—');
    if ($('stat-tier')) $('stat-tier').textContent = arch.tier || live.tier || '—';
    $('stat-full-target').textContent = fmt(fullTarget);
    $('stat-eval-n').textContent = fmt(corpus.eval_eligible_packs);
    $('stat-params').textContent = fmt(arch.params_estimate);

    var planned = live.epochs_planned || (rebuild.meta && (rebuild.meta.epochs_planned || rebuild.meta.epochs)) || 40;
    var frac = trainingProgressFrac(live, rebuild);
    var pct = Math.min(100, frac * 100);
    var epoch = live.epoch_done || (rebuild.meta && rebuild.meta.epoch_done) || 0;
    var ring = $('epoch-ring');
    if (ring) {
      ring.style.setProperty('--p', String(pct));
      var label =
        live.status === 'training' && live.epoch_in_progress
          ? live.epoch_in_progress + '/' + planned
          : epoch + '/' + planned;
      ring.setAttribute('data-label', label);
    }

    var passPct = lastPassPct(snap);
    $('stat-needle').textContent = fmtPct(passPct);
    if ($('stat-needle-bar')) $('stat-needle-bar').style.width = Math.min(100, passPct || 0) + '%';
    $('stat-target-bar').textContent =
      'Target ' + ((rebuild.acceptance_bar_pct != null ? rebuild.acceptance_bar_pct : 80)) + '%';

    $('legacy-summary').textContent =
      'Live chat brain: ' +
      (legacy.live_brain || '—') +
      ' · ' +
      fmt(legacy.bytes) +
      ' B · installed ids ' +
      fmt(legacy.installed_ids);

    $('rebuild-summary').textContent = rebuild.checkpoint
      ? 'Rebuild checkpoint: ' + rebuild.checkpoint + ' · tier ' + (arch.tier || '?')
      : rebuild.error || 'No rebuild checkpoint exported yet.';
  }

  function renderCorpusBars(snap) {
    var corpus = snap.corpus || {};
    var counts = corpus.row_counts || {};
    var total =
      corpus.target_trainable_full_rebuild ||
      (counts.fact_pack || 0) + (counts.science_core || 0) + (counts.short || 0) ||
      corpus.total_rows ||
      1;
    var keys = ['fact_pack', 'science_core', 'short'];
    var labels = {
      fact_pack: 'Rebuild: fact packs (Q+A, incl. taught file)',
      science_core: 'Rebuild: science core (derived Q)',
      short: 'Rebuild: short lines (planned weight 0.25)'
    };
    var html = '';
    keys.forEach(function (k) {
      var v = counts[k] || 0;
      var w = (100 * v) / total;
      html +=
        '<div class="bar-row"><span title="' +
        (labels[k] || k) +
        '">' +
        (labels[k] || k) +
        '</span><div class="bar-track"><div class="bar-fill" style="width:' +
        w +
        '%"></div></div><span>' +
        v.toLocaleString() +
        '</span></div>';
    });
    if (corpus.lab_library) {
      html +=
        '<p class="note">Lab chip ' +
        corpus.lab_library.lab_deep_total.toLocaleString() +
        ' — chat library (built-in + Teaching).</p>';
    }
    if (corpus.trainer) {
      html +=
        '<p class="note">Trainer Q+A: ' +
        (corpus.trainer.pack_and_wiki_qa || 0).toLocaleString() +
        ' pack/wiki + ' +
        (corpus.trainer.taught_qa || 0).toLocaleString() +
        ' taught = ' +
        (corpus.trainer.all_question_answer_rows || 0).toLocaleString() +
        ' → ' +
        (
          corpus.trainer.fact_pack_trainable != null
            ? corpus.trainer.fact_pack_trainable
            : corpus.trainer.after_restricted_exclusion || 0
        ).toLocaleString() +
        ' in PyTorch trainer (incl. swear / weed / controlled-substance packs).</p>';
    }
    $('corpus-bars').innerHTML = html || '<p class="note">No corpus data</p>';

    var files = corpus.fact_files || [];
    var tbody = $('fact-files-body');
    if (tbody) {
      tbody.innerHTML = files
        .slice(0, 40)
        .map(function (f) {
          return '<tr><td>' + f.file + '</td><td>' + fmt(f.bytes) + ' B</td></tr>';
        })
        .join('');
    }
  }

  function tensorsForBlock(tensors, blockIndex) {
    var prefix = 'blocks.' + blockIndex + '.';
    return tensors.filter(function (t) {
      return t.key.indexOf(prefix) === 0;
    });
  }

  function preferredTensorKey(blockTensors) {
    var pick = null;
    blockTensors.forEach(function (t) {
      if (/attn\.in_proj_weight$/.test(t.key)) pick = t;
    });
    if (pick) return pick.key;
    blockTensors.forEach(function (t) {
      if (/_weight$/.test(t.key) && !pick) pick = t;
    });
    return pick ? pick.key : blockTensors.length ? blockTensors[0].key : null;
  }

  var TAB_HINTS = {
    overview: '① Layer stack — click Block 1–10; the preview panel updates below the two columns.',
    params: '② Layer list — spreadsheet of all weights. Rows with ◆ open a heatmap in tab ③.',
    weights: '③ Heatmap — enlarged color grid for the layer you last selected in ① or ②.',
    tokens: '④ Word pieces — Split text into tokens, click a chip, read the bar chart (embedding vector).'
  };

  function updateTabHint(name) {
    var el = $('deep-tab-hint');
    if (el) el.textContent = TAB_HINTS[name] || '';
  }

  function activateTab(name) {
    document.querySelectorAll('.card--deep-network .tab').forEach(function (t) {
      t.classList.toggle('active', t.dataset.view === name);
    });
    document.querySelectorAll('.card--deep-network .view-panel').forEach(function (p) {
      p.classList.toggle('active', p.dataset.view === name);
    });
    updateTabHint(name);
    if (name === 'tokens' && state.snapshot) {
      ensureTokenizer();
      loadEmbeddingsLazy(state.snapshot.rebuild && state.snapshot.rebuild.architecture);
    }
    if (name === 'weights') {
      if (state.selectedTensor) renderHeatmap(state.selectedTensor.key);
      else if (state.snapshot) initDefaultHeatmap((state.snapshot.rebuild && state.snapshot.rebuild.tensors) || [], null);
    }
  }

  function selectArchBlock(blockIndex, snap) {
    snap = snap || state.snapshot;
    if (!snap) return;
    state.selectedArchBlock = blockIndex;
    var stack = $('arch-stack');
    if (stack) {
      stack.querySelectorAll('.arch-layer').forEach(function (el, i) {
        el.classList.toggle('selected', i === blockIndex);
      });
    }
    var tensors = (snap.rebuild && snap.rebuild.tensors) || [];
    var blockTensors = tensorsForBlock(tensors, blockIndex);
    var detail = $('arch-block-detail');
    if (!detail) return;
    detail.classList.remove('hidden', 'arch-block-detail--empty');
    var arch = (snap.rebuild && snap.rebuild.architecture) || {};
    var key = preferredTensorKey(blockTensors);
    detail.innerHTML =
      '<h3>Block ' +
      (blockIndex + 1) +
      ' · attention + feed-forward</h3>' +
      '<p class="note">' +
      blockTensors.length +
      ' tensors in this block (MHA ' +
      (arch.n_heads || '?') +
      ' heads, d=' +
      (arch.d_model || '?') +
      ', FFN ' +
      (arch.d_ff || '?') +
      '). Pick a layer:</p>' +
      '<div class="arch-tensor-list" id="arch-tensor-list"></div>' +
      '<div class="arch-block-heat-wrap" id="arch-block-heat"></div>' +
      '<div class="arch-block-actions"><button type="button" id="arch-open-weights-tab">Open full heatmap tab</button></div>';
    var list = $('arch-tensor-list');
    if (list) {
      list.innerHTML = blockTensors
        .map(function (t) {
          return (
            '<button type="button" data-key="' +
            t.key +
            '"' +
            (t.key === key ? ' class="active"' : '') +
            '>' +
            t.key.replace('blocks.' + blockIndex + '.', '') +
            '</button>'
          );
        })
        .join('');
      list.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          list.querySelectorAll('button').forEach(function (b) {
            b.classList.remove('active');
          });
          btn.classList.add('active');
          var k = btn.dataset.key;
          state.selectedTensor = blockTensors.filter(function (t) {
            return t.key === k;
          })[0];
          renderHeatmap(k, $('arch-block-heat'));
        });
      });
    }
    var openBtn = $('arch-open-weights-tab');
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        activateTab('weights');
      });
    }
    if (key) {
      state.selectedTensor = blockTensors.filter(function (t) {
        return t.key === key;
      })[0];
      renderHeatmap(key, $('arch-block-heat'));
    } else if ($('arch-block-heat')) {
      $('arch-block-heat').innerHTML = '<p class="note">No exported heatmap for this block.</p>';
    }
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderArch(snap) {
    var arch = (snap.rebuild && snap.rebuild.architecture) || {};
    var stack = $('arch-stack');
    if (!stack) return;
    stack.innerHTML = '';
    var blocks = arch.n_layers || 0;
    for (var i = 0; i < blocks; i++) {
      var div = document.createElement('div');
      div.className = 'arch-layer';
      div.dataset.block = String(i);
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.innerHTML =
        '<strong>Block ' +
        (i + 1) +
        '</strong><div class="dim">MHA ' +
        arch.n_heads +
        ' heads · d=' +
        arch.d_model +
        ' · FFN ' +
        arch.d_ff +
        '</div>';
      div.addEventListener('click', function () {
        selectArchBlock(+this.dataset.block, snap);
      });
      div.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectArchBlock(+this.dataset.block, snap);
        }
      });
      stack.appendChild(div);
    }
    if (blocks > 0) {
      var initial = state.selectedArchBlock != null ? state.selectedArchBlock : 0;
      selectArchBlock(initial, snap);
    }
    var groups = arch.param_groups || [];
    var pg = $('param-groups');
    if (pg) {
      pg.innerHTML = groups
        .map(function (g) {
          return (
            '<div class="bar-row"><span>' +
            g.name +
            '</span><div class="bar-track"><div class="bar-fill" style="width:' +
            (100 * g.params) / (arch.params_estimate || 1) +
            '%"></div></div><span>' +
            fmt(g.params) +
            '</span></div>'
          );
        })
        .join('');
    }
  }

  function renderTensorTable(snap) {
    var tensors = (snap.rebuild && snap.rebuild.tensors) || [];
    var hmKeys = (snap.rebuild && snap.rebuild.heatmap_keys) || [];
    var hmSet = {};
    hmKeys.forEach(function (k) {
      hmSet[k] = true;
    });
    var tbody = $('tensor-body');
    if (!tbody) return;
    tbody.innerHTML = tensors
      .map(function (t, i) {
        var has = hmSet[t.key] ? ' class="has-heat"' : '';
        return (
          '<tr data-idx="' +
          i +
          '"' +
          has +
          '><td>' +
          (hmSet[t.key] ? '◆ ' : '') +
          t.key +
          '</td><td>' +
          t.shape.join('×') +
          '</td><td>' +
          fmt(t.count) +
          '</td><td>' +
          t.mean +
          '</td><td>' +
          t.std +
          '</td><td>' +
          t.abs_mean +
          '</td></tr>'
        );
      })
      .join('');
    tbody.querySelectorAll('tr').forEach(function (tr) {
      tr.addEventListener('click', function () {
        tbody.querySelectorAll('tr').forEach(function (r) {
          r.classList.remove('selected');
        });
        tr.classList.add('selected');
        var idx = +tr.dataset.idx;
        state.selectedTensor = tensors[idx];
        renderHeatmap(tensors[idx].key);
        activateTab('weights');
      });
    });
    if (tensors.length) initDefaultHeatmap(tensors, tbody);
  }

  async function initDefaultHeatmap(tensors, tbody) {
    var hm = await loadHeatmapsOnce();
    var pick = null;
    for (var i = 0; i < tensors.length; i++) {
      if (hm[tensors[i].key] && /_weight$/.test(tensors[i].key)) {
        pick = tensors[i];
        break;
      }
    }
    if (!pick) {
      for (var j = 0; j < tensors.length; j++) {
        if (hm[tensors[j].key]) {
          pick = tensors[j];
          break;
        }
      }
    }
    if (!pick) {
      var keys = Object.keys(hm || {});
      if (keys.length) {
        var k = keys[0];
        pick = tensors.filter(function (t) {
          return t.key === k;
        })[0] || { key: k };
      }
    }
    if (!pick) pick = tensors[0];
    state.selectedTensor = pick;
    if (tbody) {
      var idx = tensors.indexOf(pick);
      if (idx >= 0) {
        var row = tbody.querySelector('tr[data-idx="' + idx + '"]');
        if (row) row.classList.add('selected');
      }
    }
    await renderHeatmap(pick.key);
  }

  async function renderHeatmap(key, wrapEl) {
    var wrap = wrapEl || $('heat-wrap');
    if (!wrap) return;
    var hm = await loadHeatmapsOnce();
    var grid = hm[key];
    if (!grid) {
      wrap.innerHTML =
        '<p class="note">No heatmap for <code>' +
        key +
        '</code>. Choose a row marked with ◆ in All parameters, or run <code>npm run dashboard:export</code>.</p>';
      return;
    }
    var flat = [];
    var min = Infinity;
    var max = -Infinity;
    grid.forEach(function (row) {
      row.forEach(function (v) {
        flat.push(v);
        if (v < min) min = v;
        if (v > max) max = v;
      });
    });
    var cols = grid[0].length;
    var html = '<div class="heat" style="grid-template-columns:repeat(' + cols + ',8px)">';
    flat.forEach(function (v) {
      var t = max === min ? 0.5 : (v - min) / (max - min);
      var r = Math.floor(20 + t * 80);
      var b = Math.floor(120 + (1 - t) * 100);
      html += '<span style="background:rgb(' + r + ',40,' + b + ')"></span>';
    });
    html += '</div>';
    var shapeNote = grid.length <= 4 ? ' (vector strip, downsampled)' : ' (matrix, downsampled 64×64)';
    wrap.innerHTML = '<p class="note">' + key + shapeNote + '</p>' + html;
  }

  function renderTokenPreview(snap) {
    var prev = (snap.rebuild && snap.rebuild.token_preview) || [];
    var box = $('token-preview');
    if (!box) return;
    box.innerHTML = prev
      .map(function (t) {
        return (
          '<span class="chip" data-id="' +
          t.id +
          '">' +
          escapeHtml(t.text).slice(0, 24) +
          ' · ' +
          t.norm.toFixed(2) +
          '</span>'
        );
      })
      .join('');
    box.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        clearChipSelection(chip);
        chip.classList.add('on');
        var enc = $('encode-chips');
        if (enc) enc.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('on'); });
        showToken(+chip.dataset.id, snap);
      });
    });
  }

  async function ensureTokenizer() {
    if (state.tokenizerReady) return true;
    if (!window.MidelTokenizerV2) return false;
    try {
      if (typeof MIDEL_TOKENIZER_V2 !== 'undefined') {
        window.MidelTokenizerV2.loadFromObject(MIDEL_TOKENIZER_V2);
        state.tokenizerReady = true;
        return true;
      }
      var r = await fetch('versions/midel-tokenizer-v2.json?_=' + Date.now());
      if (r.ok) {
        window.MidelTokenizerV2.loadFromObject(await r.json());
        state.tokenizerReady = true;
        return true;
      }
    } catch (e) {
      console.warn('tokenizer load', e);
    }
    return false;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  async function showToken(id, snap) {
    snap = snap || state.snapshot;
    if (!snap) return;
    state.selectedTokenId = id;
    await ensureTokenizer();
    var norms = (snap.rebuild && snap.rebuild.token_norms) || [];
    var out = $('token-id-out');
    if (out) out.textContent = 'Token id ' + id + ' · L2 norm ' + (norms[id] != null ? norms[id].toFixed(4) : '—');
    var text = '';
    if (state.tokenizerReady) {
      try {
        text = window.MidelTokenizerV2.decode([id]);
      } catch (e) {
        text = '';
      }
    }
    var textOut = $('token-text-out');
    if (textOut) textOut.textContent = text ? 'Piece: “' + text + '”' : 'Piece: (tokenizer not loaded — re-export dashboard)';
    var canvas = $('token-emb-chart');
    if (!canvas) return;
    var arch = (snap.rebuild && snap.rebuild.architecture) || {};
    state.arch = arch;
    await loadEmbeddingsLazy(arch);
    var previews = (snap.rebuild && snap.rebuild.token_vector_preview) || {};
    var preview = previews[String(id)];
    if (state.embed && arch.d_model) {
      var d = arch.d_model;
      var off = id * d;
      if (off + d <= state.embed.length) {
        drawBars(canvas, state.embed.subarray(off, off + d), 'Embedding dims (d=' + d + ')');
        return;
      }
    }
    if (preview && preview.length) {
      drawBars(canvas, new Float32Array(preview), 'Embedding preview (' + preview.length + ' dims, export sample)');
      if (textOut) textOut.textContent += ' · Full vector loads over HTTP from embeddings file.';
      return;
    }
    drawBars(canvas, new Float32Array(0), '');
    if (textOut) {
      textOut.textContent +=
        (textOut.textContent ? ' ' : '') +
        'No embedding plot for this id — try a highlighted sample chip or serve the page over HTTP.';
    }
  }

  function drawBars(canvas, values, title) {
    var ctx = canvas.getContext('2d');
    var W = (canvas.width = canvas.clientWidth * devicePixelRatio);
    var H = (canvas.height = canvas.clientHeight * devicePixelRatio);
    ctx.clearRect(0, 0, W, H);
    if (!values || !values.length) {
      ctx.fillStyle = COLORS.muted;
      ctx.font = 13 * devicePixelRatio + 'px sans-serif';
      ctx.fillText('No embedding data for this token yet.', 12 * devicePixelRatio, H / 2);
      return;
    }
    ctx.fillStyle = '#8b95a8';
    ctx.font = 12 * devicePixelRatio + 'px sans-serif';
    ctx.fillText(title, 12 * devicePixelRatio, 18 * devicePixelRatio);
    var n = values.length;
    var step = W / n;
    var max = 0;
    for (var i = 0; i < n; i++) {
      var a = Math.abs(values[i]);
      if (a > max) max = a;
    }
    if (!max) max = 1;
    for (var j = 0; j < n; j++) {
      var h = (Math.abs(values[j]) / max) * (H - 40 * devicePixelRatio);
      ctx.fillStyle = values[j] >= 0 ? COLORS.accent : COLORS.accent2;
      ctx.fillRect(j * step, H - h - 8 * devicePixelRatio, Math.max(1, step - 1), h);
    }
  }

  function renderTrainingCharts() {
    var hist = mergedHistory();
    drawLineChart($('chart-loss'), hist, 'loss', COLORS.accent);
    drawLineChart($('chart-needle'), hist, 'pass_pct', COLORS.good, 80);
  }

  function drawLineChart(canvas, hist, key, color, targetLine) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = (canvas.width = canvas.clientWidth * devicePixelRatio);
    var H = (canvas.height = canvas.clientHeight * devicePixelRatio);
    ctx.clearRect(0, 0, W, H);
    var points = hist.filter(function (p) {
      return p[key] != null;
    });
    if (!points.length) {
      ctx.fillStyle = '#8b95a8';
      ctx.font = 14 * devicePixelRatio + 'px sans-serif';
      ctx.fillText('No ' + key + ' history yet — train or npm run dashboard:export', 16 * devicePixelRatio, H / 2);
      return;
    }
    var xs = points.map(function (p) {
      return p.epoch != null ? p.epoch : 0;
    });
    var ys = points.map(function (p) {
      return +p[key];
    });
    var minX = Math.min.apply(null, xs);
    var maxX = Math.max.apply(null, xs) || 1;
    var minY = Math.min.apply(null, ys);
    var maxY = Math.max.apply(null, ys);
    if (targetLine != null) {
      minY = Math.min(minY, targetLine);
      maxY = Math.max(maxY, targetLine);
    }
    if (maxY === minY) maxY = minY + 1;
    var pad = 24 * devicePixelRatio;
    ctx.strokeStyle = '#2a3140';
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, H - pad);
    ctx.lineTo(W - pad, H - pad);
    ctx.stroke();
    if (targetLine != null) {
      var ty = H - pad - ((targetLine - minY) / (maxY - minY)) * (H - 2 * pad);
      ctx.strokeStyle = 'rgba(248,113,113,0.6)';
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(pad, ty);
      ctx.lineTo(W - pad, ty);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 * devicePixelRatio;
    ctx.beginPath();
    points.forEach(function (p, i) {
      var x = pad + ((xs[i] - minX) / (maxX - minX || 1)) * (W - 2 * pad);
      var y = H - pad - ((ys[i] - minY) / (maxY - minY)) * (H - 2 * pad);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  function setupTabs() {
    document.querySelectorAll('.card--deep-network .tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab.dataset.view);
      });
    });
    updateTabHint('overview');
  }

  function decodePiece(id) {
    if (!state.tokenizerReady || !window.MidelTokenizerV2) return '';
    try {
      return window.MidelTokenizerV2.decode([id]) || '';
    } catch (e) {
      console.warn('decode token', id, e);
      return '';
    }
  }

  function clearChipSelection(exceptEl) {
    document.querySelectorAll('.token-chips .chip.on').forEach(function (x) {
      if (x !== exceptEl) x.classList.remove('on');
    });
  }

  function setupTokenEncode() {
    var btn = $('btn-encode');
    if (!btn || btn.dataset.encodeBound === '1') return;
    btn.dataset.encodeBound = '1';

    async function runEncode() {
      var runId = ++state.encodeRun;
      var q = ($('encode-input').value || '').trim();
      var out = $('encode-out');
      var chips = $('encode-chips');
      if (!q) {
        if (out) out.textContent = 'Type a question or phrase above, then Split into pieces.';
        if (chips) chips.innerHTML = '';
        return;
      }
      if (out) out.textContent = 'Splitting…';
      if (!(await ensureTokenizer())) {
        if (out) out.textContent = 'Tokenizer missing — run npm run dashboard:export and hard-refresh.';
        return;
      }
      if (runId !== state.encodeRun) return;

      var ids = window.MidelTokenizerV2.encode(q);
      if (runId !== state.encodeRun) return;

      if (out) {
        out.textContent =
          ids.length +
          ' piece' +
          (ids.length === 1 ? '' : 's') +
          ' for “' +
          q.slice(0, 60) +
          (q.length > 60 ? '…' : '') +
          '”: ' +
          ids.slice(0, 80).join(' ') +
          (ids.length > 80 ? ' …' : '');
      }
      if (!chips) return;

      var html = ids.slice(0, 40).map(function (id) {
        var piece = decodePiece(id);
        var label = piece ? piece : 'id ' + id;
        return (
          '<span class="chip" data-id="' +
          id +
          '" title="Token id ' +
          id +
          '">' +
          escapeHtml(label) +
          '</span>'
        );
      });
      chips.innerHTML = html.join('');
      if (runId !== state.encodeRun) return;

      clearChipSelection(null);
      var preview = $('token-preview');
      if (preview) preview.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('on'); });

      chips.querySelectorAll('.chip').forEach(function (c) {
        c.addEventListener('click', function () {
          clearChipSelection(c);
          c.classList.add('on');
          showToken(+c.dataset.id, state.snapshot);
        });
      });
      if (ids.length) {
        var first = chips.querySelector('.chip');
        if (first) first.classList.add('on');
        showToken(ids[0], state.snapshot);
      }
    }

    btn.addEventListener('click', function () {
      runEncode();
    });
    var input = $('encode-input');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          runEncode();
        }
      });
    }
  }

  function ensurePixelTooltip() {
    var tip = $('pixel-map-tooltip');
    if (tip) return tip;
    tip = document.createElement('div');
    tip.id = 'pixel-map-tooltip';
    tip.className = 'pixel-map-tooltip hidden';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    return tip;
  }

  function pixelCellCaption(ri, ci, v, opts) {
    opts = opts || {};
    var cols = opts.cols || 96;
    var rows = opts.rows || 54;
    var cellIdx = ri * cols + ci;
    var total = cols * rows || 1;
    var pct = Math.round((100 * v) / 255);
    if (opts.kind === 'tokens') {
      var vs = opts.vocabSize || 12288;
      var idStart = Math.floor((cellIdx * vs) / total);
      var idEnd = Math.max(idStart, Math.floor(((cellIdx + 1) * vs) / total) - 1);
      return {
        title: 'Lesson text · dot row ' + (ri + 1) + ', col ' + (ci + 1),
        body:
          'Covers word-piece ids ' +
          idStart.toLocaleString() +
          '–' +
          idEnd.toLocaleString() +
          ' (of ' +
          vs.toLocaleString() +
          '). Brightness ' +
          pct +
          '% = how often those pieces appear in the frozen lesson corpus.'
      };
    }
    var params = opts.totalParams || 22562304;
    var pStart = Math.floor((cellIdx * params) / total);
    var pEnd = Math.max(pStart, Math.floor(((cellIdx + 1) * params) / total) - 1);
    var slice = pEnd - pStart + 1;
    return {
      title: 'Trained weights · dot row ' + (ri + 1) + ', col ' + (ci + 1),
      body:
        'About ' +
        slice.toLocaleString() +
        ' numbers (slice ~' +
        pStart.toLocaleString() +
        '–' +
        pEnd.toLocaleString() +
        ' of ' +
        params.toLocaleString() +
        '). Brightness ' +
        pct +
        '% = typical |weight| in that slice.' +
        (opts.live ? ' Updates live while training.' : '')
    };
  }

  function bindPixelMapHover(container, opts) {
    if (!container) return;
    container._pixelOpts = opts;
    if (container.dataset.hoverBound === '1') return;
    container.dataset.hoverBound = '1';
    var tip = ensurePixelTooltip();
    container.addEventListener('mousemove', function (e) {
      var dot = e.target.closest('span');
      var o = container._pixelOpts || {};
      if (!dot || dot.parentElement !== container) {
        tip.classList.add('hidden');
        return;
      }
      var ri = +dot.dataset.ri;
      var ci = +dot.dataset.ci;
      var v = +dot.dataset.v || 0;
      var cap = pixelCellCaption(ri, ci, v, o);
      tip.innerHTML = '<strong>' + cap.title + '</strong>' + cap.body;
      tip.classList.remove('hidden');
      var pad = 16;
      var x = e.clientX + pad;
      var y = e.clientY + pad;
      var rect = tip.getBoundingClientRect();
      if (x + rect.width > window.innerWidth - 8) x = e.clientX - rect.width - pad;
      if (y + rect.height > window.innerHeight - 8) y = e.clientY - rect.height - pad;
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
    });
    container.addEventListener('mouseleave', function () {
      tip.classList.add('hidden');
    });
  }

  function renderPixelGrid(container, grid, minBright, opts) {
    opts = opts || {};
    if (!container || !grid || !grid.length) {
      if (container) container.innerHTML = '<p class="note">No grid data — run npm run dashboard:export</p>';
      return null;
    }
    var cols = grid[0].length;
    var rows = grid.length;
    opts.cols = cols;
    opts.rows = rows;
    container.style.gridTemplateColumns = 'repeat(' + cols + ', minmax(0, 1fr))';
    var frag = document.createDocumentFragment();
    var idx = 0;
    var dots = [];
    grid.forEach(function (row, ri) {
      row.forEach(function (v, ci) {
        var dot = document.createElement('span');
        var t = v / 255;
        var op = 0.06 + t * 0.9;
        dot.style.setProperty('--dot-o', String(op));
        dot.style.setProperty('--i', String(idx++));
        if (v >= (minBright || 8)) dot.classList.add('on');
        dot.dataset.ri = String(ri);
        dot.dataset.ci = String(ci);
        dot.dataset.v = String(v);
        frag.appendChild(dot);
        dots.push(dot);
      });
    });
    container.innerHTML = '';
    container.appendChild(frag);
    if (opts.live) container.classList.add('pixel-map--live');
    else container.classList.remove('pixel-map--live');
    bindPixelMapHover(container, opts);
    return dots;
  }

  function gridCellCount(grid) {
    if (!grid || !grid.length) return 0;
    return grid.length * grid[0].length;
  }

  function applyLiveWeightGrid() {
    var live = state.live;
    var wg = live && live.weight_grid && live.weight_grid.grid;
    if (!wg) return;
    if (!state.weightDots || state.weightDots.length !== gridCellCount(wg)) {
      var wt = state.snapshot && state.snapshot.rebuild && state.snapshot.rebuild.pixel_maps;
      wt = wt && wt.checkpoint_weights;
      state.weightDots = renderPixelGrid($('pixel-weights'), wg, 6, {
        live: true,
        kind: 'weights',
        totalParams: (wt && wt.total_params) || undefined
      });
      return;
    }
    var wContainer = $('pixel-weights');
    if (wContainer && wContainer._pixelOpts) wContainer._pixelOpts.live = true;
    var flat = [];
    wg.forEach(function (row) {
      row.forEach(function (v) {
        flat.push(v);
      });
    });
    flat.forEach(function (v, i) {
      var dot = state.weightDots[i];
      if (!dot) return;
      var prev = +dot.dataset.v || 0;
      var t = v / 255;
      dot.style.setProperty('--dot-o', String(0.06 + t * 0.9));
      if (v >= 6) dot.classList.add('on');
      else dot.classList.remove('on');
      if (Math.abs(v - prev) > 8) dot.classList.add('bump');
      dot.dataset.v = String(v);
    });
    var stats = $('pixel-weights-stats');
    if (stats && live.weight_grid.active_cells_pct != null) {
      stats.textContent =
        'Live snapshot · ' +
        live.weight_grid.active_cells_pct +
        '% of cells above noise floor · updates while trainer runs (restart trainer if stuck on idle).';
    }
  }

  function mergeInsights(snap) {
    var base = snap.dashboard_insights ? JSON.parse(JSON.stringify(snap.dashboard_insights)) : null;
    if (!base) return null;
    var live = state.live || {};
    var rebuild = snap.rebuild || {};
    var planned = live.epochs_planned || (rebuild.meta && rebuild.meta.epochs) || 40;
    var done = live.epoch_done != null ? live.epoch_done : (rebuild.meta && rebuild.meta.epoch_done) || 0;
    if (live.status === 'training' && live.epoch_in_progress) {
      done = Math.max(done, live.epoch_in_progress - 1);
    }
    base.epoch_progress_pct = Math.round((100 * done) / Math.max(1, planned));
    if (live.pass_pct != null) base.needle_pass_pct = live.pass_pct;
    if (base.meters && base.meters.training_epochs) base.meters.training_epochs.pct = base.epoch_progress_pct;
    if (base.meters && base.meters.needle_recall && base.needle_pass_pct != null) {
      base.meters.needle_recall.pct = base.needle_pass_pct;
    }
    return base;
  }

  function renderInsights(snap) {
    var ins = mergeInsights(snap);
    if (!ins) return;
    if ($('insights-lede')) $('insights-lede').textContent = ins.lede || '';
    if ($('strength-value')) $('strength-value').textContent = ins.strength_score != null ? ins.strength_score + '/100' : '—';
    if ($('strength-label')) $('strength-label').textContent = ins.strength_label || '';
    var meters = $('insights-meters');
    if (meters && ins.meters) {
      meters.innerHTML = Object.keys(ins.meters)
        .map(function (key) {
          var m = ins.meters[key];
          var pct = m.pct != null ? Math.min(100, m.pct) : 0;
          return (
            '<div class="meter-row"><label><span>' +
            m.label +
            '</span><span class="val">' +
            (m.pct != null ? pct.toFixed(1) + '%' : '—') +
            '</span></label><div class="bar-track"><div class="bar-fill" style="width:' +
            pct +
            '%"></div></div></div>'
          );
        })
        .join('');
    }
    var left = $('insights-left');
    if (left) {
      left.innerHTML = (ins.left_to_learn || []).map(function (t) {
        return '<li>' + t + '</li>';
      }).join('') || '<li>Nothing flagged — keep training and re-export the snapshot.</li>';
    }
    var weakWrap = $('insights-weak-wrap');
    var weak = $('insights-weak');
    var w = ins.weak_points || [];
    if (weakWrap && weak) {
      if (w.length) {
        weakWrap.classList.remove('hidden');
        weak.innerHTML = w.map(function (t) {
          return '<li>' + t + '</li>';
        }).join('');
      } else {
        weakWrap.classList.add('hidden');
      }
    }
  }

  function renderPixelMaps(snap) {
    var maps = (snap.rebuild && snap.rebuild.pixel_maps) || snap.pixel_maps;
    if (!maps) {
      renderPixelGrid($('pixel-corpus'), null);
      renderPixelGrid($('pixel-weights'), null);
      return;
    }
    var tok = maps.corpus_tokens || {};
    var wt = maps.checkpoint_weights || {};
    state.corpusGrid = tok.grid;
    var liveGrid = state.live && state.live.weight_grid && state.live.weight_grid.grid;
    state.weightDots = renderPixelGrid($('pixel-weights'), liveGrid || wt.grid, 6, {
      kind: 'weights',
      totalParams: wt.total_params,
      live: !!liveGrid
    });
    renderPixelGrid($('pixel-corpus'), tok.grid, 10, {
      kind: 'tokens',
      vocabSize: tok.vocab_size
    });
    if ($('pixel-corpus-stats')) {
      $('pixel-corpus-stats').textContent =
        (tok.unique_token_ids || 0).toLocaleString() +
        ' of ' +
        (tok.vocab_size || 0).toLocaleString() +
        ' word-piece slots appear in lessons · ' +
        (tok.token_occurrences || 0).toLocaleString() +
        ' total pieces across ' +
        (tok.corpus_rows_encoded || 0).toLocaleString() +
        ' rows';
    }
    if ($('pixel-weights-stats') && !liveGrid) {
      $('pixel-weights-stats').textContent =
        fmt(wt.total_params) +
        ' numbers in the checkpoint · ' +
        (wt.active_cells_pct != null ? wt.active_cells_pct + '% of map cells lit' : '') +
        ' · export time snapshot';
    }
    renderInsights(snap);
  }

  function renderTargetState(snap) {
    var c = snap.corpus || {};
    var arch = (snap.rebuild && snap.rebuild.architecture) || {};
    var lab = c.lab_library || {};
    var sm = c.small_network || {};
    var el = $('target-copy');
    if (!el) return;
    el.innerHTML =
      '<p><strong>Lab (chat):</strong> ' +
      fmt(lab.lab_deep_total) +
      ' deep + ' +
      fmt(sm.lesson_total) +
      ' small-network lines.</p>' +
      '<p><strong>Rebuild target:</strong> ~' +
      fmt(c.target_trainable_full_rebuild) +
      ' rows with full corpus (incl. short at lower weight).</p>' +
      '<p>Architecture: tier <strong>' +
      (arch.tier || 'L') +
      '</strong>, ~' +
      fmt(arch.params_estimate) +
      ' params.</p>';
  }

  function renderAll(snap) {
    safeRun('overview', function () { renderOverview(snap); });
    safeRun('corpus', function () { renderCorpusBars(snap); });
    safeRun('arch', function () { renderArch(snap); });
    safeRun('tensors', function () { renderTensorTable(snap); });
    safeRun('tokens', function () { renderTokenPreview(snap); });
    safeRun('target', function () { renderTargetState(snap); });
    safeRun('pixels', function () { renderPixelMaps(snap); });
    safeRun('insights', function () { renderInsights(snap); });
    safeRun('charts', renderTrainingCharts);
  }

  async function boot() {
    setupTabs();
    $('boot-err').textContent = '';
    try {
      state.snapshot = await loadSnapshot();
    } catch (e) {
      $('boot-err').textContent = e.message;
      return;
    }
    renderAll(state.snapshot);
    $('updated-at').textContent =
      'Snapshot ' + (state.snapshot.generatedAt || '').replace('T', ' ').slice(0, 19);

    setupTokenEncode();
    ensureTokenizer();
    loadEmbeddingsLazy(state.snapshot.rebuild && state.snapshot.rebuild.architecture);
    pollLive();
    schedulePoll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
