/*
 * Copyright (c) 2026 M.Milde <m.milde@gmail.com>
 * Free use; no sale, rebrand, or profit from this software.
 * See LICENSE.
 */

/**
 * Compact organic particle-ring loader (~30px, transparent).
 * Rotating ring + outward sparks for chat pending state in neural_lab.html.
 */
(function (root) {
  function mulberry32(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var DISPLAY = 30;

  /**
   * @param {HTMLElement} host
   * @returns {{ stop: function }}
   */
  function createMiniNeuralThink(host) {
    const reduce =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    const W = DISPLAY;
    const H = DISPLAY;
    const CX = W * 0.5;
    const CY = H * 0.5;
    const BASE_R = 10.2;

    host.style.display = 'inline-flex';
    host.style.width = W + 'px';
    host.style.height = H + 'px';
    host.style.minHeight = '0';
    host.style.padding = '0';
    host.style.overflow = 'visible';

    const canvas = document.createElement('canvas');
    canvas.className = 'think-network-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    const dpr = Math.min(3, typeof devicePixelRatio === 'number' ? devicePixelRatio : 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return { stop: function () {} };
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rnd = mulberry32(0x9c41);
    const RING_N = 52;
    const ring = [];
    for (let i = 0; i < RING_N; i++) {
      ring.push({
        phase: rnd() * Math.PI * 2,
        rOff: (rnd() - 0.5) * 1.4,
        size: 0.35 + rnd() * 0.55,
        bright: 0.4 + rnd() * 0.6,
        hue: 188 + rnd() * 48
      });
    }

    const spits = [];
    let ringAngle = rnd() * Math.PI * 2;
    let raf = 0;
    let live = true;
    let t0 = 0;
    let lastT = 0;

    function ringPoint(angle, t, rOff) {
      const wobble =
        Math.sin(angle * 3.2 + t * 2.4) * 0.65 +
        Math.sin(angle * 6.2 - t * 1.35) * 0.35 +
        (rOff || 0);
      const r = BASE_R + wobble;
      return {
        x: CX + Math.cos(angle) * r,
        y: CY + Math.sin(angle) * r,
        r: r
      };
    }

    function emitSpit(t) {
      const hot = ringAngle + 0.72;
      const a = hot + (rnd() - 0.5) * (rnd() < 0.5 ? 0.35 : 1.05);
      const p = ringPoint(a, t, (rnd() - 0.5) * 0.9);
      const spread = (rnd() - 0.5) * 0.75;
      const dir = a + spread;
      const speed = 0.62 + rnd() * 1.15;
      spits.push({
        x: p.x,
        y: p.y,
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed,
        life: 0.95 + rnd() * 0.12,
        size: 0.48 + rnd() * 1.05,
        hue: 195 + rnd() * 42
      });
    }

    function clearFrame() {
      ctx.clearRect(0, 0, W, H);
    }

    function drawGlowDot(x, y, radius, alpha, hue, light) {
      if (alpha < 0.03 || radius < 0.08) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, 'hsla(' + hue + ',92%,' + light + '%,' + Math.min(1, alpha * 1.15).toFixed(3) + ')');
      g.addColorStop(0.4, 'hsla(' + hue + ',78%,' + (light - 6) + '%,' + (alpha * 0.35).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawFrame(t, dt) {
      ringAngle += dt * (3.35 + Math.sin(t * 2.4) * 0.28);

      const emitChance = 0.52 + Math.sin(t * 4.2) * 0.18;
      if (spits.length < 22 && Math.random() < emitChance) emitSpit(t);
      if (Math.random() < 0.22) emitSpit(t);

      for (let i = spits.length - 1; i >= 0; i--) {
        const s = spits[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 1.018;
        s.vy *= 1.018;
        s.life -= 0.018 + Math.hypot(s.vx, s.vy) * 0.005;
        s.size *= 0.984;
        const dist = Math.hypot(s.x - CX, s.y - CY);
        if (dist > BASE_R * 1.85) s.life -= 0.055;
        if (s.life <= 0 || s.size < 0.08) spits.splice(i, 1);
      }

      clearFrame();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < spits.length; i++) {
        const s = spits[i];
        const dist = Math.hypot(s.x - CX, s.y - CY);
        const edgeFade = Math.max(0, 1 - (dist - BASE_R * 0.45) / (BASE_R * 1.25));
        const a = s.life * Math.min(1, edgeFade * 1.15);
        drawGlowDot(s.x, s.y, s.size * 3.1, a * 1.05, s.hue, 86);
        drawGlowDot(s.x, s.y, s.size * 0.95, a, s.hue, 98);
      }

      for (let i = 0; i < RING_N; i++) {
        const dot = ring[i];
        const angle =
          (i / RING_N) * Math.PI * 2 +
          ringAngle +
          Math.sin(t * 2.8 + dot.phase) * 0.06;
        const p = ringPoint(angle, t, dot.rOff);
        const hot = Math.cos(angle - ringAngle - 0.72);
        const cluster = hot > 0 ? Math.pow(hot, 2.4) : 0;
        const alpha = dot.bright * (0.38 + cluster * 0.62);
        const size = dot.size * (0.8 + cluster * 0.55);
        const light = 70 + cluster * 24;
        drawGlowDot(p.x, p.y, size * 2.1, alpha * 0.5, dot.hue, light);
        drawGlowDot(p.x, p.y, size * 0.65, alpha, dot.hue, light + 14);
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    function staticFrame() {
      clearFrame();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < RING_N; i++) {
        const dot = ring[i];
        const angle = (i / RING_N) * Math.PI * 2;
        const p = ringPoint(angle, 0, dot.rOff);
        drawGlowDot(p.x, p.y, dot.size * 1.5, dot.bright * 0.55, dot.hue, 74);
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function frame(now) {
      if (!live) return;
      if (!t0) t0 = now;
      const t = (now - t0) * 0.001;
      const dt = lastT ? Math.min(0.05, t - lastT) : 0.016;
      lastT = t;
      drawFrame(t, dt);
      raf = requestAnimationFrame(frame);
    }

    if (reduce) {
      staticFrame();
    } else {
      requestAnimationFrame(function () {
        if (!live) return;
        drawFrame(0, 0.016);
        raf = requestAnimationFrame(frame);
      });
    }

    return {
      stop: function () {
        live = false;
        if (raf) cancelAnimationFrame(raf);
      }
    };
  }

  root.createMiniNeuralThink = createMiniNeuralThink;
})(typeof globalThis !== 'undefined' ? globalThis : this);
