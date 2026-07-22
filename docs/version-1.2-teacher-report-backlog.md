# Version 1.2 backlog — reporting and learner experience

**Status:** Version 1.2 core implemented on 22 July 2026. This document remains the design record; items needing teacher review, richer misconception tagging, parent observations, and broader curriculum content remain future work.

## Learner welcome screen

Add a calm learner-facing landing screen before the next session begins. Its purpose is to help the learner reorient, recognise recent progress, and choose when to start instead of being placed directly into a question.

### Proposed content

- A short, age-respectful welcome using the learner's locally stored display name.
- A neutral time-away message, such as “Welcome back — it has been 3 days since your last session.”
- A summary of the most recently completed session: subject, learning intention, completion date, and one specific success or next step supported by recorded evidence.
- A clear preview of today's proposed session: subject, learning goal, and approximate duration.
- One prominent **Start today's session** button.
- Secondary access to progress and accessibility controls without crowding the screen.

### Behaviour and safeguards

- On first use, show a simple introduction to Pathfinder and explain the predictable 15-minute session structure instead of referring to a previous session.
- Calculate “last session” from the most recent completed attempt, not merely the last time the page was opened.
- Do not use guilt, urgency, lost-streak language, or negative colouring after a long absence.
- Do not expose marks, incorrect answers, parent notes, or the detailed learner log on this screen.
- Phrase recent progress cautiously; do not call a skill “mastered” unless the full mastery rule has been met.
- Continue to work locally and offline, without an account or learner email address.
- Ensure the layout works on Mac and iPhone-sized screens and remains keyboard and screen-reader accessible.

### Acceptance criteria

- Returning learners see an accurate summary of their most recently completed session and the elapsed time since it was completed.
- New learners see an introduction that does not contain empty or invented history.
- An interrupted or incomplete attempt is described accurately and can be resumed when resume support is implemented.
- The next learning activity does not begin until the learner presses the start button.
- The main action and essential summary remain usable at 200% text size and on a narrow mobile screen.
- Date and elapsed-time wording uses the device's New Zealand-local date and handles same-day, yesterday, and longer gaps naturally.

## Performance-aware session sequencing

Replace the simple fixed-list progression with a transparent sequencing engine that balances curriculum order, prerequisite readiness, subject variety, spaced review, and the learner's recent evidence. Selection must be deterministic and explainable rather than random.

### Proposed priority order

1. A session needing immediate reteaching when the learner selected **Explain it differently** or the evidence shows a foundational misunderstanding.
2. A previously taught skill whose scheduled review is due.
3. The next unattempted skill whose prerequisites are sufficiently secure.
4. A developing skill that would benefit from another varied item set.
5. A new curriculum skill, while avoiding unnecessary runs of the same subject.

### Behaviour and safeguards

- Keep explicit prerequisite links between skills; subject rotation must never advance past an unmet prerequisite merely to create variety.
- Normally rotate Reading, Writing, and Maths across days, but allow educational need to override the rotation.
- Avoid repeating a session immediately unless reteaching is genuinely indicated; when it is repeated, use a different approved item set and explanation where available.
- Schedule later retrieval of skills marked **Secure today** before treating them as durably secure.
- Show the parent why a session was selected, such as “next in sequence”, “review due”, or “revisit after difficulty”.
- Let the learner choose another available session without corrupting the recommended sequence.
- Do not use an opaque score, unrestricted AI choice, or random subject selection to determine the learning path.

### Acceptance criteria

- The same learner history always produces the same recommendation and a human-readable reason.
- No new skill is recommended while a required prerequisite remains unready.
- A due review takes priority over unrelated new content unless an immediate reteaching need exists.
- Subject variety is maintained across suitable new sessions without weakening curriculum progression.
- Manual session choices are recorded and the next recommendation recalculates correctly.
- Historical Version 1 attempts remain usable, with unavailable sequencing evidence treated as unknown rather than negative.

## Curriculum dependency graph

Convert the documented Phase 3 curriculum skills tree into a machine-readable dependency graph. The graph must preserve the Ministry's Year 7 and Year 8 teaching sequence while also recording the prerequisite relationships needed to make safe individual recommendations.

Do not represent the curriculum as one rigid ladder. Mathematics contains several connected progressions, while English includes mutually reinforcing strands such as vocabulary, fluency, comprehension, text analysis, sentence construction, composition, and editing that may develop in parallel.

