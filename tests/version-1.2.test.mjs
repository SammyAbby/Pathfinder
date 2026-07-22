import assert from "node:assert/strict";
import { sessions } from "../sessions.js";
import { prepareSession, validateCatalog } from "../question-engine.js";
import { recommendSession, validateSkillGraph } from "../learning-path.js";

const catalog = validateCatalog(sessions);
assert.equal(catalog.valid, true, catalog.errors.join("\n"));
assert.equal(catalog.itemCount, 208);
assert.equal(validateSkillGraph(sessions).valid, true);

for (const session of sessions) {
  for (let seed = 1; seed <= 100; seed += 1) {
    const prepared = prepareSession(session, [], seed);
    assert.equal(prepared.session.questions.length, 10, `${session.id} item count`);
    assert.deepEqual(prepared.session.questions.map(item => item.phase), ["Warm-up","Warm-up","Guided","Guided","Guided","Independent","Independent","Independent","Independent","Independent"]);
    for (const item of prepared.session.questions) {
      assert.equal(item.options.filter(option => option.optionId === item.correctOptionId).length, 1, `${item.itemId} correct option`);
    }
    const authoredGuided = session.questions.filter(item => item.phase === "Guided").slice(0,3).map(item => item.id);
    assert.deepEqual(prepared.session.questions.filter(item => item.phase === "Guided").map(item => item.itemId), authoredGuided, `${session.id} linked guided order`);
  }
}

const r1 = sessions.find(session => session.id === "R1");
const preparedR1 = prepareSession(r1, [], 12).session.questions;
assert.match(preparedR1.find(item => item.itemId === "R1-4").passage, /local library/i);

const first = recommendSession(sessions, []);
assert.equal(first.session.id, "R1");
assert.equal(first.reason, "Ready to explore");

const revisitHistory = [{ sessionId:"R1", completionState:"completed", completedAt:"2026-07-20T00:00:00.000Z", status:"Revisit", responses:[] }];
assert.equal(recommendSession(sessions, revisitHistory).session.id, "R1");
assert.equal(recommendSession(sessions, revisitHistory).reason, "Revisit after difficulty");

const secureHistory = [{ sessionId:"R1", completionState:"completed", completedAt:"2026-07-22T00:00:00.000Z", status:"Secure today", responses:[] }];
assert.equal(recommendSession(sessions, secureHistory, new Date("2026-07-22T01:00:00.000Z")).session.id, "M1");

console.log(`Version 1.2 checks passed: ${sessions.length} sessions, ${catalog.itemCount} items, 100 shuffle seeds each.`);
