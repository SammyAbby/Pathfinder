const v = (id, phase, prompt, options, answer, feedback, hint = "", passage = "") => ({ id, phase, prompt, options, answer, feedback, hint, passage });

// Curated supplementary items widen each phase pool. The engine favours items
// not used in the latest attempt and shuffles option positions on every run.
export const extraQuestions = {
  R1:[
    v("R1-V1","Warm-up","Which choice is a complete main idea rather than only a topic?",["Community gardens","Community gardens can strengthen neighbourhood connections","Vegetables"],1,"A main idea makes a complete statement about the topic."),
    v("R1-V2","Guided","What is the paragraph mainly explaining?",["Why volunteers monitor stream health","Why all insects are harmful","How to build a bridge"],0,"Every detail describes volunteers gathering evidence about stream health.","Choose the idea that connects all the actions.","Each month, volunteers test the Waiora Stream's temperature and clarity. They photograph insects living under stones and record rubbish found along the banks. The results help the community notice changes and decide where restoration work is needed."),
    v("R1-V3","Independent","Which summary best captures the paragraph?",["Monthly evidence helps a community track and respond to stream health","Volunteers visit only to take photographs","The stream has no environmental problems"],0,"It includes the monitoring and its purpose without adding unsupported claims.")],
  M1:[
    v("M1-V1","Warm-up","What is the value of the 9 in 2.094?",["0.9","0.09","0.009"],1,"The 9 is in the hundredths place, so its value is 0.09."),
    v("M1-V2","Guided","Which expanded form represents 7.406?",["7×10⁰ + 4×10⁻¹ + 6×10⁻³","7×10⁰ + 4×10⁻² + 6×10⁻³","7×10¹ + 4×10⁻¹ + 6×10⁻²"],0,"There are 7 ones, 4 tenths, 0 hundredths, and 6 thousandths.","Match each non-zero digit to its place."),
    v("M1-V3","Independent","Which comparison is true?",["5.071 > 5.17","0.909 < 0.91","3.400 < 3.4"],1,"0.909 is less than 0.910; trailing zeros do not change value.")],
  W1:[
    v("W1-V1","Warm-up","Which option is a sentence fragment?",["The wind shifted after lunch.","When the wind shifted.","We lowered the sail."],1,"The dependent clause does not complete the thought."),
    v("W1-V2","Guided","Choose the clearest repair: “The lights went out, the audience waited quietly.”",["The lights went out, so the audience waited quietly.","The lights, the audience quietly.","Because the lights went out."],0,"The conjunction clearly joins two complete, related ideas.","A comma alone cannot join both clauses."),
    v("W1-V3","Independent","Which sentence is complete and correctly joined?",["Although the road was closed.","The road was closed; we followed the marked detour.","The road closed, the detour."],1,"The semicolon correctly joins two complete related clauses.")],
  R2:[
    v("R2-V1","Warm-up","Which is the strongest evidence for a claim about increased library use?",["Monthly entry counts before and after the change","A poster saying the library is popular","The librarian's favourite book"],0,"Repeated counts directly measure whether use increased."),
    v("R2-V2","Guided","Which detail best supports the claim that the team tested fairly?",["Every material received the same volume of water","The team liked one material best","The table was beside a window"],0,"Keeping the water volume constant supports a fair comparison.","Look for a controlled condition.","The team cut equal-sized squares from four materials. Each square received 50 millilitres of water, and the team measured how much passed through after one minute. They repeated every test three times."),
    v("R2-V3","Independent","Why does repeating each test strengthen the evidence?",["It checks whether the result is consistent","It guarantees the preferred material wins","It changes the research question"],0,"Repeated trials help reveal whether a result is dependable.")],
  M2:[
    v("M2-V1","Warm-up","What percentage means 9 out of 20?",["9%","45%","90%"],1,"9/20 = 45/100 = 45%."),
    v("M2-V2","Guided","Which decimal equals 7/8?",["0.78","0.875","0.625"],1,"Seven divided by eight is 0.875.","Use a known equivalence or divide 7 by 8."),
    v("M2-V3","Independent","Which value is greatest?",["0.72","7/10","71%"],0,"0.72 is 72%, greater than 71% and 70%.")],
  W2:[
    v("W2-V1","Warm-up","Which connector signals a result?",["Consequently","However","For example"],0,"“Consequently” introduces a result or consequence."),
    v("W2-V2","Guided","Which topic sentence best controls details about insulation, curtains, and draught-stopping?",["Three low-cost changes could make the classroom warmer in winter.","Winter follows autumn.","Curtains come in many colours."],0,"It covers all three practical details and their shared purpose.","Choose the sentence broad enough for every detail."),
    v("W2-V3","Independent","Which explanation best follows evidence that the room loses heat through gaps?",["Sealing the gaps would reduce heat loss and make heating more efficient.","Gaps can be measured in millimetres.","The room also has posters."],0,"It explains why the evidence matters to the paragraph's main idea.")],
  R3:[
    v("R3-V1","Warm-up","Which phrase reports an inference with suitable caution?",["The clues suggest…","This certainly proves…","The sentence directly states…"],0,"“Suggest” matches a conclusion supported but not directly stated."),
    v("R3-V2","Guided","What can be reasonably inferred about Aroha?",["She expects the track may be difficult","She has already finished the walk","She dislikes the group"],0,"Checking the map, tightening her laces, and packing an extra layer suggest preparation for challenge.","Combine several preparation clues.","Aroha studied the steep section marked on the map, tightened her boot laces, and moved an extra layer to the top of her pack. She checked that the group had enough water before they left."),
    v("R3-V3","Independent","Which clue most strongly supports that inference?",["She prepares footwear, clothing, water, and route information","She owns a map","The group is leaving"],0,"The combined preparation actions provide the strongest evidence.")],
  M3:[
    v("M3-V1","Warm-up","Which value makes 2x + 1 = 11 true?",["x=5","x=6","x=10"],0,"2×5 + 1 = 11."),
    v("M3-V2","Guided","Solve 6p − 4 = 20.",["p=4","p=16/6","p=24"],0,"Add 4 to get 6p=24, then divide by 6.","Undo subtraction before multiplication."),
    v("M3-V3","Independent","A hire costs $7 plus $4 per hour. The total is $31. How many hours?",["6","8","9.5"],0,"4h+7=31, so 4h=24 and h=6.")],
  W3:[
    v("W3-V1","Warm-up","Which verb is most precise for speaking very quietly?",["murmured","said","announced"],0,"“Murmured” communicates quiet speech precisely."),
    v("W3-V2","Guided","Choose the best edit: “The results were bad they changed a lot.”",["The results were inconsistent: readings varied by up to 12 degrees.","The results were bad, they changed.","Bad results and changing."],0,"It repairs the boundary and replaces vague language with measurable detail.","Improve both correctness and precision."),
    v("W3-V3","Independent","Which sentence uses punctuation correctly?",["The samples however were contaminated.","The samples, however, were contaminated.","The samples however, were contaminated."],1,"Paired commas correctly mark the interrupting word.")],
  R4:[
    v("R4-V1","Warm-up","Which source is most independent when evaluating a company's product claim?",["A university study with declared funding and published methods","The company's advertisement","An unnamed online review"],0,"Transparent methods and declared interests make evaluation possible."),
    v("R4-V2","Guided","What is the largest weakness in the claim?",["Only eight self-selected customers were surveyed","The survey used numbered questions","The report includes a date"],0,"A tiny self-selected sample may not represent typical customers.","Consider sample size and who chose to respond.","A café claims “Everyone prefers our new menu” after eight customers responded to an optional online poll. Seven selected “better”, and one selected “about the same”."),
    v("R4-V3","Independent","Which conclusion best matches the evidence?",["Most respondents in this small poll preferred the new menu","Everyone prefers the menu","The menu caused sales to rise"],0,"It reports exactly what the limited evidence supports.")],
  R5:[
    v("R5-V1","Warm-up","What does the prefix anti– usually mean?",["against","before","between"],0,"Anti– means against or opposed to."),
    v("R5-V2","Guided","In “The translucent panel allowed a soft glow through”, translucent most likely means…",["letting some light through","completely opaque","making a loud sound"],0,"The phrase “allowed a soft glow through” gives the contextual meaning.","Use the result described after the word."),
    v("R5-V3","Independent","If geo means earth and thermal means heat, geothermal energy comes from…",["heat within the Earth","wind above the sea","light from the Moon"],0,"The two roots combine to mean Earth heat.")],
  R6:[
    v("R6-V1","Warm-up","Which word most clearly signals a critical tone?",["wasteful","scheduled","annual"],0,"“Wasteful” communicates a negative judgement."),
    v("R6-V2","Guided","How do the texts differ?",["Text A stresses recreation; Text B stresses habitat protection","Both demand unrestricted access","Neither expresses a perspective"],0,"Each text foregrounds a different value connected with the same coast.","Identify what each wants protected.","Text A — Recreation group: “A marked coastal route would let more families enjoy the headland safely.”\n\nText B — Restoration group: “More foot traffic could disturb nesting areas unless seasonal closures protect vulnerable birds.”"),
    v("R6-V3","Independent","Which proposal responds to both perspectives?",["A marked route with seasonal closures near nests","Ban all visitors permanently","Ignore the nesting evidence"],0,"It combines safer access with protection during vulnerable periods.")],
  W4:[
    v("W4-V1","Warm-up","Which sentence acknowledges an opposing view?",["Some people reasonably worry about the supervision cost.","My position is obvious.","There is no other view."],0,"It represents a concern respectfully before responding."),
    v("W4-V2","Guided","Which evidence best supports later library opening?",["A four-week trial recorded 25–34 student visits each afternoon","Libraries contain shelves","One student likes novels"],0,"Repeated attendance data directly measure likely use.","Prefer relevant evidence collected over time."),
    v("W4-V3","Independent","Which response best addresses staffing concerns?",["Trial two afternoons with a rotating roster and review demand","Staffing does not matter","Anyone who disagrees dislikes reading"],0,"It proposes a limited, testable response to the concern.")],
  W5:[
    v("W5-V1","Warm-up","Which verb means to walk slowly without urgency?",["strolled","sprinted","charged"],0,"“Strolled” conveys relaxed, unhurried movement."),
    v("W5-V2","Guided","Which sentence suits a factual science report?",["The solution changed from clear to pale blue after 40 seconds.","The solution did a really cool thing.","It was unbelievably magical."],0,"It uses observable, precise language and a measured time.","Match the word choice to an evidence-based purpose."),
    v("W5-V3","Independent","Which revision creates the strongest responsible impact?",["The survey found that 18 of 24 respondents supported the change.","Literally everyone demands it.","Some people maybe liked it heaps."],0,"It gives precise evidence without exaggeration.")],
  M4:[
    v("M4-V1","Warm-up","Which ratio is equivalent to 3:7?",["6:14","6:10","9:14"],0,"Multiplying both parts by 2 gives 6:14."),
    v("M4-V2","Guided","Green:gold flags = 4:5. There are 45 flags. How many are gold?",["25","20","9"],0,"Nine total parts means 5 per part; 5×5=25 gold flags.","Find the value of one of the nine total parts."),
    v("M4-V3","Independent","Share $84 in the ratio 2:5. What is the smaller share?",["$24","$60","$12"],0,"Seven parts means $12 per part; 2×$12=$24.")],
  M5:[
    v("M5-V1","Warm-up","What is the range of 8, 9, 12, 15, 19?",["11","12.6","19"],0,"Range = 19−8 = 11."),
    v("M5-V2","Guided","For 7, 8, 8, 9, 43, which measure best describes a typical value?",["Median 8","Mean 15","Range 36"],0,"The outlier 43 pulls the mean upward; the median stays near the cluster.","Look for the value far from the others."),
    v("M5-V3","Independent","A graph has bars but no units on its vertical axis. What can you conclude?",["The quantities cannot be interpreted accurately","The largest bar must be 100","The graph proves a trend"],0,"Without units, the numerical meaning of the bar heights is unclear.")]
};
