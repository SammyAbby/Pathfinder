# Pathfinder Version 1 — product and educational specification

**Version:** 1.2.0 prototype

**Date:** 22 July 2026

**Learner:** one New Zealand Year 8 learner, approximately age 12

**Device:** Apple-silicon Mac mini, used in Safari

## 1. Product purpose

Pathfinder provides one achievable, independently usable learning success in about 15 minutes. It supplements classroom teaching in reading, writing, and mathematics. It is not a diagnostic instrument, an unrestricted tutor, a replacement curriculum, or a medical or learning-needs assessment.

The first release tests whether the learner can use a predictable routine, understand the feedback, tolerate the reading and typing load, and return willingly. It also gives a parent a clear record of what was attempted without reducing progress to one misleading grade.

## 2. Design principles

1. **Teach, then practise.** Every session includes a short explanation and worked example before questions.
2. **One small target.** A session has one observable learning intention.
3. **Age-respectful support.** Language is warm and direct, never babyish. No mascots, leaderboards, streak threats, failure sounds, or red punishment screens.
4. **Curriculum selects the objective.** Fixed rules select lessons and judge fixed-answer items. No model invents requirements or mastery decisions.
5. **Access without dilution.** Read-aloud, manageable chunks, clear layout, examples, and hints reduce barriers while preserving age-appropriate ideas.
6. **Mistakes are information.** Feedback names the likely reasoning step and offers a next action.
7. **The learner can pause.** There is no countdown and no penalty for leaving.
8. **Data minimisation.** Version 1 uses no name, email, school, medical information, analytics, advertising, or cloud storage.

## 3. Version 1 scope

### Included

- one anonymous local learner profile;
- sixteen fixed micro-sessions: six reading, five writing, five maths;
- one-question-at-a-time student experience;
- optional browser text-to-speech;
- hints in guided practice;
- immediate feedback;
- validated, versioned question bundles with stable option identifiers;
- curated standalone variation that never separates a follow-up from its authored context;
- safely shuffled answer positions with deterministic integrity checks;
- confidence check after each session;
- incrementally saved local session records, including interrupted and abandoned attempts;
- resumable in-progress sessions;
- exact question, answer-choice, response, support, and feedback snapshots for new attempts;
- deterministic prerequisite-, review-, and subject-aware recommended-next-session rules with visible reasons;
- a returning-learner welcome screen with last-session and next-step summaries;
- simple parent dashboard, item flagging, a separate detailed learner log, teacher report, and progress reset.

### Excluded

- open-ended chatbot or web browsing;
- generative AI;
- accounts, syncing, remote analytics, and teacher portal;
- automated marking of extended writing;
- claims of reading age, curriculum level, or learning diagnosis;
- full Phase 3 coverage.

## 4. Sixteen-session curriculum sample

