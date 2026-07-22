import { sessions } from "./sessions.js";
import { getCatalogQuestion, prepareSession, validateCatalog } from "./question-engine.js";
import { recommendSession, skillGraph, validateSkillGraph } from "./learning-path.js";
import { confettiBurst, burstAt, celebrate, chime, toggleSound, isSoundOn, initAmbient } from "./celebrations.js";

const STORAGE_KEY = "pathfinder-v1-progress";
const APP_VERSION = "1.2.0";
const app = document.querySelector("#app");
let active = null;

const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const uid = () => globalThis.crypto?.randomUUID?.() || `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const stateOf = attempt => attempt.completionState || (attempt.completedAt ? "completed" : "in_progress");
const completedOnly = attempts => attempts.filter(attempt => stateOf(attempt) === "completed" && !attempt.invalidated);
const loadAttempts = () => { try { const value=JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(value) ? value : []; } catch { return []; } };
const saveAttempts = attempts => localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
const saveAttempt = attempt => { const attempts=loadAttempts(); const index=attempts.findIndex(item => item.attemptId === attempt.attemptId); if(index >= 0) attempts[index]=attempt; else attempts.push(attempt); saveAttempts(attempts); };
const latestFor = id => completedOnly(loadAttempts()).filter(a => a.sessionId === id).sort((a,b) => b.completedAt.localeCompare(a.completedAt))[0];
const currentAttempt = () => loadAttempts().filter(a => stateOf(a) === "in_progress").sort((a,b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))[0];
const sessionFor = id => sessions.find(session => session.id === id);

function elapsedLabel(dateText) {
  const days=Math.max(0,Math.floor((Date.now()-new Date(dateText).getTime())/86400000));
  if(days===0) return "earlier today";
  if(days===1) return "yesterday";
  return `${days} days ago`;
}

function speakVisible() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const text = document.querySelector("[data-speak]")?.innerText;
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-NZ";
  window.speechSynthesis.speak(utterance);
  if(active) { active.readAloudEvents.push({ questionId:active.session.questions[active.index]?.itemId || "teaching", at:new Date().toISOString() }); persistActive(); }
}

function persistActive() {
  if(!active) return;
  const now=new Date().toISOString();
  saveAttempt({
    attemptId:active.attemptId, schemaVersion:3, appVersion:APP_VERSION, itemSetVersion:active.itemSetVersion,
    variationSeed:active.seed, sessionId:active.session.id, startedAt:active.startedAt, updatedAt:now,
    completionState:"in_progress", currentIndex:active.index, currentSelection:active.selected,
    plannedQuestions:active.session.questions, displayedItemIds:[...active.displayedItemIds], responses:active.answers,
    hintsOpened:[...active.hints], readAloudEvents:active.readAloudEvents
  });
}

function renderHome() {
  active=null;
  const attempts=loadAttempts();
  const completed=completedOnly(attempts).sort((a,b) => a.completedAt.localeCompare(b.completedAt));
  const latest=completed.at(-1);
  const lastSession=sessionFor(latest?.sessionId);
  const pending=currentAttempt();
  const recommendation=recommendSession(sessions,attempts);
  const success=latest ? (latest.status === "Secure today" ? `You were secure in today’s questions about ${lastSession.title.toLowerCase()}.` : `You completed practice in ${lastSession.title.toLowerCase()}.`) : "";
  app.innerHTML=`<section class="welcome"><p class="eyebrow">Pathfinder · Version ${APP_VERSION}</p><h1>${latest ? "Welcome back, Sammy." : "Welcome to Pathfinder."}</h1>
    <p class="lead">${latest ? `Your last completed session was ${elapsedLabel(latest.completedAt)}. ${escapeHtml(success)}` : "Each session gives you one clear idea, supported practice, independent practice, and useful feedback in about 15 minutes."}</p>
    ${pending ? `<div class="card resume-card"><span class="pill">Session paused</span><h2>${escapeHtml(sessionFor(pending.sessionId)?.title || pending.sessionId)}</h2><p>Your work has been saved at question ${(pending.currentIndex || 0)+1}. You can continue without losing the questions already shown.</p><div class="button-row"><button class="primary" data-resume="${escapeHtml(pending.attemptId)}">Resume session</button><button class="secondary" data-end-attempt="${escapeHtml(pending.attemptId)}">End this attempt</button></div></div>` : ""}
    ${recommendation ? `<div class="card mission"><div><span class="pill">${escapeHtml(recommendation.reason)} · ${escapeHtml(recommendation.session.subject)}</span><h2><span class="mascot" aria-hidden="true">🧭</span> ${escapeHtml(recommendation.session.title)}</h2><p>${escapeHtml(recommendation.session.intention)}</p><p class="status">${escapeHtml(recommendation.detail)} · About 15 minutes</p></div><button class="primary" data-start="${recommendation.session.id}" ${pending ? "disabled" : ""}>Start today’s session</button></div>` : `<div class="card mission"><div><span class="pill">Pathways explored</span><h2><span class="mascot" aria-hidden="true">🏆</span> Every available session is secure today.</h2><p>A later spaced review will check what has stuck.</p></div></div>`}
    <p class="privacy">Progress stays in this browser. No account, advertising, analytics, or chatbot.</p></section>`;
  focusMain();
}

function renderSessions() {
  active=null;
  const recommendation=recommendSession(sessions,loadAttempts());
  app.innerHTML=`<section><p class="eyebrow">Choose your step</p><h1>All ${sessions.length} sessions</h1><p class="lead">The recommendation follows prerequisites, review timing, and subject balance. You can still choose another available session.</p><div class="session-grid">${sessions.map(session => { const result=latestFor(session.id); const node=skillGraph[session.id]; const unmet=(node?.prerequisites || []).filter(id => !latestFor(id) || latestFor(id).status === "Revisit"); const isRecommended=recommendation?.session.id===session.id; return `<article class="card session-card"><div class="meta"><span class="pill">${escapeHtml(session.subject)} · Year ${node?.year || "7–8"}</span><span class="status">${result?.status || "Not started"}</span></div><h2>${escapeHtml(session.title)}</h2><p>${escapeHtml(session.intention)}</p>${isRecommended ? `<p class="recommend-reason">Recommended: ${escapeHtml(recommendation.reason)}</p>` : ""}<button class="primary" data-start="${session.id}" ${currentAttempt() || unmet.length ? "disabled" : ""}>${result ? "Try varied review" : "Start"}</button>${unmet.length ? `<small>Build first: ${escapeHtml(unmet.map(id => sessionFor(id)?.title || id).join(", "))}</small>` : ""}</article>`; }).join("")}</div></section>`;
  focusMain();
}

function buildActive(attempt, sourceSession) {
  return { attemptId:attempt.attemptId, session:{...sourceSession,questions:attempt.plannedQuestions}, seed:attempt.variationSeed, itemSetVersion:attempt.itemSetVersion, index:attempt.currentIndex || 0, answers:attempt.responses || [], hints:new Set(attempt.hintsOpened || []), readAloudEvents:attempt.readAloudEvents || [], displayedItemIds:new Set(attempt.displayedItemIds || []), startedAt:attempt.startedAt, selected:attempt.currentSelection ?? null, checked:(attempt.responses || []).some(response => response.questionIndex === (attempt.currentIndex || 0)) };
}

function startSession(id) {
  if(currentAttempt()) return renderHome();
  const sourceSession=sessionFor(id);
  const prepared=prepareSession(sourceSession,completedOnly(loadAttempts()));
  active={ attemptId:uid(), session:prepared.session, seed:prepared.seed, itemSetVersion:prepared.itemSetVersion, index:0, answers:[], hints:new Set(), readAloudEvents:[], displayedItemIds:new Set(), startedAt:new Date().toISOString(), selected:null, checked:false };
  persistActive(); renderQuestion();
}

function resumeSession(attemptId) {
  const attempt=loadAttempts().find(item => item.attemptId===attemptId && stateOf(item)==="in_progress");
  if(!attempt) return renderHome();
  active=buildActive(attempt,sessionFor(attempt.sessionId));
  if(active.index >= active.session.questions.length) renderConfidence(); else renderQuestion(true);
}

function renderQuestion(resuming=false) {
  const {session,index}=active; const item=session.questions[index]; const total=session.questions.length;
  active.displayedItemIds.add(item.itemId); if(!resuming || !active.checked) { active.checked=false; active.selected=resuming ? active.selected : null; }
  persistActive();
  const checkedResponse=active.answers.find(response => response.questionIndex===index);
  app.innerHTML=`<section class="lesson-shell"><div class="lesson-top"><div><span class="pill">${escapeHtml(session.subject)}</span> <span class="status">${escapeHtml(item.phase)}</span></div><button class="secondary" data-speak-button>Read aloud</button></div><div class="progress-track" aria-label="Session progress"><div class="progress-fill" style="width:${Math.round((index/total)*100)}%"><span class="progress-rocket" aria-hidden="true">🚀</span></div></div><div class="card" data-speak><p class="eyebrow">${escapeHtml(session.intention)}</p>${index===2 ? `<h2>Learn</h2><p>${escapeHtml(session.teach)}</p><div class="example">${escapeHtml(session.example)}</div><hr>` : ""}<h2>${escapeHtml(item.phase)}</h2>${item.passage ? `<div class="passage">${escapeHtml(item.passage)}</div>` : ""}<p class="question-text">${escapeHtml(item.prompt)}</p><div class="answers" role="radiogroup" aria-label="Answer choices">${item.options.map(option => { const resultClass=checkedResponse && option.optionId===checkedResponse.correctOptionId ? " right-glow" : checkedResponse && !checkedResponse.correct && option.optionId===checkedResponse.selectedOptionId ? " wrong-shake" : ""; return `<button class="answer ${active.selected===option.optionId?"selected":""}${resultClass}" role="radio" aria-checked="${active.selected===option.optionId}" data-answer="${escapeHtml(option.optionId)}" ${checkedResponse?"disabled":""}>${escapeHtml(option.text)}</button>`; }).join("")}</div><div id="support" aria-live="polite">${checkedResponse ? `<div class="feedback feedback--${checkedResponse.correct ? "correct" : "incorrect"}"><strong>${checkedResponse.correct ? "That works." : "Not quite yet."}</strong> ${escapeHtml(checkedResponse.feedback)}</div>` : active.hints.has(item.itemId) ? `<p class="hint">Hint: ${escapeHtml(item.hint)}</p>` : ""}</div><div class="button-row">${item.phase==="Guided" && item.hint && !checkedResponse ? `<button class="secondary" data-hint ${active.hints.has(item.itemId)?"disabled":""}>Show a hint</button>` : ""}<button class="primary" data-check ${!active.selected && !checkedResponse ? "disabled" : ""} ${checkedResponse ? "data-next=true" : ""}>${checkedResponse ? (index===total-1 ? "Confidence check" : "Continue") : "Check answer"}</button></div></div><p class="privacy">Question ${index+1} of ${total} · Item ${escapeHtml(item.itemId)} v${escapeHtml(item.itemVersion)}</p></section>`;
  focusMain();
}

function selectAnswer(optionId) { if(active.checked) return; active.selected=optionId; persistActive(); renderQuestion(true); chime("select"); }

function checkAnswer() {
  if(!active.selected || active.checked) return;
  const item=active.session.questions[active.index]; const selected=item.options.find(option => option.optionId===active.selected); const approved=item.options.find(option => option.optionId===item.correctOptionId);
  if(!selected || !approved) return invalidateRuntimeItem(item);
  active.checked=true;
  active.answers.push({ questionIndex:active.index, questionId:item.itemId, itemVersion:item.itemVersion, phase:item.phase, prompt:item.prompt, passage:item.passage || "", options:item.options.map(option => ({...option})), selectedOptionId:selected.optionId, selectedText:selected.text, correctOptionId:approved.optionId, correctText:approved.text, correct:selected.optionId===approved.optionId, feedback:item.feedback, hintOpened:active.hints.has(item.itemId), displayedAt:new Date().toISOString() });
  const correct=selected.optionId===approved.optionId;
  persistActive(); renderQuestion(true); const feedback=document.querySelector(".feedback"); if(correct){chime("correct"); if(feedback)burstAt(feedback,{count:22});}else chime("wrong"); document.querySelector("[data-check]")?.focus();
}

function nextQuestion() { active.index+=1; active.selected=null; active.checked=false; persistActive(); active.index>=active.session.questions.length ? renderConfidence() : renderQuestion(); }
function showHint() { const item=active.session.questions[active.index]; active.hints.add(item.itemId); persistActive(); renderQuestion(true); }
function renderConfidence() { persistActive(); app.innerHTML=`<section class="lesson-shell"><div class="progress-track"><div class="progress-fill" style="width:100%"></div></div><div class="card" data-speak><p class="eyebrow">Last step</p><h1>How does this feel now?</h1><p>Choose the answer that is honest today. It helps Pathfinder choose what comes next.</p><div class="confidence"><button class="answer" data-confidence="ready">I’m ready</button><button class="answer" data-confidence="getting there">I’m getting there</button><button class="answer" data-confidence="explain differently">Explain it differently</button></div></div></section>`; focusMain(); }

function finishSession(confidence) {
  const totalCorrect=active.answers.filter(a=>a.correct).length; const independent=active.answers.filter(a=>a.phase==="Independent"); const independentCorrect=independent.filter(a=>a.correct).length; const total=active.answers.length;
  const status=totalCorrect<Math.ceil(total*.6) || confidence==="explain differently" ? "Revisit" : totalCorrect>=Math.ceil(total*.85) && independentCorrect===independent.length && confidence==="ready" ? "Secure today" : "Developing";
  const completedAt=new Date().toISOString(); const attempt={...loadAttempts().find(item=>item.attemptId===active.attemptId),completionState:"completed",completedAt,updatedAt:completedAt,totalCorrect,totalQuestions:total,independentCorrect,independentQuestions:independent.length,hintsUsed:active.hints.size,confidence,durationSeconds:Math.max(1,Math.round((new Date(completedAt)-new Date(active.startedAt))/1000)),status,responses:active.answers,currentSelection:null}; saveAttempt(attempt);
  const session=active.session; active=null; const starCount=status==="Secure today"?5:status==="Developing"?3:0; const celebration=starCount?`<div class="win-stars" aria-label="${starCount} stars">${"<span class=\"win-star\">⭐</span>".repeat(starCount)}</div>`:`<div class="win-stars" aria-hidden="true"><span class="win-star">🌱</span></div>`;
  app.innerHTML=`<section class="lesson-shell"><div class="card"><p class="eyebrow">Session complete</p>${celebration}<h1>${escapeHtml(status)}</h1><p class="lead">You practised: ${escapeHtml(session.intention.replace("I can ",""))}</p><div class="metric-grid"><div class="metric"><span>Questions</span><strong>${totalCorrect}/${total}</strong></div><div class="metric"><span>Independent</span><strong>${independentCorrect}/${independent.length}</strong></div><div class="metric"><span>Hints</span><strong>${attempt.hintsUsed}</strong></div></div><p>${status==="Revisit" ? "This idea needs another explanation and another try. That is useful information, not a failure." : status==="Developing" ? "The idea is taking shape. A later review will help it stick." : "The skill was secure in today’s questions. A later review is still needed for durable mastery."}</p><div class="button-row"><button class="primary" data-route="home">Return to welcome</button><button class="secondary" data-route="parent">Parent view</button></div></div></section>`; focusMain(); if(status==="Secure today")celebrate(); else if(status==="Developing"){chime("correct");confettiBurst({y:innerHeight*.4,count:20});}
}

function endAttempt(attemptId, reason="Stopped before completion") { const attempt=loadAttempts().find(item=>item.attemptId===attemptId); if(!attempt)return; saveAttempt({...attempt,completionState:"abandoned",endedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),endReason:reason}); active=null; renderHome(); }
function invalidateRuntimeItem(item) { endAttempt(active.attemptId,`Invalid item mapping: ${item.itemId}`); }

function renderParent() {
  active=null; const attempts=loadAttempts(); const completed=completedOnly(attempts); const totalMinutes=Math.round(completed.reduce((sum,a)=>sum+(a.durationSeconds||0),0)/60);
  const rows=[...attempts].reverse().map(a=>{const s=sessionFor(a.sessionId); const state=stateOf(a); return `<tr><td>${new Date(a.completedAt || a.updatedAt || a.startedAt).toLocaleDateString("en-NZ")}</td><td>${escapeHtml(s?.title || a.sessionId)}</td><td>${escapeHtml(state==="completed" ? a.status : state.replace("_"," "))}</td><td>${state==="completed" ? `${a.totalCorrect}/${a.totalQuestions}` : `${(a.responses||[]).length} recorded`}</td><td>${a.hintsUsed ?? (a.hintsOpened||[]).length}</td><td>${escapeHtml(a.confidence || "Not recorded")}</td></tr>`}).join("");
  app.innerHTML=`<section><p class="eyebrow">For the parent</p><h1>Progress, without guesswork.</h1><p class="lead">Completed results and unfinished records are clearly separated. These observations are not a curriculum level or diagnosis.</p><div class="button-row"><button class="primary" data-route="teacher">Create teacher report</button><button class="secondary" data-route="learner-log">Detailed learner log</button></div><div class="metric-grid"><div class="card metric"><span>Sessions finished</span><strong>${completed.length}</strong></div><div class="card metric"><span>Different skills tried</span><strong>${new Set(completed.map(a=>a.sessionId)).size}/${sessions.length}</strong></div><div class="card metric"><span>Approx. learning time</span><strong>${totalMinutes} min</strong></div></div><div class="card"><h2>Attempt history</h2>${rows ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Session</th><th>State</th><th>Evidence</th><th>Hints</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty">No sessions recorded yet.</p>`}</div><div class="card privacy"><h2>Privacy</h2><p>Progress remains in this browser profile. There is no account, cloud sync, advertising, analytics, or chatbot.</p><button class="danger" data-reset>Reset local progress</button></div></section>`; focusMain();
}

