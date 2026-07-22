import { sessions } from "./sessions.js";

const STORAGE_KEY = "pathfinder-v1-progress";
const app = document.querySelector("#app");
let active = null;

const loadAttempts = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } };
const saveAttempts = attempts => localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
const latestFor = (id) => loadAttempts().filter(a => a.sessionId === id).sort((a,b) => b.completedAt.localeCompare(a.completedAt))[0];
const statusLabel = a => !a ? "Not started" : a.status;
const escapeHtml = value => String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const recommended = () => {
  const attempts = loadAttempts();
  const latest = attempts.at(-1);
  if (latest?.status === "Revisit") return sessions.find(s => s.id === latest.sessionId);
  const uncompleted = sessions.find(s => !attempts.some(a => a.sessionId === s.id));
  if (uncompleted) return uncompleted;
  const needs = sessions.map(s => ({s,a:latestFor(s.id)})).filter(x => x.a.status !== "Secure today").sort((a,b) => a.a.completedAt.localeCompare(b.a.completedAt));
  return needs[0]?.s || null;
};

function speakVisible() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const text = document.querySelector("[data-speak]")?.innerText;
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-NZ";
  window.speechSynthesis.speak(utterance);
}

function renderHome() {
  active = null;
  const next = recommended();
  const attempts = loadAttempts();
  const completed = new Set(attempts.map(a => a.sessionId)).size;
  app.innerHTML = `<section><p class="eyebrow">One clear step at a time</p><h1>Learning that meets you where you are.</h1><p class="lead">A calm 15-minute session with teaching, practice, and useful feedback. No timer. No streak pressure.</p>
  ${next ? `<div class="card mission"><div><span class="pill">Today’s step · ${escapeHtml(next.subject)}</span><h2>${escapeHtml(next.title)}</h2><p>${escapeHtml(next.intention)}</p><p class="status">${completed} of ${sessions.length} sessions explored</p></div><button class="primary" data-start="${next.id}">Start session</button></div>` : `<div class="card mission"><div><span class="pill">Trial set complete</span><h2>Every session is secure today.</h2><p>Ask a parent to review the results before adding new learning.</p></div><button class="primary" data-route="parent">View progress</button></div>`}
  <p class="privacy">Your progress stays in this browser on this Mac.</p></section>`;
  focusMain();
}

function renderSessions() {
  active = null;
  app.innerHTML = `<section><p class="eyebrow">Choose your step</p><h1>All ten sessions</h1><p class="lead">The recommended order gives a balanced first trial, but you can choose any session.</p><div class="session-grid">${sessions.map((s,i) => { const a=latestFor(s.id); return `<article class="card session-card"><div class="meta"><span class="pill">${i+1} · ${escapeHtml(s.subject)}</span><span class="status">${statusLabel(a)}</span></div><h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.intention)}</p><button class="primary" data-start="${s.id}">${a ? "Try again" : "Start"}</button></article>`; }).join("")}</div></section>`;
  focusMain();
}

function startSession(id) {
  const session = sessions.find(s => s.id === id);
  active = { session, index:0, answers:[], hints:new Set(), startedAt:Date.now(), selected:null, checked:false };
  renderQuestion();
}

function renderQuestion() {
  const { session,index } = active;
  const item = session.questions[index];
  const total = session.questions.length;
  const showTeaching = index === 2;
  active.selected = null; active.checked = false;
  app.innerHTML = `<section class="lesson-shell"><div class="lesson-top"><div><span class="pill">${escapeHtml(session.subject)}</span> <span class="status">${escapeHtml(item.phase)}</span></div><button class="secondary" data-speak-button>Read aloud</button></div><div class="progress-track" aria-label="Session progress"><div class="progress-fill" style="width:${Math.round((index/total)*100)}%"></div></div>
  <div class="card" data-speak><p class="eyebrow">${escapeHtml(session.intention)}</p>${showTeaching ? `<h2>Learn</h2><p>${escapeHtml(session.teach)}</p><div class="example">${escapeHtml(session.example)}</div><hr>` : ""}<h2>${escapeHtml(item.phase)}</h2>${item.passage ? `<div class="passage">${escapeHtml(item.passage)}</div>` : ""}<p class="question-text">${escapeHtml(item.prompt)}</p><div class="answers" role="radiogroup" aria-label="Answer choices">${item.options.map((o,i)=>`<button class="answer" role="radio" aria-checked="false" data-answer="${i}">${escapeHtml(o)}</button>`).join("")}</div><div id="support" aria-live="polite"></div><div class="button-row">${item.phase === "Guided" && item.hint ? `<button class="secondary" data-hint>Show a hint</button>` : ""}<button class="primary" data-check disabled>Check answer</button></div></div><p class="privacy">Question ${index+1} of ${total}</p></section>`;
  focusMain();
}

function selectAnswer(index) {
  if (active.checked) return;
  active.selected = Number(index);
  document.querySelectorAll("[data-answer]").forEach((el,i) => { const on=i===active.selected; el.classList.toggle("selected",on); el.setAttribute("aria-checked",String(on)); });
  document.querySelector("[data-check]").disabled = false;
}