| # | Area | Learning intention | Curriculum connection | Evidence captured |
|---:|---|---|---|---|
| 1 | Reading | Identify a text's main idea and choose supporting details | Comprehension; connect and summarise ideas | selected evidence and independent accuracy |
| 2 | Maths | Represent decimals using place value and powers of ten | Year 8 number structures and operations | interpretation and expanded form |
| 3 | Writing | Build complete, controlled sentences | Syntax, sentence boundaries, writing craft | sentence-choice and editing accuracy |
| 4 | Reading | Locate explicit evidence and explain what it supports | Retrieve, connect, and justify with evidence | evidence-to-claim matching |
| 5 | Maths | Connect fractions, decimals, and percentages | Rational-number equivalence and proportional reasoning | conversion accuracy |
| 6 | Writing | Organise a cohesive paragraph | Text structure, topic sentence, cohesion | ordering and linking choices |
| 7 | Reading | Make an inference from clues and prior knowledge | Infer layered meaning and justify interpretation | clue selection and inference |
| 8 | Maths | Form and solve one- and two-step equations | Year 8 algebra: equations, inverse operations, substitution | equation formation and solutions |
| 9 | Writing | Edit punctuation, precision, and sentence boundaries | Revising and editing; syntax and vocabulary | editing decisions |
| 10 | Reading | Judge a claim using evidence and source cues | Critical reading, perspective, reliability, evaluative language | claim/evidence judgement |
| 11 | Reading | Use context, roots, and affixes to infer vocabulary | Academic vocabulary, morphology, word origins, reference strategies | meaning selection and verification |
| 12 | Reading | Compare perspectives across two texts | Synthesis and critical analysis across texts | supported comparison of purpose, tone, and evidence |
| 13 | Writing | Build a persuasive argument | Position, evidence, counter-argument, respectful rhetoric | argument structure and evidence choices |
| 14 | Writing | Choose precise words for audience and effect | Nuances of synonyms, tone, voice, and language features | vocabulary and rhetorical choices |
| 15 | Maths | Solve part-to-part and part-to-whole ratio problems | Year 8 proportional reasoning and ratio | equivalent ratio and allocation accuracy |
| 16 | Maths | Interpret centre, spread, outliers, and graphs | Year 8 statistics and data visualisation | calculation and contextual interpretation |

This is a deliberately balanced interaction trial, not a proposed order for teaching the whole year. After the trial, observed needs and school evidence should determine the next content.

## 5. Session anatomy

The target duration is approximate; completion matters more than a timer.

| Phase | Target | Experience |
|---|---:|---|
| Retrieval warm-up | 2 min | two brief questions, including prior knowledge |
| Explicit teaching | 3 min | learning intention, concise explanation, worked example |
| Guided practice | 4 min | three questions; hint available; immediate explanatory feedback |
| Independent practice | 6 min | five questions; no pre-answer hint; immediate feedback after commitment |
| Confidence and close | 2 min | three-point confidence choice, specific summary, next recommendation |

The prototype does not enforce time. A later usability trial records actual duration and looks for fatigue or rushing.

## 6. Feedback model

Correct feedback confirms the useful reasoning, not intelligence: “Yes — 0.35 is 35 hundredths, so it is 35%.” Incorrect feedback avoids “wrong” as a label and gives one repair step: “Not quite yet. Percent means out of 100; write 3/5 as an equivalent fraction over 100.”

Guided questions provide one optional hint before an answer. Independent questions reveal explanations only after an answer. A retry does not erase the first response; Version 1 records the committed response for transparent progress.

Open-ended writing is not automatically graded in Version 1. Writing sessions use constrained editing, ordering, and sentence-selection tasks where approved answers are defensible. Later human-reviewed writing samples can be added separately.

## 7. Mastery and sequencing

Each completion stores first-attempt independent accuracy, hints used, confidence, and duration.

- **Secure for this micro-skill:** at least 85% total, all independent questions correct, and confidence “ready”.
- **Developing:** at least 60% total, unless the confidence response calls for a revisit.
- **Revisit:** below 60%, or confidence “explain differently”.

These labels apply only to the sampled micro-skill, not the curriculum strand. A single session never establishes durable mastery. A skill becomes **mastered** only after a later review session achieves at least 80% independently on a different item set with no more than one hint. Version 1 can mark a session “secure today” but does not yet claim durable mastery because alternate review forms are out of scope.

Next-session recommendation:

1. if the latest result is Revisit, recommend the same session once more;
2. otherwise recommend the earliest uncompleted session;
3. after all sixteen are complete, recommend the oldest Developing/Revisit session;
4. if all are Secure today, show that the trial set is complete and ask the parent to review results.

The learner may choose any session; recommendations are guidance, not gates.

## 8. Student experience

The home screen shows “Today’s step”, an estimated 15 minutes, a subject label, and one primary Start button. “All sessions” supports choice without exposing scores first. The activity screen shows one task at a time, the current phase, a simple progress bar, Read aloud, Hint when appropriate, answer options, and Continue. No score is displayed mid-session.

