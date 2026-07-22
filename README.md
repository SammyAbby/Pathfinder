# Pathfinder — Version 1

Pathfinder is a calm, local-first learning prototype for a New Zealand Year 8 learner. Version 1.1.1 contains sixteen 15-minute micro-sessions across reading, writing, and mathematics, plus parent and teacher reporting.

## Run on a Mac mini

1. Open Terminal in this folder.
2. Run `python3 -m http.server 4173`.
3. Open `http://localhost:4173` in Safari.

No account, cloud service, API key, package installation, or internet connection is required. Progress is stored only in Safari on this Mac. To remove it, use **Parent view → Reset local progress**.

## Included

- sixteen fixed, curriculum-linked sessions: six reading, five writing, and five mathematics;
- explicit teaching, guided practice, independent practice, and confidence checks;
- immediate, specific feedback and optional read-aloud;
- controlled question variation with curated supplementary items and shuffled answer positions;
- deterministic session progression and mastery decisions;
- local-only progress history;
- student, parent, teacher-report, and detailed learner-log views;
- keyboard-friendly, reduced-motion-aware interface.

## Project documents

- [Version 1 product and educational specification](docs/version-1-specification.md)
- [Curriculum verification notes](docs/curriculum-verification.md)
- [Manual test checklist](docs/test-checklist.md)
- [Version 1.2 teacher-report backlog](docs/version-1.2-teacher-report-backlog.md)

This prototype supports practice at home. It does not diagnose learning needs, replace a teacher, or represent Ministry of Education endorsement.

## Phase 3 curriculum skills tree and current coverage

This living map records where Version 1.1 currently samples the official New Zealand Curriculum Phase 3 (Years 7–8), and where later Pathfinder sessions are still required. It is organised from the Ministry's [English Phase 3](https://newzealandcurriculum.tahurangi.education.govt.nz/nzc---english-phase-3-years-7-8/5637290836.p) and [Mathematics and Statistics Phase 3](https://newzealandcurriculum.tahurangi.education.govt.nz/nzc---mathematics-and-statistics-phase-3/5637289333.p) knowledge and practice sequences.

Coverage status:

- **[Targeted]** — a current session explicitly teaches and independently practises this micro-skill.
- **[Sampled]** — a current session touches the skill, but does not provide enough teaching or evidence to claim useful coverage.
- **[Gap]** — no current session deliberately teaches the skill; later versions need one or more sessions.

“Targeted” means coverage within a short home-learning session. It does not mean the whole curriculum expectation is mastered, assessed comprehensively, or taught at the depth of a classroom programme.

### English

