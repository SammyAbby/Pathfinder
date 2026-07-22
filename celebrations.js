// celebrations.js — playful, accessible feedback for Pathfinder.
// Everything here is gated behind prefers-reduced-motion and a user sound toggle,
// so the calm experience stays fully intact for anyone who wants it.

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CONFETTI_EMOJI = ["🎉", "⭐", "🌈", "✨", "🎊", "💫", "🏆", "🎈", "🌟"];
const CONFETTI_COLORS = ["#e7b84b", "#176b68", "#f2643f", "#4b9cd3", "#e85d9c", "#6bbf59"];

let layer = null;
function confettiLayer() {
  if (layer && layer.isConnected) return layer;
  layer = document.createElement("div");
  layer.className = "confetti-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);
  return layer;
}

const rand = (min, max) => min + Math.random() * (max - min);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// A tiny requestAnimationFrame particle burst — launches pieces outward,
// then lets gravity carry them down as they fade.
export function confettiBurst({ x = innerWidth / 2, y = innerHeight / 2, count = 28, power = 1 } = {}) {
  if (reduceMotion()) return;
  const host = confettiLayer();
  const pieces = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    if (Math.random() < 0.55) {
      el.textContent = pick(CONFETTI_EMOJI);
      el.classList.add("is-emoji");
      el.style.fontSize = `${rand(14, 26)}px`;
    } else {
      el.style.background = pick(CONFETTI_COLORS);
      el.style.width = `${rand(7, 12)}px`;
      el.style.height = `${rand(9, 16)}px`;
      if (Math.random() < 0.4) el.style.borderRadius = "50%";
    }
    host.appendChild(el);
    const angle = rand(-Math.PI, 0); // upward hemisphere
    const speed = rand(6, 13) * power;
    pieces.push({
      el, x, y,
      vx: Math.cos(angle) * speed + rand(-1.5, 1.5),
      vy: Math.sin(angle) * speed - rand(2, 5),
      rot: rand(0, 360), vr: rand(-14, 14),
      life: 0, ttl: rand(70, 120),
    });
  }
  const step = () => {
    let alive = false;
    for (const p of pieces) {
      if (p.life > p.ttl) { if (p.el.isConnected) p.el.remove(); continue; }
      alive = true;
      p.life++;
      p.vy += 0.32;         // gravity
      p.vx *= 0.99;         // drag
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      const start = p.ttl * 0.65;
      const fade = p.life > start ? Math.max(0, 1 - (p.life - start) / (p.ttl - start)) : 1;
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
      p.el.style.opacity = fade;
    }
    if (alive) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Burst centred on a specific element (e.g. the feedback banner).
export function burstAt(el, opts = {}) {
  if (!el || reduceMotion()) return;
  const r = el.getBoundingClientRect();
  confettiBurst({ x: r.left + r.width / 2, y: r.top + r.height / 2, ...opts });
}

// A big, multi-point celebration for finishing a session well.
export function celebrate() {
  if (reduceMotion()) return;
  const shots = [
    { x: innerWidth * 0.5, y: innerHeight * 0.35, count: 40, power: 1.2 },
    { x: innerWidth * 0.15, y: innerHeight * 0.5, count: 24, power: 1 },
    { x: innerWidth * 0.85, y: innerHeight * 0.5, count: 24, power: 1 },
  ];
  shots.forEach((s, i) => setTimeout(() => confettiBurst(s), i * 220));
  chime("win");
}

/* ---------------------------------------------------------------------------
   Sound — short, soft Web Audio chimes. Off is remembered per-browser, and
   they never play under reduced-motion (a calm default for that preference).
--------------------------------------------------------------------------- */
let soundOn = localStorage.getItem("pf-sound") !== "off";
let audioCtx = null;
const ctx = () => (audioCtx ??= new (window.AudioContext || window.webkitAudioContext)());

export const isSoundOn = () => soundOn;
export function toggleSound() {
  soundOn = !soundOn;
  localStorage.setItem("pf-sound", soundOn ? "on" : "off");
  if (soundOn) chime("select");
  return soundOn;
}

function note(freq, start, dur, gain = 0.08, type = "sine") {
  const c = ctx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type; o.frequency.value = freq;
  o.connect(g); g.connect(c.destination);
  const t = c.currentTime + start;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t); o.stop(t + dur + 0.03);
}

export function chime(kind) {
  if (reduceMotion() || !soundOn) return;
  try {
    if (kind === "select") note(660, 0, 0.12, 0.045, "triangle");
    else if (kind === "correct") [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.08, 0.26, 0.07, "triangle"));
    else if (kind === "wrong") { note(392, 0, 0.18, 0.05); note(311, 0.11, 0.24, 0.05); }
    else if (kind === "win") {
      [523, 659, 784, 1047, 1319].forEach((f, i) => note(f, i * 0.11, 0.4, 0.08, "triangle"));
      note(1568, 0.62, 0.6, 0.06, "triangle");
    }
  } catch { /* audio not available — no problem */ }
}

/* ---------------------------------------------------------------------------
   Ambient floating shapes drifting gently behind the page.
--------------------------------------------------------------------------- */
export function initAmbient() {
  if (document.querySelector(".floaties")) return;
  const wrap = document.createElement("div");
  wrap.className = "floaties";
  wrap.setAttribute("aria-hidden", "true");
  const shapes = ["✨", "⭐", "🌈", "☁️", "🎈", "🪁", "🌟", "🍃"];
  for (let i = 0; i < 9; i++) {
    const s = document.createElement("span");
    s.className = "floatie";
    s.textContent = shapes[i % shapes.length];
    s.style.left = `${rand(3, 92)}%`;
    s.style.fontSize = `${rand(20, 46)}px`;
    s.style.animationDuration = `${rand(14, 26)}s`;
    s.style.animationDelay = `${-rand(0, 20)}s`;
    s.style.setProperty("--drift", `${rand(-40, 40)}px`);
    wrap.appendChild(s);
  }
  document.body.appendChild(wrap);
}