### Required skill metadata

Each micro-skill should record:

```text
skillId
subject
strand
curriculumPhase
curriculumYear
officialCurriculumStatement
officialSource
directPrerequisiteIds[]
supportingSkillIds[]
dependentSkillIds[]
recommendedReviewIntervals[]
readinessRule
masteryRule
currentSessionIds[]
coverageStatus
```

`coverageStatus` must distinguish **targeted**, **sampled**, and **gap**, using the same cautious definitions as the curriculum tree in the README.

### Initial mathematics progression families

- Place value and powers of ten → fraction equivalence → fraction, decimal, and percentage conversion → operations → proportional reasoning → ratios → percentage change and financial applications.
- Multiplication and divisibility → factors and multiples → primes → HCF and LCM → fraction simplification and common denominators.
- Equality and inverse operations → variables → substitution → one- and two-step equations → rational equations and inequalities → rearranging, simplifying, and factorising expressions → linear patterns and graphs.
- Units and conversion → perimeter, area, and volume → formulae → unknown measures → composite shapes and prisms.
- Angle and shape properties → coordinates and transformations → parallel-line relationships → unknown-angle equations → polygon angle generalisation.
- Statistical questions and variables → data collection → centre and spread → visualisation → outliers and distribution shape → contextual interpretation → evaluation of claims and misleading displays.

### Initial English progression families

- Accurate access, fluency, vocabulary, morphology, and sentence comprehension provide continuing support for all reading pathways.
- Explicit information → topic and main idea → relevant evidence → supported inference → language and structure analysis → comparison of perspectives → source and claim evaluation → synthesis across texts.
- Sentence completeness and grammar → clause and punctuation control → paragraph structure → cohesion → purpose and audience → complete text structures → evidence and source use → revision, editing, and publishing.
- Persuasive writing progresses from a stated position and relevant reasons to trustworthy evidence, logical organisation, acknowledgement of opposing positions, respectful rebuttal, rhetorical choices, and a strong conclusion.

### Rules and safeguards

- Label every relationship as either directly stated by the official sequence or a Pathfinder pedagogical dependency inferred from that sequence.
- Preserve links to the exact Ministry source and curriculum statement so the model can be audited when curriculum documents change.
- Use a short diagnostic or prerequisite review when historical evidence is absent; do not assume readiness solely from age or year level.
- Provide access to age-appropriate, year-level ideas and texts while scaffolding an earlier underlying skill.
- Allow teachers and parents to see the pathway and reason for a recommendation without exposing a complex dependency diagram in the learner experience.
- Never equate completion of a short session with coverage of an entire curriculum statement.

### Acceptance criteria

- Every Version 1.2 session maps to at least one curriculum node and identifies any direct prerequisites.
- The system detects circular, missing, and invalid dependency references during development.
- A learner cannot be advanced to a dependent skill solely because an unrelated skill was secure.
- Parallel English support strands can be scheduled without unnecessarily blocking comprehension and composition work.
- Every recommendation can identify its curriculum node, prerequisite evidence, and next dependent skill.
- The README coverage tree can be generated or checked against the graph so documentation and application data do not silently diverge.

## Question and answer integrity

Treat every question, its context or passage, answer choices, approved answer, explanation, hint, misconception tags, and curriculum link as one inseparable versioned learning item. Variation must never assemble these fields independently or allow an answer key to refer to the position an option occupied before shuffling.

### Item model

Use stable identifiers rather than array positions:

```text
itemId
itemVersion
skillId
phase
prompt
contextOrPassage
options[{ optionId, text, misconceptionTag }]
correctOptionId
hint
feedbackByOptionId
workedReason
curriculumStatementId
reviewStatus
```

When choices are shuffled, shuffle complete option objects and continue to determine correctness from `correctOptionId`. Never store or transmit correctness as only “answer 0”, “answer 1”, or another mutable display index.

### Validation pipeline