function renderLearnerLog() {
  active=null; const attempts=[...loadAttempts()].reverse();
  const cards=attempts.map((attempt,attemptIndex)=>{const session=sessionFor(attempt.sessionId); const state=stateOf(attempt); const responseRows=(attempt.responses||[]).map((response,index)=>{const catalog=getCatalogQuestion(sessions,response.questionId); const options=response.options || catalog?.options || []; const selectedText=response.selectedText || options.find(option=>option.optionId===response.selectedOptionId)?.text || catalog?.options?.[response.selected]?.text || "Not recorded"; const correctText=response.correctText || options.find(option=>option.optionId===response.correctOptionId)?.text || catalog?.options?.find(option=>option.optionId===catalog.correctOptionId)?.text || "Not recorded"; const flag=response.flag; return `<article class="response-record"><div class="meta"><span class="pill">${index+1} · ${escapeHtml(response.phase || catalog?.phase || "Question")}</span><span class="status">${response.correct ? "Correct" : "Developing"}</span><span class="item-code">${escapeHtml(response.questionId)} v${escapeHtml(response.itemVersion || "historical")}</span></div>${response.passage ? `<div class="passage">${escapeHtml(response.passage)}</div>` : ""}<h3>${escapeHtml(response.prompt || catalog?.prompt || "Historical question")}</h3><dl class="response-details"><div><dt>Answer given</dt><dd>${escapeHtml(selectedText)}</dd></div><div><dt>Approved answer</dt><dd>${escapeHtml(correctText)}</dd></div><div><dt>Support</dt><dd>${response.hintOpened ? "Hint opened" : "No hint recorded"}</dd></div><div><dt>Feedback shown</dt><dd>${escapeHtml(response.feedback || catalog?.feedback || "Not recorded")}</dd></div></dl>${flag ? `<p class="flag-note"><strong>Flagged:</strong> ${escapeHtml(flag.reason)}</p>` : `<button class="secondary compact" data-flag-attempt="${escapeHtml(attempt.attemptId)}" data-flag-question="${escapeHtml(response.questionId)}">Flag this item</button>`}</article>`}).join(""); const when=attempt.completedAt || attempt.updatedAt || attempt.startedAt; return `<details class="card attempt-record" ${attemptIndex===0?"open":""}><summary><strong>${escapeHtml(session?.title || attempt.sessionId)}</strong> — ${new Date(when).toLocaleString("en-NZ")} — ${escapeHtml(state==="completed" ? attempt.status : state.replace("_"," "))}</summary><div class="attempt-meta"><span>${(attempt.responses||[]).length} responses recorded</span><span>${(attempt.hintsOpened||[]).length || attempt.hintsUsed || 0} hints</span><span>Item set: ${escapeHtml(attempt.itemSetVersion || "historical")}</span><span>Seed: ${escapeHtml(attempt.variationSeed || "not recorded")}</span></div>${responseRows || `<p class="empty">No responses had been checked when this attempt ended.</p>`}</details>`}).join("");
  app.innerHTML=`<section class="learner-log"><div class="button-row"><button class="secondary" data-route="parent">Back to parent view</button></div><p class="eyebrow">Parent investigation view</p><h1>Detailed learner log</h1><p class="lead">Completed, interrupted, and abandoned attempts retain the exact evidence available at the time. This view is separate from Sammy’s learning screens.</p>${cards || `<div class="card"><p class="empty">No attempts recorded yet.</p></div>`}</section>`; focusMain();
}

