import { extraQuestions } from "./question-variants.js";

const phaseTargets = { "Warm-up": 2, "Guided": 3, "Independent": 5 };
const phases = Object.keys(phaseTargets);

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

function normaliseItem(question) {
  const options = question.options.map((text, index) => ({ optionId:`${question.id}-O${index + 1}`, text }));
  return {
    ...question,
    itemId:question.id,
    itemVersion:"1.2.0",
    skillId:question.id.split("-")[0],
    options,
    correctOptionId:options[question.answer]?.optionId
  };
}

function shuffleOptions(question, rng) {
  return { ...question, options:shuffle(question.options, rng) };
}

function attachAuthoredContext(items) {
  const allPassages = items.map(item => item.passage).filter(Boolean);
  let currentPhase = "";
  let phasePassage = "";
  return items.map(item => {
    if (item.phase !== currentPhase) { currentPhase=item.phase; phasePassage=""; }
    if (item.passage) phasePassage=item.passage;
    if (item.passage || item.id.includes("-V")) return item;
    if (/both (reading )?passages|both texts/i.test(item.prompt) && allPassages.length > 1) {
      return { ...item, passage:allPassages.map((passage,index) => `Text ${index + 1}\n${passage}`).join("\n\n") };
    }
    return phasePassage ? { ...item, passage:phasePassage } : item;
  });
}

export function validateCatalog(sessions) {
  const errors = [];
  const itemIds = new Set();
  for (const session of sessions) {
    const candidates = [...session.questions, ...(extraQuestions[session.id] || [])];
    for (const raw of candidates) {
      const item = normaliseItem(raw);
      if (itemIds.has(item.itemId)) errors.push(`Duplicate item ID: ${item.itemId}`);
      itemIds.add(item.itemId);
      if (!item.prompt?.trim()) errors.push(`${item.itemId}: blank prompt`);
      if (!phases.includes(item.phase)) errors.push(`${item.itemId}: unsupported phase`);
      if (item.options.length < 2) errors.push(`${item.itemId}: fewer than two choices`);
      if (!item.correctOptionId || !item.options.some(option => option.optionId === item.correctOptionId)) errors.push(`${item.itemId}: approved answer is missing`);
      if (new Set(item.options.map(option => option.optionId)).size !== item.options.length) errors.push(`${item.itemId}: duplicate option ID`);
      if (new Set(item.options.map(option => option.text.trim())).size !== item.options.length) errors.push(`${item.itemId}: duplicate option text`);
      for (let seed = 1; seed <= 20; seed += 1) {
        const varied = shuffleOptions(item, makeRng(seed));
        if (varied.options.filter(option => option.optionId === varied.correctOptionId).length !== 1) errors.push(`${item.itemId}: answer mapping failed for seed ${seed}`);
      }
    }
    for (const [phase, count] of Object.entries(phaseTargets)) {
      if (session.questions.filter(item => item.phase === phase).length < count) errors.push(`${session.id}: insufficient ${phase} items`);
    }
  }
  return { valid:errors.length === 0, errors, itemCount:itemIds.size };
}

// Version 1.2 keeps the authored base sequence intact because some questions are
// linked to the passage directly before them. Only explicitly standalone variants
// replace standalone positions; answer choices may always be safely shuffled.
export function prepareSession(sourceSession, attempts, requestedSeed) {
  const seed = requestedSeed ?? freshSeed();
  const rng = makeRng(seed);
  const latest = [...attempts].reverse().find(attempt => attempt.sessionId === sourceSession.id && attempt.completionState === "completed");
  const recentlyUsed = new Set((latest?.responses || []).map(response => response.questionId));
  const baseByPhase = Object.fromEntries(phases.map(phase => [phase, sourceSession.questions.filter(item => item.phase === phase).slice(0, phaseTargets[phase])]));
  const extras = extraQuestions[sourceSession.id] || [];

  for (const phase of ["Warm-up", "Independent"]) {
    const alternatives = extras.filter(item => item.phase === phase && !recentlyUsed.has(item.id));
    if (alternatives.length && rng() >= 0.35) {
      const replacement = alternatives[Math.floor(rng() * alternatives.length)];
      const replaceIndex = phase === "Warm-up" ? Math.floor(rng() * baseByPhase[phase].length) : baseByPhase[phase].length - 1;
      baseByPhase[phase][replaceIndex] = replacement;
    }
  }

  const selected = attachAuthoredContext(phases.flatMap(phase => baseByPhase[phase]));
  return {
    session:{ ...sourceSession, questions:selected.map(item => shuffleOptions(normaliseItem(item), rng)) },
    seed,
    itemSetVersion:"1.2.0"
  };
}

export function getCatalogQuestion(sessions, id) {
  for (const session of sessions) {
    const question = [...session.questions, ...(extraQuestions[session.id] || [])].find(item => item.id === id);
    if (question) return normaliseItem(question);
  }
  return null;
}