- Reject duplicate item IDs, duplicate option IDs, blank prompts, missing choices, missing approved answers, and correct-option IDs that do not exist in the item.
- Confirm that every multiple-choice item has exactly one approved answer unless it is explicitly designed and rendered as multi-select.
- Exercise every curated item under many deterministic shuffle seeds and verify that the same approved option remains correct after every permutation.
- Verify that the snapshot stored in the learner log exactly matches what was rendered, including the displayed option order and selected option ID.
- For generated numerical variants, calculate the approved answer independently in code and enforce domain constraints such as non-zero denominators, intended difficulty, sensible units, and unambiguous rounding.
- For generated language variants, keep the passage, prompt, choices, answer, and explanations in one approved bundle. Do not combine a prompt from one template with options from another.
- Check that each distractor is plausible but demonstrably incorrect and that its feedback explains the actual misconception represented.
- Run curriculum mapping, reading-level, ambiguity, grammar, cultural-context, and age-appropriateness review before an item becomes eligible for learner use.
- Maintain a human-review state: `draft`, `validated`, `teacher-reviewed`, or `retired`. Learners may receive only validated or teacher-reviewed items.
- Retire faulty item versions without rewriting historical attempts; the learner log must retain the exact version Sammy actually saw.

### In-app investigation and reporting

- Display the item ID and version in the detailed learner log, not in the ordinary learner or parent view.
- Add a parent-only **Flag this item** action that records a reason such as “answers do not match”, “more than one answer may be correct”, “unclear wording”, or an optional note.
- Allow the parent to copy a compact diagnostic containing the session ID, item ID and version, variation seed, displayed prompt and choices, and app version, without including unrelated learner history.
- A flagged item should be excluded from mastery calculations until reviewed if the content is confirmed faulty; retain both the original result and the later invalidation decision for auditability.

### Incremental attempt persistence

Create and save an in-progress attempt before the first question is displayed. Update it atomically whenever an item is shown, an option is selected, an answer is checked, a hint or Read aloud is used, or the learner advances. Do not wait for the confidence check or session completion before writing the learner log.

- Record the exact rendered snapshot of the current question and displayed option order as soon as it appears.
- Preserve answered and unanswered displayed items when the learner closes the tab, navigates away, encounters an error, or chooses to stop.
- Mark records explicitly as `in_progress`, `completed`, `abandoned`, or `invalidated`; never present an unfinished attempt as a completed learning result.
- Offer **Resume session** from the learner welcome screen when a valid in-progress attempt exists.
- Offer the parent a neutral **End this attempt** action that retains the audit record without scoring unattempted questions.
- Include incomplete attempts in the detailed learner log, but exclude them from mastery, recommendation, and teacher-report performance calculations unless a future rule explicitly uses completed-item evidence and labels it appropriately.
- Save a non-sensitive reason when an attempt ends because of an invalid question or application error.
- Recover safely from a partially written record and retain the last valid state.

### Release gates and acceptance criteria

- Automated integrity checks pass for every eligible question and every supported shuffle path before release.
- Tests deliberately alter an answer mapping and prove that the release check fails.
- Tests verify that two item bundles cannot be accidentally cross-combined.
- All generated mathematics variants are solved and checked by independent deterministic code.
- A representative sample of reading and writing items receives human educational review, with all new template families reviewed before release.
- No flagged or retired item is served in a new session.
- If a validation failure occurs at runtime, the item is not displayed; the app records a non-sensitive error and substitutes another validated item or safely ends the session without scoring the missing item.
- A confirmed faulty item cannot lower a learner's status, trigger **Revisit**, or appear as evidence of a misconception.
- Reloading or closing the app at every point in a test session retains every question already displayed and every response already checked.
- An unfinished session appears in the detailed learner log immediately and can be resumed or deliberately ended without being mistaken for a completed attempt.

## Objective

Give Sammy's teacher a concise, academically useful account of what was taught, what Sammy demonstrated independently, what support she used, and what should be considered next. The report must remain formative and must not claim a curriculum level, diagnosis, or durable mastery from a small set of questions.

## Information to capture

### Learning conditions

- Whether the session was completed independently.
- Whether parent help was requested or provided.
- A short optional parent observation, kept separate from measured app data.
- Whether the learner paused and returned to the session.
- Whether a session was left unfinished.

Parent-help choices should be quick and neutral:

- No help needed
- Help understanding an instruction
- Help understanding the learning idea
- Encouragement or attention support
- Other parent note

### Accessibility and support usage

- Whether Read aloud was used.
- Whether it was used for teaching text, a reading passage, or a question.
- Which guided-practice hints were opened.
- Number of hints used, without treating support use as a penalty.

### Performance evidence