function showFlagOptions(button) {
  button.outerHTML=`<div class="flag-options" role="group" aria-label="Reason for flagging" data-attempt-id="${escapeHtml(button.dataset.flagAttempt)}" data-question-id="${escapeHtml(button.dataset.flagQuestion)}"><p>What seems wrong?</p><button class="secondary compact" data-submit-flag="answers do not match">Answers do not match</button><button class="secondary compact" data-submit-flag="more than one answer may be correct">More than one may be correct</button><button class="secondary compact" data-submit-flag="unclear wording">Unclear wording</button><button class="secondary compact" data-submit-flag="other content concern">Other content concern</button></div>`;
}
function flagItem(attemptId,questionId,reason) { const attempt=loadAttempts().find(item=>item.attemptId===attemptId); if(!attempt)return; const responses=(attempt.responses||[]).map(response=>response.questionId===questionId ? {...response,flag:{reason,flaggedAt:new Date().toISOString()}} : response); saveAttempt({...attempt,responses,updatedAt:new Date().toISOString()}); renderLearnerLog(); }

function phaseEvidence(attempt,phase) { const rows=(attempt.responses||[]).filter(response=>response.phase===phase && !response.flag); return rows.length ? `${rows.filter(response=>response.correct).length}/${rows.length}` : "Not recorded"; }
function renderTeacherReport() {
  active=null; const attempts=completedOnly(loadAttempts()); const ids=[...new Set(attempts.map(a=>a.sessionId))];
  const rows=ids.map(id=>{const session=sessionFor(id); const all=attempts.filter(a=>a.sessionId===id); const latest=all.at(-1); const flagged=(latest.responses||[]).some(response=>response.flag); return `<tr><td><strong>${escapeHtml(session.title)}</strong><br>${escapeHtml(session.subject)} · Year ${skillGraph[id]?.year || "7–8"}</td><td>${escapeHtml(session.curriculum.focus)}</td><td>${escapeHtml(session.curriculum.practice)}</td><td>Warm-up ${phaseEvidence(latest,"Warm-up")}<br>Guided ${phaseEvidence(latest,"Guided")}<br>Independent ${phaseEvidence(latest,"Independent")}<br>${latest.hintsUsed || 0} hints; ${latest.readAloudEvents?.length || 0} read aloud</td><td>${flagged ? "Evidence under review" : escapeHtml(latest.status)}<br>${escapeHtml(latest.confidence)}</td></tr>`}).join(""); const dateRange=attempts.length ? `${new Date(attempts[0].completedAt).toLocaleDateString("en-NZ")} – ${new Date(attempts.at(-1).completedAt).toLocaleDateString("en-NZ")}` : "No completed activity";
  app.innerHTML=`<section class="teacher-report"><div class="report-actions button-row"><button class="secondary" data-route="parent">Back to parent view</button><button class="primary" data-print>Print or save as PDF</button></div><p class="eyebrow">Pathfinder learning summary · Version ${APP_VERSION}</p><h1>Teacher report</h1><p class="lead">Home learning aligned to New Zealand Curriculum Phase 3 (Years 7–8)</p><div class="report-meta"><p><strong>Reporting period:</strong> ${escapeHtml(dateRange)}</p><p><strong>Completed:</strong> ${attempts.length} attempts across ${ids.length} micro-skills</p></div><div class="card"><h2>Purpose and limits</h2><p>Pathfinder provides explicit teaching and short formative practice. Results do not establish a curriculum level, reading age, diagnosis, predicted grade, or durable mastery. “Secure today” requires later confirmation with a varied item set.</p></div><div class="card"><h2>Curriculum-aligned evidence</h2>${rows ? `<div class="table-wrap"><table><thead><tr><th>Learning focus</th><th>Phase 3 connection</th><th>Practices sampled</th><th>Phase evidence</th><th>Current observation</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty">No completed sessions to report.</p>`}</div><div class="card"><h2>Suggested home–school discussion</h2><p>Compare the guided and independent evidence with classroom work. Consider whether the same prerequisites, vocabulary, or access supports should be reinforced, and whether a developing response pattern also appears at school.</p></div><p class="report-footer">Generated locally on ${new Date().toLocaleDateString("en-NZ")}. Incomplete and flagged evidence is excluded from performance summaries.</p></section>`; focusMain();
}

