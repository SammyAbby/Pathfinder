import { extraQuestions } from "./question-variants.js";

const phaseTargets = { "Warm-up": 2, "Guided": 3, "Independent": 5 };

function makeRng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(values, rng) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function freshSeed() {
  if (globalThis.crypto?.getRandomValues) {
    const value = new Uint32Array(1);
    globalThis.crypto.getRandomValues(value);
    return value[0];
  }
  return (Date.now() ^ Math.floor(Math.random() * 0xFFFFFFFF)) >>> 0;
}

function shuffleOptions(question, rng) {
  const indexed = question.options.map((text, originalIndex) => ({ text, originalIndex }));
  const shuffled = shuffle(indexed, rng);
  return {
    ...question,
    options: shuffled.map(item => item.text),
    answer: shuffled.findIndex(item => item.originalIndex === question.answer)
  };
}

export function prepareSession(sourceSession, attempts) {
  const seed = freshSeed();
  const rng = makeRng(seed);
  const latest = [...attempts].reverse().find(attempt => attempt.sessionId === sourceSession.id);
  const recentlyUsed = new Set((latest?.responses || []).map(response => response.questionId));
  const candidates = [...sourceSession.questions, ...(extraQuestions[sourceSession.id] || [])];
  const selected = [];

  for (const [phase, count] of Object.entries(phaseTargets)) {
    const phaseItems = candidates.filter(item => item.phase === phase);
    const unseen = shuffle(phaseItems.filter(item => !recentlyUsed.has(item.id)), rng);
    const seen = shuffle(phaseItems.filter(item => recentlyUsed.has(item.id)), rng);
    selected.push(...[...unseen, ...seen].slice(0, count));
  }

  return {
    session: { ...sourceSession, questions: selected.map(item => shuffleOptions(item, rng)) },
    seed,
    itemSetVersion: "1.1.1"
  };
}

export function getCatalogQuestion(sessions, id) {
  for (const session of sessions) {
    const question = [...session.questions, ...(extraQuestions[session.id] || [])].find(item => item.id === id);
    if (question) return question;
  }
  return null;
}