The completion screen states what was practised, one piece of evidence, the confidence selection, and the recommended next step. It never compares the learner with peers.

## 9. Parent dashboard

Parent view is deliberately simple:

- sessions completed and total time;
- latest activity;
- per-session status: Not started, Revisit, Developing, or Secure today;
- accuracy, hints, confidence, and duration for each attempt;
- plain-language observations, never inferred diagnoses;
- a printable teacher report linking completed work to specific Phase 3 curriculum content and practice evidence;
- local-data explanation and a deliberate reset action.

Version 1 has no PIN because it is a single-family prototype and contains no identity data. A PIN or separate OS account should be considered before storing richer notes.

## 10. Accessibility

- semantic headings, buttons, labels, and live feedback announcements;
- complete keyboard operation and visible focus;
- minimum 18 px body text and generous spacing;
- high contrast without relying on colour alone;
- respects reduced-motion preferences;
- browser text-to-speech for instructions and passages;
- short screens and one question at a time;
- no countdown, flashing content, autoplay, or unexpected audio;
- plain-language instructions and consistent controls;
- Māori words retain macrons and are passed to the system voice as written.

Text-to-speech quality depends on installed macOS voices. It is an access support, not a substitute for reading instruction.

## 11. Privacy and safety

All records remain in Safari `localStorage` on the Mac. The app sends no requests after its static files load. It stores session IDs, timestamps, responses, scores, hint counts, confidence, and duration. It does not store a child's name, free-form chat, school reports, health data, or voice.

The parent can inspect the visible history and erase all progress. Clearing Safari site data also removes it. Anyone using the same macOS/Safari profile can view the dashboard; use a separate macOS account if that is a concern. Local storage is convenient, not a secure database or backup. A production version would require authenticated access, encryption and backup decisions, a privacy impact assessment, retention rules, and review against the New Zealand Privacy Act 2020 and Children's Act considerations.

## 12. Technical architecture

Version 1 is a dependency-free progressive web-style site: HTML, CSS, and JavaScript modules served locally. This removes package installation, cloud dependencies, and Apple-silicon compatibility risk. Safari supplies text-to-speech; `localStorage` supplies progress persistence.

The content catalogue is separate from the interface. Every question has a stable ID, phase, prompt, options, answer, feedback, and optional hint. Version 1.1.1 adds three curated supplementary items to each session, one in each learning phase. On every attempt, the engine selects two warm-ups, three guided items, and five independent items, preferring items not used in the most recent attempt. Answer positions are shuffled while the approved answer mapping is preserved. At least three different questions therefore appear on an immediate retry, and answer position alone cannot be memorised. The exact displayed item is stored with the response for audit. The deterministic engine calculates results and recommendations. No secret keys are present.

The detailed learner log is accessible from Parent view, not from the student flow. It shows each completed attempt and, where recorded, the exact prompt, passage, answer given, approved answer, hint status, and feedback shown. Historical attempts remain readable; fields that were not captured at the time are labelled “not recorded” rather than inferred.

A later production build could wrap the same learning model in SwiftUI or a signed web container and replace localStorage with SQLite. That decision should follow learner testing, not precede it.

## 13. Acceptance criteria for the first family trial

The prototype succeeds if:

- it launches locally on the Mac mini without an account or installation;
- the learner completes at least three sessions across all subjects without adult navigation help;
- instructions and feedback are understood on first reading or with Read aloud;
- progress remains after closing and reopening Safari;
- the parent can explain what was practised and where support is needed;
- no data leaves the device;
- at least twelve of sixteen sessions take 10–18 minutes in authentic use;
- the learner reports that the tone feels respectful and is willing to use it again.

After the trial, capture confusion points, actual duration, reading/typing barriers, requested hints, emotional response, and any mismatch with current classroom work. Do not expand content until those findings are reviewed.
