# Version 1.2 backlog — reporting and learner experience

**Status:** Planned; do not implement until the Version 1.1 family trial has been reviewed.

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