```text
English — Phase 3 (Years 7–8)
├── Oral language
│   ├── Communicating and presenting
│   │   ├── Verbal reasoning and precise academic language .............. [Gap]
│   │   ├── Questioning assumptions and testing perspectives ............ [Sampled: R4, R6]
│   │   ├── Evaluative and modal language ............................... [Sampled: R4]
│   │   ├── Presentation structure for audience and purpose ............. [Gap]
│   │   ├── Evidence, quotations, and citations in presentations ........ [Gap]
│   │   ├── Counter-arguments in spoken presentations ................... [Sampled: W4]
│   │   ├── Pace, volume, tone, and vocal expression .................... [Gap]
│   │   ├── Non-verbal communication .................................... [Gap]
│   │   └── Culturally responsive oral forms and expressions ............ [Gap]
│   ├── Listening and responding
│   │   ├── Paraphrasing and clarifying others' ideas ................... [Gap]
│   │   ├── Identifying and summarising perspectives .................... [Sampled: R6]
│   │   ├── Inclusive discussion roles and turn-taking .................. [Gap]
│   │   ├── Constructive disagreement and testing logic ................. [Gap]
│   │   └── Leading and shaping group discussion ........................ [Gap]
│   └── Communication for learning
│       ├── Giving and using goal-focused feedback ...................... [Gap]
│       ├── Reflecting on strategies and progress ....................... [Sampled: confidence checks]
│       ├── Respectful and inclusive language ........................... [Sampled: W4]
│       └── Clarifying and connecting contributions ..................... [Gap]
├── Reading
│   ├── Reading enrichment
│   │   ├── Accurate, expressive reading of year-level texts ............ [Sampled: Read aloud support]
│   │   ├── Adjusting expression and intonation to text and purpose ...... [Gap]
│   │   ├── Selecting texts at an appropriate level of challenge ........ [Gap]
│   │   ├── Expanding range of independently selected texts ............. [Gap]
│   │   └── Sustained reading stamina and monitoring .................... [Gap]
│   ├── Comprehension — vocabulary
│   │   ├── Academic and content-specific vocabulary .................... [Targeted: R5]
│   │   ├── Context clues ................................................ [Targeted: R5]
│   │   ├── Roots, morphemes, prefixes, and suffixes ..................... [Targeted: R5]
│   │   ├── Word origins ................................................. [Sampled: R5]
│   │   ├── Dictionary and glossary use ................................. [Sampled: R5]
│   │   └── Pronunciation and meaning of kupu Māori ...................... [Gap]
│   ├── Comprehension — text form, structure, style, and features
│   │   ├── Forms written for different purposes ........................ [Sampled: R6]
│   │   ├── Characterisation, setting, and plot .......................... [Gap]
│   │   ├── Structural parts and their contribution to meaning .......... [Gap]
│   │   ├── Language features and audience effects ...................... [Sampled: R4, R6]
│   │   ├── Visual features and audience effects ........................ [Gap]
│   │   ├── Blended forms or multiple purposes .......................... [Gap]
│   │   ├── Media features and multimodal meaning ....................... [Gap]
│   │   └── Digital structures, navigation, and interactive features .... [Gap]
│   ├── Comprehension strategies
│   │   ├── Monitoring understanding and selecting a repair strategy .... [Sampled: hints and feedback]
│   │   ├── Identifying and summarising main ideas ...................... [Targeted: R1]
│   │   ├── Connecting supporting details to main ideas ................. [Targeted: R1]
│   │   ├── Locating and explaining explicit evidence ................... [Targeted: R2]
│   │   ├── Making and justifying inferences ............................. [Targeted: R3]
│   │   ├── Identifying themes across a whole literary text ............. [Gap]
│   │   ├── Drawing conclusions about purpose, message, or viewpoint .... [Sampled: R4, R6]
│   │   └── Comparing and synthesising ideas across texts ............... [Targeted: R6]
│   └── Critical analysis
│       ├── Author purpose and deliberate choices ....................... [Sampled: R4, R6]
│       ├── Claims, evidence, reliability, and source interests ......... [Targeted: R4]
│       ├── Representation of people, places, and ideas .................. [Sampled: R6]
│       ├── Position, perspective, tone, and influence ................... [Targeted: R6]
│       ├── Historical, social, and cultural context ..................... [Gap]
│       ├── New Zealand texts, values, and perspectives .................. [Gap]
│       ├── Included and excluded perspectives .......................... [Sampled: R6]
│       ├── Connecting texts with experience and prior knowledge ........ [Sampled: R3]
│       └── Comparing interpretations and respectfully challenging them . [Gap]
└── Writing
    ├── Transcription skills
    │   ├── Fluent, legible handwriting ................................. [Gap]
    │   ├── Fluent, accurate keyboarding ................................ [Gap]
    │   ├── Ambiguous vowel and consonant spellings ..................... [Gap]
    │   ├── Schwa in unstressed syllables ............................... [Gap]
    │   ├── Syllables and morphemes for spelling ........................ [Gap]
    │   ├── Silent letters and unusual consonant spellings .............. [Gap]
    │   ├── Advanced homophones .......................................... [Gap]
    │   ├── Prefix and suffix spelling changes .......................... [Gap]
    │   └── Chameleon prefixes ........................................... [Gap]
    ├── Composition — audience, purpose, and language choice
    │   ├── Planning for a specific audience and purpose ................ [Sampled: W4, W5]
    │   ├── Selecting form, genre, style, and mode ....................... [Gap]
    │   ├── Precise words and shades of meaning ......................... [Targeted: W3, W5]
    │   ├── Thesaurus use and checking synonym suitability .............. [Sampled: W5]
    │   ├── Personal voice and tone ...................................... [Targeted: W5]
    │   ├── Language features for deliberate effect ..................... [Targeted: W5]
    │   └── Reflecting on effectiveness for audience and purpose ........ [Sampled: W5]
    ├── Composition — sentence structures, grammar, and punctuation
    │   ├── Complete sentences and clause boundaries .................... [Targeted: W1]
    │   ├── Compound and complex sentence control ....................... [Targeted: W1]
    │   ├── Relative or adjective clauses ............................... [Sampled: W1, W3]
    │   ├── Compound-complex sentences ................................... [Gap]
    │   ├── Abstract nouns and adverbial phrases ......................... [Gap]
    │   ├── Indirect objects, predicate nouns, and adjectives ........... [Gap]
    │   ├── Participles and gerunds ...................................... [Gap]
    │   ├── Active and passive voice ..................................... [Gap]
    │   ├── Commas, semicolons, colons, and apostrophes ................. [Targeted: W1, W3]
    │   └── Punctuation for clarity and effect .......................... [Targeted: W3]
    ├── Composition — creating text types
    │   ├── Writing to narrate: setting, character, plot, and theme ...... [Gap]
    │   ├── Writing to inform: logical organisation and precise facts .... [Sampled: W2]
    │   ├── Writing to inform: headings, visuals, sources, citations ..... [Gap]
    │   ├── Writing to persuade: clear preferred position ............... [Targeted: W4]
    │   ├── Reasons, logical evidence, and trustworthy sources .......... [Targeted: W2, W4]
    │   ├── Respectful emotive language and rhetorical devices .......... [Targeted: W4, W5]
    │   ├── Opposing positions and counter-arguments .................... [Targeted: W4]
    │   └── Persuasive conclusion ........................................ [Targeted: W4]
    └── Writing processes
        ├── Purpose-specific planning and note-taking ................... [Gap]
        ├── Categorising, synthesising, and prioritising notes .......... [Gap]
        ├── Turning plans into topic sentences and sections ............. [Sampled: W2]
        ├── Paragraph structure and cohesion ............................. [Targeted: W2]
        ├── Multi-paragraph organisation ................................ [Gap]
        ├── Revising content, style, features, and tone .................. [Sampled: W3]
        ├── Editing spelling, punctuation, and formatting ............... [Targeted: W3]
        └── Requesting, evaluating, and using feedback .................. [Gap]
```