function renderFatal(errors) { app.innerHTML=`<section><div class="card"><p class="eyebrow">Content safety check</p><h1>Pathfinder paused safely.</h1><p>A content-integrity check failed, so no learning questions have been shown or scored.</p><details><summary>Technical details for a parent or developer</summary><ul>${errors.map(error=>`<li>${escapeHtml(error)}</li>`).join("")}</ul></details></div></section>`; }
function focusMain(){ app.focus({preventScroll:true}); window.scrollTo({top:0,behavior:"auto"}); }
function route(name){ window.speechSynthesis?.cancel(); if(name==="sessions")renderSessions(); else if(name==="parent")renderParent(); else if(name==="teacher")renderTeacherReport(); else if(name==="learner-log")renderLearnerLog(); else renderHome(); }

document.addEventListener("click",event=>{
  const routeButton=event.target.closest("[data-route]"); if(routeButton){route(routeButton.dataset.route);return;}
  const start=event.target.closest("[data-start]"); if(start){startSession(start.dataset.start);return;}
  const resume=event.target.closest("[data-resume]"); if(resume){resumeSession(resume.dataset.resume);return;}
  const end=event.target.closest("[data-end-attempt]"); if(end && confirm("End this attempt? The questions already shown will remain in the detailed log.")){endAttempt(end.dataset.endAttempt);return;}
  const answer=event.target.closest("[data-answer]"); if(answer){selectAnswer(answer.dataset.answer);return;}
  if(event.target.closest("[data-speak-button]")){speakVisible();return;}
  if(event.target.closest("[data-hint]")){showHint();return;}
  const check=event.target.closest("[data-check]"); if(check){check.dataset.next ? nextQuestion() : checkAnswer();return;}
  const confidence=event.target.closest("[data-confidence]"); if(confidence){finishSession(confidence.dataset.confidence);return;}
  const flag=event.target.closest("[data-flag-question]"); if(flag){showFlagOptions(flag);return;}
  const flagReason=event.target.closest("[data-submit-flag]"); if(flagReason){const details=flagReason.closest(".flag-options"); const attemptId=details?.dataset.attemptId; const questionId=details?.dataset.questionId; if(attemptId&&questionId) flagItem(attemptId,questionId,flagReason.dataset.submitFlag); return;}
  const soundButton=event.target.closest("[data-sound-toggle]"); if(soundButton){const on=toggleSound();syncSoundButton(soundButton,on);return;}
  if(event.target.closest("[data-print]")){window.print();return;}
  if(event.target.closest("[data-reset]") && confirm("Remove every local Pathfinder attempt from this browser?")){localStorage.removeItem(STORAGE_KEY);renderParent();}
});

function syncSoundButton(button,on){button.textContent=on?"🔊":"🔇";button.setAttribute("aria-pressed",String(on));button.setAttribute("aria-label",on?"Sound on":"Sound off");}

initAmbient();
const initialSoundButton=document.querySelector("[data-sound-toggle]");
if(initialSoundButton)syncSoundButton(initialSoundButton,isSoundOn());
const contentCheck=validateCatalog(sessions); const graphCheck=validateSkillGraph(sessions);
if(!contentCheck.valid || !graphCheck.valid) renderFatal([...contentCheck.errors,...graphCheck.errors]); else renderHome();