- Warm-up, guided-practice, and independent-practice accuracy shown separately.
- First-attempt answers retained rather than overwritten by retries.
- First attempt compared with later attempts on the same micro-skill.
- Time spent, pauses, and completion status, interpreted cautiously.
- Learner confidence compared with observed performance.
- Review status: first exposure, developing, secure today, review due, or confirmed in a later alternate item set.

### Curriculum connection

For every completed session, include:

- subject and strand;
- Phase 3 / Year 8 curriculum focus;
- plain-language learning intention;
- prerequisite knowledge where relevant;
- knowledge and practices sampled by the session;
- date first attempted and date most recently reviewed.

### Misconceptions and learning observations

Use deterministic misconception tags attached to particular distractors or response patterns. Examples:

- confuses hundredths and thousandths;
- uses additive rather than multiplicative reasoning for ratios;
- selects a relevant quotation but does not explain its connection to the claim;
- identifies a topic but not a complete main idea;
- chooses punctuation based on pauses rather than clause structure.

The app may report an observed pattern, but must not infer its cause or diagnose a learning difficulty.

### Representative evidence

Include a small, purposeful sample rather than every answer:

- up to two successful independent items;
- up to two items showing a useful misconception or next step;
- the original question, Sammy's selected response, the approved answer, and the feedback shown;
- no ranking or comparison with other learners.

### Recommended next steps

Generate rule-based recommendations from curriculum prerequisites and observed responses. Limit the teacher report to one or two priorities per subject, such as:

- revisit decimal place value before multiplying decimals;
- practise explaining how evidence supports an inference;
- apply paragraph cohesion in a short independent writing sample.

Recommendations must be labelled as suggestions for comparison with classroom evidence, not instructions to the teacher.

### Questions for home–school discussion

Offer optional questions derived from the evidence, for example:

- Does the same response pattern appear in classroom work?
- Is this concept currently being taught at school?
- Which prerequisite would be most useful to reinforce at home?
- Are Read aloud or similar access supports used successfully in class?

## Proposed report structure

1. **Summary of activity** — reporting period, sessions, subjects, completion, and learning conditions.
2. **Curriculum coverage** — completed micro-skills and precise Phase 3 links.
3. **Evidence of learning** — guided versus independent performance, representative responses, support used, confidence, and improvement across attempts.
4. **Strengths and developing areas** — cautious, evidence-based observations and misconception patterns.
5. **Suggested next steps** — one or two priorities per subject.
6. **Questions for discussion** — optional prompts connecting home and classroom evidence.

## Exclusions and safeguards

The report must not include:

- one overall percentage or estimated curriculum level;
- peer comparison, ranking, or predicted school grade;
- medical information or explanations for performance;
- automated learning-disability claims;
- a claim of durable mastery from one session;
- every raw response by default;
- a child email address or unnecessary identifying information.

Parent observations must be visibly labelled as observations. App-recorded evidence and rule-based interpretations must be distinguishable from parent comments.

## Data-model changes

Add the following fields while keeping older Version 1 records readable:

```text
attempt.schemaVersion
attempt.startedAt
attempt.completedAt
attempt.pausedSeconds
attempt.completionState
attempt.readAloudEvents[]
attempt.parentSupport
attempt.parentObservation
response.firstSelected
response.retryCount
response.hintOpened
response.misconceptionTag
skill.reviewStatus
skill.nextReviewDate
```

The migration must preserve all existing attempts. Missing historical fields should display as “not recorded”, never as “no support used”.

## Acceptance criteria

- Teacher report clearly separates warm-up, guided, and independent results.
- Read aloud, hints, and parent help are reported neutrally.
- Historical Version 1 and 1.1 attempts still appear without invented values.
- At least one rule-based misconception can be reported for each session where an approved distractor maps to a known misconception.
- Representative evidence is limited to four items per micro-skill.
- Recommendations are derived from explicit prerequisites and response rules.
- A teacher can identify what was taught, what was independent, and the proposed next step without opening the parent dashboard.
- Printed and PDF versions remain readable on A4 pages.
- The report contains the formative-assessment limitation and no diagnostic or curriculum-level claim.
- Parent can preview and choose whether to include optional observations before exporting.

## Validation before release

Review a sample report with Sammy's teacher and ask:

- Is the curriculum description specific enough?
- Is the independent evidence easy to distinguish from supported practice?
- Are the observations accurate and appropriately cautious?
- Are the next steps useful rather than overly prescriptive?
- What information should be removed to keep the report concise?

Revise the report from that feedback before expanding it to other families.