### Mathematics and Statistics

```text
Mathematics and Statistics — Phase 3 (Years 7–8)
├── Number
│   ├── Number structures and operations
│   │   ├── Whole numbers and decimals as powers of ten ................. [Targeted: M1]
│   │   ├── Positive and negative exponent notation ..................... [Targeted: M1]
│   │   ├── Expanded form using powers of ten ............................ [Targeted: M1]
│   │   ├── Prime and composite numbers ................................. [Gap]
│   │   ├── Factors, multiples, HCF, and LCM ............................. [Gap]
│   │   ├── Prime factorisation .......................................... [Gap]
│   │   ├── Squares, cubes, square roots, and cube roots ................. [Gap]
│   │   ├── Integers and negative numbers ............................... [Gap]
│   │   ├── Order of operations .......................................... [Gap]
│   │   └── Estimation, rounding, and checking reasonableness ........... [Gap]
│   ├── Rational numbers and proportional reasoning
│   │   ├── Equivalent and simplest-form fractions ...................... [Sampled: M2]
│   │   ├── Fractions, decimals, and percentages as equivalents ......... [Targeted: M2]
│   │   ├── Compare and order rational numbers .......................... [Targeted: M2]
│   │   ├── Add and subtract fractions ................................... [Gap]
│   │   ├── Multiply and divide fractions ............................... [Gap]
│   │   ├── Decimal addition and subtraction ............................. [Gap]
│   │   ├── Decimal multiplication and division ......................... [Gap]
│   │   ├── Fraction or percentage of a quantity ......................... [Gap]
│   │   ├── Find the whole from a fraction or percentage ................ [Gap]
│   │   ├── Percentage equivalence in calculations ...................... [Gap]
│   │   ├── Equivalent ratios ............................................ [Targeted: M4]
│   │   ├── Part-to-part and part-to-whole ratios ....................... [Targeted: M4]
│   │   └── Divide a quantity in a given ratio .......................... [Targeted: M4]
│   └── Financial mathematics
│       ├── New Zealand currency and cash rounding ...................... [Gap]
│       ├── Total cost and change ........................................ [Gap]
│       ├── Percentage discounts ......................................... [Gap]
│       └── Budgets and comparing financial plans ....................... [Gap]
├── Algebra
│   ├── Equations and relationships
│   │   ├── Variables as unknowns and changing quantities ............... [Targeted: M3]
│   │   ├── One- and two-step linear equations .......................... [Targeted: M3]
│   │   ├── Rational and negative solutions ............................. [Sampled: M3]
│   │   ├── Inverse operations ........................................... [Targeted: M3]
│   │   ├── Checking solutions by substitution .......................... [Targeted: M3]
│   │   ├── Linear inequalities and number-line solutions ............... [Gap]
│   │   └── Substitution into expressions and formulae .................. [Sampled: M3]
│   ├── Expressions and formulae
│   │   ├── Algebraic notation ........................................... [Sampled: M3]
│   │   ├── Collecting like terms ........................................ [Gap]
│   │   ├── Expanding single brackets .................................... [Gap]
│   │   ├── Factorising simple expressions .............................. [Gap]
│   │   └── Rearranging formulae ......................................... [Gap]
│   └── Patterns and graphs
│       ├── Coordinates in four quadrants ............................... [Gap]
│       ├── Linear patterns and rules .................................... [Gap]
│       ├── Tables, diagrams, and coordinate graphs ..................... [Gap]
│       └── Generalising and testing conjectures ........................ [Gap]
├── Measurement
│   ├── Selecting and converting metric units ........................... [Gap]
│   ├── Area units and area conversions ................................. [Gap]
│   ├── Volume, capacity, and their conversions ......................... [Gap]
│   ├── Perimeter and area of composite shapes .......................... [Gap]
│   ├── Volume and surface area .......................................... [Gap]
│   ├── Time, duration, and timetables ................................... [Gap]
│   └── Estimation, measurement accuracy, and reasonableness ............ [Gap]
├── Geometry
│   ├── Shape properties
│   │   ├── Triangles classified by sides and angles .................... [Gap]
│   │   ├── Circle radius, diameter, circumference, and area ............ [Gap]
│   │   ├── Angle relationships: complementary and supplementary ........ [Gap]
│   │   ├── Vertical, adjacent, and transversal angles .................. [Gap]
│   │   └── Interior and exterior angles of polygons .................... [Gap]
│   ├── Transformation and spatial reasoning
│   │   ├── Reflection, rotation, translation, and enlargement .......... [Gap]
│   │   ├── Symmetry and invariant properties ........................... [Gap]
│   │   └── Similarity and scale ......................................... [Gap]
│   └── Position and pathways
│       ├── Coordinates and grid references ............................. [Gap]
│       ├── Compass points, bearings, distance, and turn ................ [Gap]
│       └── Map scales ................................................... [Gap]
├── Statistics
│   ├── Statistical enquiry
│   │   ├── Investigative questions, variables, and populations ......... [Sampled: M5]
│   │   ├── Categorical, discrete, and continuous variables ............. [Gap]
│   │   └── Planning and collecting primary data ........................ [Gap]
│   ├── Developing knowledge from data
│   │   ├── Mean, median, and mode ........................................ [Targeted: M5]
│   │   ├── Range as a measure of spread ................................ [Targeted: M5]
│   │   └── Choosing an appropriate summary in context .................. [Targeted: M5]
│   ├── Visualisation of data
│   │   ├── Dot plots and bar graphs ..................................... [Gap]
│   │   ├── Stacked and clustered bar graphs ............................ [Gap]
│   │   ├── Time-series graphs ........................................... [Gap]
│   │   ├── Selecting and constructing an appropriate display .......... [Gap]
│   │   └── Titles, axes, scales, units, frequency, and proportion ...... [Sampled: M5]
│   └── Interpretation of data
│       ├── Contextual findings supported by evidence ................... [Targeted: M5]
│       ├── Distribution shape, centre, spread, and trends ............... [Sampled: M5]
│       ├── Outliers and their effect on mean, median, and range ......... [Targeted: M5]
│       ├── Misleading or incomplete data visualisations ................ [Targeted: M5]
│       └── Contemporary media data claims ............................... [Sampled: R4, M5]
└── Probability
    ├── Experimental probability
    │   ├── Designing and carrying out repeated trials .................. [Gap]
    │   ├── Relative frequency ........................................... [Gap]
    │   ├── Comparing experimental and theoretical probability .......... [Gap]
    │   └── Law of Large Numbers ......................................... [Gap]
    └── Theoretical probability
        ├── Sample spaces using lists, tables, and tree diagrams ......... [Gap]
        ├── Equally likely outcomes ...................................... [Gap]
        ├── Probability as fraction, decimal, and percentage ............ [Gap]
        ├── Combined events ............................................... [Gap]
        └── Complementary events ......................................... [Gap]
```

### Coverage summary and later-version priorities

The current sixteen sessions deliberately concentrate on high-leverage reading comprehension, controlled writing, rational-number reasoning, introductory algebra, ratio, and statistical interpretation. The largest documented gaps are:

1. oral language and collaborative discussion;
2. sustained reading, literature, text structure, and multimodal texts;
3. spelling, extended narrative and informative writing, planning, and multi-paragraph composition;
4. number properties, fraction and decimal operations, finance, expressions, and patterns;
5. measurement and geometry;
6. statistical enquiry and constructing data displays;
7. probability.

Future content should be prioritised using Sammy's demonstrated prerequisites, school feedback, and the balance required across this tree. New sessions must update this map in the same commit as their lesson content so that curriculum coverage remains auditable.
