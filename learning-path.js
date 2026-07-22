export const skillGraph = {
  R1:{ year:7, prerequisites:[], supports:["R2","R3","R4","R6"] },
  M1:{ year:8, prerequisites:[], supports:["M2","M4"] },
  W1:{ year:7, prerequisites:[], supports:["W2","W3","W4","W5"] },
  R2:{ year:7, prerequisites:["R1"], supports:["R3","R4","R6","W4"] },
  M2:{ year:7, prerequisites:["M1"], supports:["M4"] },
  W2:{ year:7, prerequisites:["W1"], supports:["W4"] },
  R3:{ year:7, prerequisites:["R1","R2"], supports:["R4","R6"] },
  M3:{ year:7, prerequisites:[], supports:[] },
  W3:{ year:7, prerequisites:["W1"], supports:["W4","W5"] },
  R4:{ year:8, prerequisites:["R2","R3"], supports:["R6","W4"] },
  R5:{ year:8, prerequisites:[], supports:["R1","R2","R3","R4","R6"] },
  R6:{ year:8, prerequisites:["R2","R3","R4"], supports:[] },
  W4:{ year:8, prerequisites:["W1","W2","R2"], supports:[] },
  W5:{ year:8, prerequisites:["W1","W3"], supports:[] },
  M4:{ year:8, prerequisites:["M1","M2"], supports:[] },
  M5:{ year:8, prerequisites:[], supports:[] }
};

const completed = attempts => attempts.filter(attempt => (attempt.completionState || (attempt.completedAt ? "completed" : "in_progress")) === "completed" && !attempt.invalidated);
const latestFor = (attempts, id) => completed(attempts).filter(attempt => attempt.sessionId === id).sort((a,b) => b.completedAt.localeCompare(a.completedAt))[0];
const ready = attempt => attempt && attempt.status !== "Revisit";

export function validateSkillGraph(sessions) {
  const ids = new Set(sessions.map(session => session.id));
  const errors = [];
  for (const session of sessions) {
    const node = skillGraph[session.id];
    if (!node) { errors.push(`Missing skill node: ${session.id}`); continue; }
    node.prerequisites.forEach(id => { if (!ids.has(id)) errors.push(`${session.id}: missing prerequisite ${id}`); });
  }
  const visiting = new Set();
  const visited = new Set();
  const visit = id => {
    if (visiting.has(id)) { errors.push(`Circular dependency at ${id}`); return; }
    if (visited.has(id)) return;
    visiting.add(id);
    (skillGraph[id]?.prerequisites || []).forEach(visit);
    visiting.delete(id); visited.add(id);
  };
  sessions.forEach(session => visit(session.id));
  return { valid:errors.length === 0, errors };
}

export function recommendSession(sessions, attempts, now = new Date()) {
  const done = completed(attempts);
  const last = [...done].sort((a,b) => a.completedAt.localeCompare(b.completedAt)).at(-1);
  if (last?.status === "Revisit") {
    return { session:sessions.find(session => session.id === last.sessionId), reason:"Revisit after difficulty", detail:"This learning idea needs a different explanation and another varied attempt." };
  }

  const reviewDue = sessions.map(session => ({ session, attempt:latestFor(done,session.id) }))
    .filter(entry => entry.attempt?.status === "Secure today" && now - new Date(entry.attempt.completedAt) >= 7 * 86400000)
    .sort((a,b) => a.attempt.completedAt.localeCompare(b.attempt.completedAt))[0];
  if (reviewDue) return { session:reviewDue.session, reason:"Review due", detail:"A spaced review will check whether this learning has stuck." };

  const unattempted = sessions.filter(session => !latestFor(done,session.id));
  const readyNew = unattempted.filter(session => (skillGraph[session.id]?.prerequisites || []).every(id => ready(latestFor(done,id))));
  const varied = readyNew.find(session => session.subject !== last?.subject) || readyNew[0];
  if (varied) {
    const prerequisites = skillGraph[varied.id]?.prerequisites || [];
    return { session:varied, reason:prerequisites.length ? "Next in your learning pathway" : "Ready to explore", detail:prerequisites.length ? "The supporting skills have been practised and are ready to build on." : "This starts a new curriculum pathway and balances recent subjects." };
  }

  const developing = sessions.map(session => ({ session, attempt:latestFor(done,session.id) }))
    .filter(entry => entry.attempt?.status === "Developing")
    .sort((a,b) => a.attempt.completedAt.localeCompare(b.attempt.completedAt))[0];
  if (developing) return { session:developing.session, reason:"Developing skill", detail:"Another varied item set will help consolidate this idea." };

  const blocked = unattempted[0];
  if (blocked) {
    const missing = (skillGraph[blocked.id]?.prerequisites || []).find(id => !ready(latestFor(done,id)));
    const prerequisite = sessions.find(session => session.id === missing);
    if (prerequisite) return { session:prerequisite, reason:"Prerequisite support", detail:`${prerequisite.title} supports the next curriculum step.` };
  }
  return null;
}