function checkAnswer() {
  if (active.selected === null || active.checked) return;
  active.checked = true;
  const item = active.session.questions[active.index];
  const correct = active.selected === item.answer;
  active.answers.push({ questionId:item.id, phase:item.phase, selected:active.selected, correct });
  document.querySelectorAll("[data-answer]").forEach(el => el.disabled=true);
  document.querySelector("[data-hint]")?.remove();
  const support = document.querySelector("#support");
  support.innerHTML = `<div class="feedback"><strong>${correct ? "That works." : "Not quite yet."}</strong> ${escapeHtml(item.feedback)}</div>`;
  const button = document.querySelector("[data-check]");
  button.textContent = active.index === active.session.questions.length-1 ? "Confidence check" : "Continue";
  button.disabled=false;
  button.dataset.next="true";
  button.focus();
}

function nextQuestion() {
  active.index += 1;
  if (active.index >= active.session.questions.length) renderConfidence(); else renderQuestion();
}

function showHint() {
  const item = active.session.questions[active.index];
  active.hints.add(item.id);
  document.querySelector("#support").innerHTML = `<p class="hint">Hint: ${escapeHtml(item.hint)}</p>`;
  document.querySelector("[data-hint]").disabled=true;
}

function renderConfidence() {
  app.innerHTML = `<section class="lesson-shell"><div class="progress-track"><div class="progress-fill" style="width:100%"></div></div><div class="card" data-speak><p class="eyebrow">Last step</p><h1>How does this feel now?</h1><p>Choose the answer that is honest today. It helps choose what comes next.</p><div class="confidence"><button class="answer" data-confidence="ready">I’m ready</button><button class="answer" data-confidence="getting there">I’m getting there</button><button class="answer" data-confidence="explain differently">Explain it differently</button></div></div></section>`;
  focusMain();
}

function finishSession(confidence) {
  const totalCorrect = active.answers.filter(a=>a.correct).length;
  const independent = active.answers.filter(a=>a.phase === "Independent");
  const independentCorrect = independent.filter(a=>a.correct).length;
  const secureScore = Math.ceil(active.answers.length * .85);
  const developingScore = Math.ceil(active.answers.length * .6);
  let status = totalCorrect < developingScore || confidence === "explain differently" ? "Revisit" : (totalCorrect >= secureScore && independentCorrect === independent.length && confidence === "ready" ? "Secure today" : "Developing");
  const attempt = { sessionId:active.session.id, completedAt:new Date().toISOString(), totalCorrect, totalQuestions:active.answers.length, independentCorrect, independentQuestions:independent.length, hintsUsed:active.hints.size, confidence, durationSeconds:Math.max(1,Math.round((Date.now()-active.startedAt)/1000)), status, responses:active.answers };
  saveAttempts([...loadAttempts(),attempt]);
  const session = active.session;
  active=null;
  app.innerHTML = `<section class="lesson-shell"><div class="card"><p class="eyebrow">Session complete</p><h1>${escapeHtml(status)}</h1><p class="lead">You practised: ${escapeHtml(session.intention.replace("I can ",""))}</p><div class="metric-grid"><div class="metric"><span>Questions</span><strong>${totalCorrect}/${attempt.totalQuestions}</strong></div><div class="metric"><span>Independent</span><strong>${independentCorrect}/${independent.length}</strong></div><div class="metric"><span>Hints</span><strong>${attempt.hintsUsed}</strong></div></div><p>${status === "Revisit" ? "This idea needs another explanation and another try. That is useful information, not a failure." : status === "Developing" ? "The idea is taking shape. A later review will help it stick." : "The skill was secure in today’s questions. A later review is still needed for durable mastery."}</p><div class="button-row"><button class="primary" data-route="home">See next step</button><button class="secondary" data-route="parent">Parent view</button></div></div></section>`;
  focusMain();
}

