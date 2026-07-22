# Version 1.2 backlog — teacher reporting

**Status:** Planned; do not implement until the Version 1.1 family trial has been reviewed.

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