function renderParent() {
  active=null;
  const attempts=loadAttempts();
  const totalMinutes=Math.round(attempts.reduce((sum,a)=>sum+a.durationSeconds,0)/60);
  const rows=[...attempts].reverse().map(a=>{const s=sessions.find(x=>x.id===a.sessionId);return `<tr><td>${new Date(a.completedAt).toLocaleDateString("en-NZ")}</td><td>${escapeHtml(s.title)}</td><td>${escapeHtml(a.status)}</td><td>${a.totalCorrect}/${a.totalQuestions}</td><td>${a.hintsUsed}</td><td>${escapeHtml(a.confidence)}</td><td>${Math.max(1,Math.round(a.durationSeconds/60))} min</td></tr>`}).join("");
  app.innerHTML=`<section><p class="eyebrow">For the parent</p><h1>Progress, without guesswork.</h1><p class="lead">These results describe performance on this small question set. They are not a curriculum level or diagnosis.</p><div class="button-row"><button class="primary" data-route="teacher">Create teacher report</button></div><div class="metric-grid"><div class="card metric"><span>Sessions finished</span><strong>${attempts.length}</strong></div><div class="card metric"><span>Different skills tried</span><strong>${new Set(attempts.map(a=>a.sessionId)).size}/10</strong></div><div class="card metric"><span>Approx. learning time</span><strong>${totalMinutes} min</strong></div></div><div class="card"><h2>Attempt history</h2>${rows ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Session</th><th>Status</th><th>Score</th><th>Hints</th><th>Confidence</th><th>Time</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty">No sessions completed yet.</p>`}</div><div class="card privacy"><h2>Privacy on this prototype</h2><p>Progress is stored only in this Safari profile on this Mac. There is no account, cloud sync, advertising, analytics, or chatbot. Anyone using this browser profile can open this view.</p><button class="danger" data-reset>Reset local progress</button></div></section>`;
  focusMain();
}

function renderTeacherReport() {
  active=null;
  const attempts=loadAttempts();
  const completedIds=[...new Set(attempts.map(a=>a.sessionId))];
  const reportRows=completedIds.map(id=>{
    const s=sessions.find(x=>x.id===id); const all=attempts.filter(a=>a.sessionId===id); const latest=all.at(-1);
    return `<tr><td><strong>${escapeHtml(s.title)}</strong><br>${escapeHtml(s.subject)}</td><td>${escapeHtml(s.curriculum.focus)}</td><td>${escapeHtml(s.curriculum.practice)}</td><td>${latest.totalCorrect}/${latest.totalQuestions}<br>${escapeHtml(latest.status)}<br>${latest.hintsUsed} hint${latest.hintsUsed===1?"":"s"}; ${escapeHtml(latest.confidence)}</td></tr>`;
  }).join("");
  const dateRange=attempts.length ? `${new Date(attempts[0].completedAt).toLocaleDateString("en-NZ")} – ${new Date(attempts.at(-1).completedAt).toLocaleDateString("en-NZ")}` : "No activity recorded";
  app.innerHTML=`<section class="teacher-report"><div class="report-actions button-row"><button class="secondary" data-route="parent">Back to parent view</button><button class="primary" data-print>Print or save as PDF</button></div><p class="eyebrow">Pathfinder learning summary</p><h1>Teacher report</h1><p class="lead">Home learning aligned to New Zealand Curriculum Phase 3 (Years 7–8)</p><div class="report-meta"><p><strong>Reporting period:</strong> ${escapeHtml(dateRange)}</p><p><strong>Sessions completed:</strong> ${attempts.length} attempts across ${completedIds.length} micro-skills</p></div><div class="card"><h2>Purpose and interpretation</h2><p>Pathfinder provides short, explicit teaching and practice at home. Results show first-attempt performance on small, fixed question sets. They are formative observations only: they do not establish a curriculum level, reading age, diagnosis, or durable mastery.</p></div><div class="card"><h2>Curriculum-aligned activity</h2>${reportRows ? `<div class="table-wrap"><table><thead><tr><th>Learning focus</th><th>Phase 3 connection</th><th>What was practised</th><th>Latest evidence</th></tr></thead><tbody>${reportRows}</tbody></table></div>` : `<p class="empty">No completed sessions to report yet.</p>`}</div><div class="card"><h2>Teaching context</h2><p>Sessions use explicit teaching, worked examples, guided questions with optional hints, independent practice, immediate explanatory feedback, read-aloud support, and a learner confidence check. “Secure today” means strong performance on that session only; later review with different items is required before claiming durable mastery.</p><p><strong>Suggested discussion:</strong> Compare these observations with classroom work and assessment information, then identify whether the same skills, prerequisites, or access supports should be prioritised at home.</p></div><p class="report-footer">Generated locally by Pathfinder on ${new Date().toLocaleDateString("en-NZ")}. No personal or medical information is included.</p></section>`;
  focusMain();
}

function focusMain(){ app.focus({preventScroll:true}); window.scrollTo({top:0,behavior:"auto"}); }
function route(name){ window.speechSynthesis?.cancel(); if(name==="sessions")renderSessions(); else if(name==="parent")renderParent(); else if(name==="teacher")renderTeacherReport(); else renderHome(); }

document.addEventListener("click", e => {
  const routeButton=e.target.closest("[data-route]"); if(routeButton){route(routeButton.dataset.route);return;}
  const start=e.target.closest("[data-start]"); if(start){startSession(start.dataset.start);return;}
  const answer=e.target.closest("[data-answer]"); if(answer){selectAnswer(answer.dataset.answer);return;}
  if(e.target.closest("[data-speak-button]")){speakVisible();return;}
  if(e.target.closest("[data-hint]")){showHint();return;}
  const check=e.target.closest("[data-check]"); if(check){check.dataset.next ? nextQuestion() : checkAnswer();return;}
  const confidence=e.target.closest("[data-confidence]"); if(confidence){finishSession(confidence.dataset.confidence);return;}
  if(e.target.closest("[data-print]")){window.print();return;}
  if(e.target.closest("[data-reset]") && confirm("Remove every local Pathfinder attempt from this browser?")){localStorage.removeItem(STORAGE_KEY);renderParent();}
});

renderHome();
