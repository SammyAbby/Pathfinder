const q = (id, phase, prompt, options, answer, feedback, hint = "", passage = "") => ({ id, phase, prompt, options, answer, feedback, hint, passage });

export const sessions = [
  {
    id:"R1", subject:"Reading", title:"Find the main idea", intention:"I can identify the main idea and the details that support it.",
    teach:"The main idea is the most important point a writer wants you to understand. Details support it. Ask: What idea connects most of the sentences?",
    example:"Text: The new wetland holds stormwater, gives native birds a place to feed, and lets classes study insects.\nMain idea: The wetland benefits both the environment and the school. Each detail fits that one idea.",
    questions:[
      q("R1-1","Warm-up","Which choice is a topic rather than a complete main idea?",["Keas","Keas use clever strategies to find food","Young keas learn by watching others"],0,"A topic names the subject. A main idea says something important about it."),
      q("R1-2","Warm-up","Which detail best supports the idea “Sleep helps learning”?",["Some pillows are blue","Sleep helps the brain organise new memories","Many people read at night"],1,"That detail explains how sleep supports learning."),
      q("R1-3","Guided","What is the paragraph mainly saying?",["The library now lends tools as well as books","Drills are noisy","People should buy fewer books"],0,"Yes. The examples all show how the library of things helps neighbours borrow useful items.","Look for the choice that covers every example.","A local library has begun lending sewing machines, drills, and gardening tools. Members can borrow items for a week, just as they borrow books. Organisers say the scheme saves families money and keeps rarely used items from being thrown away."),
      q("R1-4","Guided","Which detail most directly supports that main idea?",["Items can be borrowed for a week","The building has large windows","Books have call numbers"],0,"The one-week borrowing rule directly explains how the new service works.","Choose information stated in the paragraph."),
      q("R1-5","Guided","Which would be the weakest title?",["More Than Books","A Library of Useful Things","How to Repair a Drill"],2,"Right. The paragraph does not teach drill repair.","A good title matches the whole paragraph."),
      q("R1-6","Independent","What is the main idea?",["Students dislike lunchtime","A student-run repair table reduces waste and builds practical skills","Zips are the hardest things to repair"],1,"The paragraph connects waste reduction with students learning practical skills.","","Every Thursday, students at Rimu Intermediate bring broken lunchboxes, loose bag straps, and torn pencil cases to a repair table. Older students, guided by a technology teacher, fix what they can. The table has kept dozens of items out of the rubbish and taught students how everyday objects are made."),
      q("R1-7","Independent","Which detail best supports the skill-building part of the main idea?",["The table runs on Thursday","Students learn how everyday objects are made","Students bring lunchboxes"],1,"That detail directly shows learning, not just waste reduction."),
      q("R1-8","Independent","Which summary is most accurate?",["A weekly school repair project helps objects last longer while students learn","A teacher repairs every student's belongings","The school has banned new pencil cases"],0,"This keeps both central ideas without adding unsupported information.")]
  },
  {
    id:"M1", subject:"Maths", title:"Decimals and powers of ten", intention:"I can explain decimal place value using powers of ten.",
    teach:"Each step right on a place-value chart divides by 10. Ones are 10⁰, tenths are 10⁻¹, and hundredths are 10⁻². In 3.61, the 6 means 6 × 10⁻¹.",
    example:"3.61 = 3 × 10⁰ + 6 × 10⁻¹ + 1 × 10⁻² = 3 + 0.6 + 0.01",
    questions:[
      q("M1-1","Warm-up","What is the value of the 7 in 4.72?",["7","0.7","0.07"],1,"The 7 is in the tenths place, so its value is 0.7."),
      q("M1-2","Warm-up","Which number is greatest?",["0.62","0.602","0.6"],0,"0.620 is greater than 0.602 and 0.600."),
      q("M1-3","Guided","Which power of ten represents one hundredth?",["10²","10⁻¹","10⁻²"],2,"Yes. Moving two places right from ones means dividing by 10 twice.","A negative exponent tells how many times to divide 1 by 10."),
      q("M1-4","Guided","Which is the correct expanded form of 5.08?",["5 × 10⁰ + 8 × 10⁻²","5 × 10¹ + 8 × 10⁻¹","5 × 10⁰ + 8 × 10⁻¹"],0,"There are 5 ones, 0 tenths, and 8 hundredths.","Check the position of the 8."),
      q("M1-5","Guided","What decimal equals 4 × 10⁻¹ + 7 × 10⁻²?",["0.47","4.7","0.407"],0,"Four tenths plus seven hundredths is 0.47.","Write 0.4 + 0.07."),
      q("M1-6","Independent","What is 10⁻³ as a decimal?",["0.001","0.01","1000"],0,"10⁻³ is one thousandth, or 0.001."),
      q("M1-7","Independent","Which expanded form represents 12.305?",["1×10¹ + 2×10⁰ + 3×10⁻¹ + 5×10⁻³","1×10¹ + 2×10⁰ + 3×10⁻² + 5×10⁻³","12×10⁰ + 305×10⁻¹"],0,"12.305 has 3 tenths, 0 hundredths, and 5 thousandths."),
      q("M1-8","Independent","Which comparison is true?",["4.09 > 4.9","0.508 < 0.58","2.070 < 2.07"],1,"0.508 is less than 0.580. Trailing zeros do not change a decimal's value.")]
  },
  {
    id:"W1", subject:"Writing", title:"Build controlled sentences", intention:"I can recognise complete sentences and improve how clauses are joined.",
    teach:"A complete sentence expresses a whole thought and normally has a subject and a finite verb. Join closely related ideas with punctuation and a suitable conjunction; do not use a comma alone between two complete sentences.",
    example:"Fragment: Because the track was flooded.\nComplete: We changed our route because the track was flooded.\nComma splice: The rain stopped, we left.\nImproved: The rain stopped, so we left.",
    questions:[
      q("W1-1","Warm-up","Which is a complete sentence?",["Across the dark harbour.","The ferry crossed the dark harbour.","While the ferry crossed."],1,"It has a subject, a verb, and a complete thought."),
      q("W1-2","Warm-up","Which word is the verb in “Mere carefully folded the map”?",["Mere","carefully","folded"],2,"“Folded” tells what Mere did."),
      q("W1-3","Guided","Choose the best repair: “The gate was locked, we used the side entrance.”",["The gate was locked, so we used the side entrance.","The gate locked, the side entrance.","Because the gate was locked."],0,"“So” clearly joins the cause and result.","Both original parts can stand alone. Join them clearly."),
      q("W1-4","Guided","Which ending completes the thought “Although the forecast looked clear…”?",["before lunch.","we packed raincoats.","and the blue sky."],1,"The dependent opening now connects to a complete main clause.","Ask what happened although the forecast looked clear."),
      q("W1-5","Guided","Which sentence varies the opening while staying clear?",["The cyclist checked the tyre before the race.","Before the race, the cyclist checked the tyre.","Before the race the cyclist and the tyre."],1,"The time phrase creates a controlled opening, followed by a complete clause.","Look for a complete thought after the comma."),
      q("W1-6","Independent","Which sentence has a comma splice?",["I saved the file, but the screen froze.","I saved the file, the screen froze.","After I saved the file, the screen froze."],1,"A comma alone incorrectly joins two complete sentences."),
      q("W1-7","Independent","Choose the clearest sentence.",["The dog that lives next door, it barked all night.","The dog next door barked all night.","The dog next door, barking all night."],1,"It expresses the full idea without repetition or a fragment."),
      q("W1-8","Independent","Which punctuation best completes this sentence? “The tide was rising ___ therefore, we turned back.”",[";","'",":"],0,"A semicolon can join the related complete clauses before the linking adverb “therefore”.")]
  },
  {
    id:"R2", subject:"Reading", title:"Use explicit evidence", intention:"I can select evidence and explain what it proves.",
    teach:"Evidence is information in the text that supports a claim. Strong evidence is relevant and specific. First identify the claim, then find the sentence that most directly supports it.",
    example:"Claim: The organisers planned for wet weather.\nEvidence: “They booked the hall as a backup venue.”\nLink: A backup indoor venue shows they prepared for rain.",
    questions:[
      q("R2-1","Warm-up","What is evidence?",["A guess about the writer","Information that supports a claim","Any long sentence"],1,"Evidence supports or challenges a claim."),
      q("R2-2","Warm-up","Which phrase introduces an explanation?",["This shows that…","Long ago…","Perhaps…"],0,"“This shows that” helps link evidence to a conclusion."),
      q("R2-3","Guided","Which detail best supports the claim that the group prepared carefully?",["They checked every borrowed trap and recorded its location","The reserve has tall trees","The group met on Saturday"],0,"Checking and recording equipment is direct evidence of careful preparation.","Choose an action that demonstrates care.","Before entering the reserve, the conservation group checked every borrowed trap and recorded its location. They carried spare batteries, printed maps, and a first-aid kit. At the end of the day, the leader counted everyone before the group left."),
      q("R2-4","Guided","Which claim is best supported by the final sentence?",["The leader valued safety","The group caught many pests","Everyone enjoyed the trip"],0,"Counting everyone before leaving is a safety check.","Do not add a result or feeling the text never states."),
      q("R2-5","Guided","Which explanation makes the strongest link?",["The maps were printed, and maps are paper.","Spare batteries and maps show the group planned for equipment failure or losing direction.","They probably go there every weekend."],1,"It explains exactly how two details support preparedness.","Use only what the evidence reasonably allows."),
      q("R2-6","Independent","Which evidence best supports the claim that Hana persisted?",["Hana entered a coding challenge","Her first design failed, so she tested three changes and tried again","The final was on Friday"],1,"Testing changes after failure directly demonstrates persistence.","","Hana's first sensor design failed during testing. She wrote down what happened, changed the wire placement, and tested it again. After three changes, the sensor reliably detected when the plant's soil was dry."),
      q("R2-7","Independent","What does “wrote down what happened” most strongly show?",["She used evidence to guide changes","She disliked the project","She had perfect handwriting"],0,"Recording results supports systematic problem solving."),
      q("R2-8","Independent","Which conclusion is not supported?",["The first design did not work","Hana improved the sensor through testing","Hana won the coding challenge"],2,"The text never gives the competition result.")]
  },
  {
    id:"M2", subject:"Maths", title:"Fractions, decimals, percentages", intention:"I can move between equivalent fractions, decimals, and percentages.",
    teach:"Fractions, decimals, and percentages can name the same part of a whole. Percent means “out of 100”. Convert a decimal to a percentage by finding the equivalent number of hundredths.",
    example:"3/5 = 60/100 = 0.6 = 60%. Multiplying 3/5 by 20/20 creates hundredths without changing its value.",
    questions:[
      q("M2-1","Warm-up","What does 25% mean?",["25 out of 10","25 out of 100","One out of 25"],1,"Percent means per hundred."),
      q("M2-2","Warm-up","Which fraction equals one half?",["5/10","1/3","50/10"],0,"5/10 simplifies to 1/2."),
      q("M2-3","Guided","What percentage equals 0.35?",["3.5%","35%","350%"],1,"0.35 is 35 hundredths, so it is 35%.","Read the decimal as hundredths."),
      q("M2-4","Guided","What decimal equals 7/10?",["0.07","0.7","7.0"],1,"Seven tenths is written 0.7.","The denominator tells the decimal place."),
      q("M2-5","Guided","What percentage equals 3/4?",["34%","43%","75%"],2,"3/4 = 75/100, so it is 75%.","Multiply numerator and denominator by 25."),
      q("M2-6","Independent","Which set contains three equivalent values?",["2/5, 0.4, 40%","1/5, 0.5, 5%","3/4, 0.34, 75%"],0,"2/5 = 4/10 = 0.4 = 40%."),
      q("M2-7","Independent","A battery is 0.82 charged. What percentage is that?",["8.2%","82%","820%"],1,"0.82 is 82 hundredths, or 82%."),
      q("M2-8","Independent","Which is greatest?",["3/5","0.58","59%"],0,"3/5 = 0.60 = 60%, which is greater than 59% and 58%.")]
  },
  {
    id:"W2", subject:"Writing", title:"Shape a clear paragraph", intention:"I can organise a paragraph around one controlling idea.",
    teach:"A clear paragraph usually has a topic sentence, supporting detail or evidence, explanation, and a closing link. Cohesive words show how ideas connect; they should clarify the logic, not decorate it.",
    example:"Topic: Our school should add a sheltered bike stand.\nEvidence: Forty-two students cycle, but the current rack is uncovered.\nExplanation: Dry storage would protect bikes and encourage active travel.\nLink: A shelter is a practical improvement with benefits beyond wet seats.",
    questions:[
      q("W2-1","Warm-up","What is the job of a topic sentence?",["Introduce the paragraph's controlling idea","Add an unrelated fact","Repeat every detail"],0,"It tells the reader what the paragraph will develop."),
      q("W2-2","Warm-up","Which connector normally signals contrast?",["For example","However","Therefore"],1,"“However” introduces a contrast."),
      q("W2-3","Guided","Choose the best topic sentence for details about shade, seating, and drinking water at a skate park.",["Skateboards have four wheels.","Three practical changes would make the skate park safer and more welcoming.","My friend likes skating."],1,"It controls all three supporting details.","Choose the sentence broad enough to cover every detail."),
      q("W2-4","Guided","Which detail best supports that topic sentence?",["A shaded bench would give people a safe place to rest on hot days.","Some helmets are black.","The park opened in 2014."],0,"The shaded bench directly develops safety and welcome.","Ask whether the detail proves the paragraph's main point."),
      q("W2-5","Guided","Which explanation should follow “The nearest fountain is 600 metres away”? ",["This matters because easy access to water reduces heat risk during exercise.","Six hundred is an even number.","Anyway, skating is fun."],0,"It explains why the evidence matters.","Use the sentence that links the fact to safety."),
      q("W2-6","Independent","Which order is most logical?",["Evidence → topic → unrelated fact → link","Topic → evidence → explanation → link","Link → explanation → topic → title"],1,"The paragraph announces, supports, explains, and closes its idea."),
      q("W2-7","Independent","Choose the best connector: “The court is popular. ___, it has no lighting for winter afternoons.”",["For example","However","Similarly"],1,"The second idea contrasts popularity with a limitation."),
      q("W2-8","Independent","Which closing sentence best links the paragraph?",["That is all I know about courts.","Lighting would therefore make an already valued space usable more safely throughout the year.","Winter is one of four seasons."],1,"It returns to the controlling idea and draws a justified conclusion.")]
  },
  {
    id:"R3", subject:"Reading", title:"Make a supported inference", intention:"I can combine text clues with what I know to infer meaning.",
    teach:"An inference is a conclusion the writer suggests rather than states directly. Combine at least two clues with relevant knowledge, then check that your conclusion does not go beyond the evidence.",
    example:"Clues: Ari checks the clock twice, packs before the bell, and waits by the door.\nInference: Ari is eager or anxious to leave. We cannot conclude why without more evidence.",
    questions:[
      q("R3-1","Warm-up","Which statement describes an inference?",["A copied sentence","A conclusion built from clues","A fact from outside the text"],1,"An inference combines textual clues with relevant knowledge."),
      q("R3-2","Warm-up","Which word signals uncertainty appropriately?",["Definitely","Likely","Proves"],1,"“Likely” shows the conclusion is reasonable but not certain."),
      q("R3-3","Guided","What can you reasonably infer about Wiremu?",["He is preparing carefully for changing weather","He has never visited the coast","He dislikes his aunt"],0,"The layers and waterproof cover suggest preparation for uncertain conditions.","Combine the clothing and bag-cover clues.","Wiremu looked at the clouds, added a warm layer, and tightened the waterproof cover over his pack. His aunt raised an eyebrow, but he pointed towards the dark line gathering above the hills."),
      q("R3-4","Guided","Which two clues best support that inference?",["His aunt is present and he has a pack","He looks at clouds and adds weather protection","There are hills and an eyebrow"],1,"Those actions directly relate to approaching weather.","Select clues with the strongest logical link."),
      q("R3-5","Guided","What is probably communicated by the aunt raising an eyebrow?",["She notices or questions his preparation","She cannot see the hills","She demands he stay home"],0,"The gesture likely signals notice or mild questioning; stronger claims are unsupported.","Choose the cautious inference."),
      q("R3-6","Independent","What can you infer about Leila?",["She wants to avoid waking someone","She has lost her shoes","She is late for school"],0,"Quiet actions and avoiding the creaking board suggest she does not want to wake someone.","","Leila eased the door shut with both hands. She carried her shoes down the hallway and stepped over the floorboard that always creaked. Only when she reached the porch did she put the shoes on."),
      q("R3-7","Independent","Which clue is strongest?",["She has two hands","She steps over the creaking floorboard","The house has a porch"],1,"Avoiding a known noise is the clearest evidence."),
      q("R3-8","Independent","Which conclusion goes beyond the evidence?",["Leila is moving quietly","Someone may be asleep","Leila is secretly travelling overseas"],2,"The text gives no evidence about overseas travel.")]
  },
  {
    id:"M3", subject:"Maths", title:"Solve equations", intention:"I can form and solve one- and two-step equations using inverse operations.",
    teach:"An equation says two expressions have equal value. Undo operations in reverse order and do the same thing to both sides. Check by substituting the solution into the original equation.",
    example:"5x + 3 = 18\nSubtract 3: 5x = 15\nDivide by 5: x = 3\nCheck: 5×3 + 3 = 18.",
    questions:[
      q("M3-1","Warm-up","What operation undoes +7?",["+7","−7","÷7"],1,"Subtraction by 7 is the inverse of addition by 7."),
      q("M3-2","Warm-up","Which value makes x + 4 = 9 true?",["5","13","36"],0,"5 + 4 = 9."),
      q("M3-3","Guided","Solve 3x = 21.",["x = 7","x = 18","x = 63"],0,"Divide both sides by 3 to get x = 7.","Undo multiplication by 3."),
      q("M3-4","Guided","What should you do first to solve 4x + 5 = 17?",["Divide by 4","Subtract 5 from both sides","Add 5 to both sides"],1,"Undo the final +5 first, leaving 4x = 12.","Reverse the order of operations."),
      q("M3-5","Guided","Solve 4x + 5 = 17.",["x = 3","x = 5.5","x = 12"],0,"Subtract 5, then divide 12 by 4. Check: 4×3+5=17.","After subtracting 5, solve 4x = 12."),
      q("M3-6","Independent","Solve 2y − 6 = 10.",["y = 2","y = 8","y = 32"],1,"Add 6 to get 2y = 16, then divide by 2."),
      q("M3-7","Independent","A club charges $4 entry plus $3 per game. The total is $19. Which equation represents the number g of games?",["4g + 3 = 19","3g + 4 = 19","3 + 4 + g = 19"],1,"The variable cost is 3 per game, plus the fixed $4 entry."),
      q("M3-8","Independent","Solve 3g + 4 = 19.",["g = 5","g = 7.67","g = 15"],0,"Subtract 4 to get 15, then divide by 3. Five games cost $15 plus $4 entry.")]
  },
  {
    id:"W3", subject:"Writing", title:"Edit for precision", intention:"I can edit punctuation, sentence boundaries, and vague wording.",
    teach:"Editing improves meaning, not just surface correctness. Check one layer at a time: sentence boundaries, punctuation, then precise words. Replace vague words only when the new word says exactly what you mean.",
    example:"Draft: The machine was good it did things quickly.\nEdited: The updated machine sorted the samples accurately and in half the time.\nThe revision repairs the boundary and replaces vague claims with specific evidence.",
    questions:[
      q("W3-1","Warm-up","Which word is most precise for moving quietly?",["went","crept","did"],1,"“Crept” gives a specific manner of movement."),
      q("W3-2","Warm-up","Which mark ends a direct question?",["?",";",":"],0,"A direct question ends with a question mark."),
      q("W3-3","Guided","Choose the best edit: “The experiment was good it worked.”",["The experiment was good, it worked.","The experiment succeeded: all three seeds germinated.","The experiment, good and working."],1,"It repairs the sentence boundary and replaces “good” with measurable evidence.","Look for both correctness and precision."),
      q("W3-4","Guided","Which sentence punctuates the extra information correctly?",["My uncle who lives in Nelson builds kayaks.","My uncle, who lives in Nelson, builds kayaks.","My uncle who, lives in Nelson builds kayaks."],1,"The paired commas mark the added information cleanly.","The sentence still makes sense without the middle phrase."),
      q("W3-5","Guided","Replace “said loudly” with the most precise verb in an emergency.",["mentioned","shouted","spoke"],1,"“Shouted” communicates both speaking and high volume.","Choose the verb that carries the adverb's meaning."),
      q("W3-6","Independent","Which edit fixes the run-on?",["The bus arrived we climbed aboard.","The bus arrived; we climbed aboard.","The bus, arrived we climbed aboard."],1,"The semicolon correctly separates two related complete clauses."),
      q("W3-7","Independent","Which sentence is clearest?",["The thing affected stuff in a big way.","The storm closed three coastal roads overnight.","It was really very impactful."],1,"It names the event, action, quantity, place, and time precisely."),
      q("W3-8","Independent","Which sentence uses the apostrophe correctly?",["The students projects filled the hall.","The student's projects filled the hall.","The students' projects filled the hall."],2,"The projects belong to multiple students, so the apostrophe follows the plural s.")]
  },
  {
    id:"R4", subject:"Reading", title:"Judge claims and sources", intention:"I can judge whether evidence is relevant and a claim is well supported.",
    teach:"Critical readers separate claims from evidence and ask who created a source, for what purpose, and whether other evidence agrees. A confident tone does not make a claim reliable.",
    example:"Claim: “This drink improves concentration.”\nWeak evidence: a seller's comment from one customer.\nStronger evidence: a transparent, independent study with a suitable comparison group. Source and method affect how much confidence we place in the claim.",
    questions:[
      q("R4-1","Warm-up","Which is a claim rather than evidence?",["The survey included 240 students","The new timetable is better","Classes began at 9:00"],1,"“Better” is a judgement that needs supporting evidence."),
      q("R4-2","Warm-up","Why check who published a source?",["To judge expertise and possible interests","To count the letters in the name","Because long names are more reliable"],0,"Authorship can reveal relevant expertise or conflicts of interest."),
      q("R4-3","Guided","Which evidence most strongly supports the council's claim?",["A poster calls the lanes amazing","Counts show cycling on the route rose 38% across six months","One cyclist likes the lane colour"],1,"Repeated counts over time are relevant to whether use increased.","Prefer evidence that directly measures the claim.","The council says new protected cycle lanes have increased cycling on Kauri Road. Its report compares automated cycle counts from the six months before and after installation. A nearby bike shop supports the lanes and reports selling more helmets."),
      q("R4-4","Guided","Why should the bike shop comment be treated cautiously?",["Shops never know about cycling","The shop may benefit from more cycling and sales","Helmets are unrelated to bikes"],1,"The shop may offer useful information, but it also has a commercial interest.","Consider whether the source benefits from the change."),
      q("R4-5","Guided","What information would most improve the council report?",["The font used on the report","Weather and roadwork differences between the two periods","The mayor's favourite bike"],1,"Weather or disruption could offer alternative explanations for changed counts.","Look for another factor that could affect cycling."),
      q("R4-6","Independent","Which source best supports a claim about typical Year 8 sleep?",["A sleep research organisation summarising a large peer-reviewed study","An influencer advertising an energy drink","One student's comment"],0,"Relevant expertise, transparent research, and a large study make it the strongest option."),
      q("R4-7","Independent","A headline says “Screens destroy sleep”, but the study found a small association. What is the best judgement?",["The headline overstates the finding","The headline proves causation","The study must be false"],0,"An association does not by itself prove that one factor caused the other."),
      q("R4-8","Independent","Which phrase communicates an appropriately cautious judgement?",["This definitely proves…","The evidence suggests…, although…","Everyone knows…"],1,"It states what the evidence supports while leaving room for limitations.")]
  }
];

const curriculumDetails = {
  R1:{strand:"English — Reading",focus:"Comprehension: identifying and summarising main ideas; selecting supporting detail",practice:"Identifies a controlling idea, distinguishes topic from main idea, and selects relevant textual support."},
  M1:{strand:"Mathematics and Statistics — Number",focus:"Year 8 number structures: decimals and positive and negative powers of ten",practice:"Reads, compares, orders, and represents decimals in expanded form using powers of ten."},
  W1:{strand:"English — Writing",focus:"Syntax and transcription: sentence completeness, clause control, and sentence boundaries",practice:"Recognises fragments and comma splices and selects controlled ways to combine clauses."},
  R2:{strand:"English — Reading",focus:"Comprehension and critical response: locating, connecting, and justifying with evidence",practice:"Matches explicit evidence to claims and explains how a detail supports a conclusion."},
  M2:{strand:"Mathematics and Statistics — Number",focus:"Rational numbers and proportional reasoning: fractions, decimals, and percentages",practice:"Converts among equivalent representations and compares proportional quantities."},
  W2:{strand:"English — Writing",focus:"Text structure and cohesion: paragraph development and logical connections",practice:"Selects topic sentences, relevant evidence, explanations, cohesive devices, and closing links."},
  R3:{strand:"English — Reading",focus:"Comprehension: inference, layered meaning, and evidence-based interpretation",practice:"Combines textual clues with relevant knowledge and avoids conclusions beyond the evidence."},
  M3:{strand:"Mathematics and Statistics — Algebra",focus:"Year 8 equations and relationships: one- and two-step linear equations",practice:"Forms equations, applies inverse operations, solves integer solutions, and checks by substitution."},
  W3:{strand:"English — Writing",focus:"Revising and editing: punctuation, sentence boundaries, and precise vocabulary",practice:"Edits for correctness and replaces vague wording with specific, supportable meaning."},
  R4:{strand:"English — Reading",focus:"Critical reading: claims, evidence, purpose, reliability, and evaluative language",practice:"Judges relevance and source interests and uses appropriately cautious conclusions."}
};

const extensionQuestions = {
  R1:[
    q("R1-9","Independent","Which detail does not belong in a summary of the repair table?",["Students repair everyday belongings","The project reduces rubbish","The technology room has twelve stools"],2,"The number of stools is unrelated to the paragraph's central ideas."),
    q("R1-10","Independent","What connects both reading passages in this session?",["Shared services can save resources and build useful knowledge","Every useful activity belongs in a library","Only adults can repair equipment"],0,"Both texts show people sharing practical resources or skills for wider benefit.")],
  M1:[
    q("M1-9","Independent","Which value equals 6 × 10⁻²?",["0.6","0.06","0.006"],1,"10⁻² is one hundredth, so six hundredths is 0.06."),
    q("M1-10","Independent","Which number is written as 8×10⁰ + 2×10⁻¹ + 4×10⁻³?",["8.204","8.24","82.004"],0,"There are 8 ones, 2 tenths, 0 hundredths, and 4 thousandths.")],
  W1:[
    q("W1-9","Independent","Choose the best repair: “While we waited for the tide.”",["While we waited for the tide, we checked the map.","While waiting and the tide.","We while waited, for the tide."],0,"The dependent opening now connects to a complete main clause."),
    q("W1-10","Independent","Which sentence joins the ideas most clearly?",["The path was steep, nevertheless, we continued.","The path was steep; nevertheless, we continued.","The path steep nevertheless continuing."],1,"The semicolon separates the complete clauses before the linking adverb.")],
  R2:[
    q("R2-9","Independent","Which sentence best links evidence to a claim?",["This detail shows Hana tested methodically because she recorded each result before changing the design.","This is a sentence from the text.","Hana was obviously the best student."],0,"It explains how a specific action supports a measured conclusion."),
    q("R2-10","Independent","What additional evidence would best show the final sensor was reliable?",["Results from repeated tests in different soil conditions","The colour of Hana's notebook","A friend's guess"],0,"Repeated results under varied conditions would directly test reliability.")],
  M2:[
    q("M2-9","Independent","A class has completed 18 of 24 tasks. What percentage is complete?",["42%","75%","80%"],1,"18/24 simplifies to 3/4, which is 75%."),
    q("M2-10","Independent","Which value is closest to two thirds?",["0.66","66.7%","Both are close, but 66.7% is closer"],2,"Two thirds is 66.666…%, so 66.7% is the closer rounded value.")],
  W2:[
    q("W2-9","Independent","Which sentence is relevant evidence for improving a school garden?",["A survey found 34 students would join a weekly garden group.","Green is a popular colour.","The hall was painted last year."],0,"The survey directly supports likely use of the garden programme."),
    q("W2-10","Independent","Which explanation makes that evidence meaningful?",["This suggests there is enough student interest to sustain regular care of the garden.","Thirty-four comes after thirty-three.","Surveys use questions."],0,"It links the survey result to the practical question of ongoing participation.")],
  R3:[
    q("R3-9","Independent","Which wording best reports an inference?",["The clues prove exactly what Leila planned.","Leila may be trying not to wake someone because she avoids making noise.","Leila is definitely running away."],1,"“May” matches the strength of the evidence and the reason names a textual clue."),
    q("R3-10","Independent","What would most strengthen the inference that someone is asleep?",["A sentence saying light snores came from the next room","A description of the porch colour","Leila carrying two shoes"],0,"The sound of snoring would directly support the presence of a sleeping person.")],
  M3:[
    q("M3-9","Independent","Solve 5a − 7 = 18.",["a = 5","a = 11/5","a = 25"],0,"Add 7 to get 5a = 25, then divide by 5."),
    q("M3-10","Independent","Which check proves a = 5 solves 5a − 7 = 18?",["5+5−7=3","5×5−7=18","5×18−7=83"],1,"Substituting 5 for a makes the original equation true.")],
  W3:[
    q("W3-9","Independent","Which revision is most precise?",["The bird went over there quickly.","The kārearea dived towards the ridge.","It did a movement."],1,"The revision names the subject, action, and direction specifically."),
    q("W3-10","Independent","Choose the correctly punctuated sentence.",["After the final whistle the teams, shook hands.","After the final whistle, the teams shook hands.","After, the final whistle the teams shook hands."],1,"The introductory phrase is followed by a comma; the subject and verb stay together.")],
  R4:[
    q("R4-9","Independent","A company funds research about its own product. What is the fairest response?",["Reject it without reading","Accept it without question","Examine the method carefully and look for independent evidence"],2,"Funding does not automatically invalidate research, but it makes transparency and independent confirmation important."),
    q("R4-10","Independent","Which limitation matters most in a survey claiming all Year 8 students prefer later starts?",["Only 12 volunteers from one school responded","The chart uses blue bars","The report has three pages"],0,"A small, self-selected group from one school cannot confidently represent all Year 8 students.")]
};

sessions.forEach(session => {
  session.curriculum = curriculumDetails[session.id];
  session.questions.push(...extensionQuestions[session.id]);
});

sessions.push(
  {
    id:"R5", subject:"Reading", title:"Unlock unfamiliar vocabulary", intention:"I can use context, roots, and affixes to work out unfamiliar words.",
    teach:"Strong readers combine clues. Read around the word, identify a familiar root or affix, test a possible meaning, then reread the sentence to check it. A prefix comes before a root; a suffix comes after it.",
    example:"In “The nocturnal kākāpō becomes active after sunset”, noct means night and the sentence mentions sunset. Nocturnal therefore means active at night.",
    curriculum:{strand:"English — Reading",focus:"Year 8 vocabulary: academic terms, Greek and Latin roots and affixes, context, morphology, and reference tools",practice:"Uses context, roots, prefixes, and suffixes together to infer and verify unfamiliar vocabulary."},
    questions:[
      q("R5-1","Warm-up","What does the prefix pre– usually mean?",["before","against","under"],0,"Pre– usually means before, as in preview and prehistoric."),
      q("R5-2","Warm-up","Which part is the root in “biodegradable”?",["bio","de","able"],0,"Bio is a Greek root meaning life."),
      q("R5-3","Guided","In “The submarine descended below the surface”, what does sub– suggest?",["above","under","again"],1,"Sub– means under or below.","Connect submarine with subsoil or subway."),
      q("R5-4","Guided","What does “portable” most likely mean in “The portable charger fitted easily into her pocket”?",["easy to carry","powered by water","difficult to replace"],0,"The pocket clue and the root idea of carrying support “easy to carry”.","Use both the sentence and what you know about portable devices."),
      q("R5-5","Guided","The root spect means look. What is an inspection?",["a careful look or examination","a loud argument","a written prediction"],0,"The prefix in– plus spect relates to looking into or examining something.","Think of inspector and spectacles."),
      q("R5-6","Independent","In “The seedlings were resilient; even after the storm flattened them, they stood upright the next day”, resilient means…",["able to recover","easy to damage","ready to flower"],0,"The plants recovered after being flattened."),
      q("R5-7","Independent","What does inter– suggest in “interconnected wetlands”?",["between or among","without","small"],0,"Inter– means between or among; the wetlands are connected with one another."),
      q("R5-8","Independent","If bio means life and diversity means variety, biodiversity means…",["the variety of living things","the study of rocks","a shortage of water"],0,"Combining the word parts gives variety of living things."),
      q("R5-9","Independent","Which strategy best verifies an inferred meaning?",["Reread the sentence with the possible meaning, then check a reliable dictionary","Choose the longest definition","Ignore the rest of the paragraph"],0,"A contextual check followed by a reference check provides stronger confirmation."),
      q("R5-10","Independent","In “The council introduced a temporary restriction, which would end after two weeks”, temporary means…",["lasting for a limited time","permanent","unexplained"],0,"The phrase “end after two weeks” directly confirms a limited duration.")]
  },
  {
    id:"R6", subject:"Reading", title:"Compare perspectives", intention:"I can compare how two texts present the same issue.",
    teach:"Texts can share a topic but differ in purpose, perspective, tone, and evidence. Compare what each includes, what it leaves out, and the words or features used to influence an audience.",
    example:"A council notice calls a new path “a safer connection”. A shop owner calls the work “months of disruption”. Both discuss the same project from different interests and purposes.",
    curriculum:{strand:"English — Reading",focus:"Year 8 critical analysis: comparing representations, perspectives, tone, purpose, and techniques across texts",practice:"Compares how two texts frame the same issue and supports the comparison with language and evidence."},
    questions:[
      q("R6-1","Warm-up","A perspective is…",["a position or way of viewing something","a spelling rule","a list of dates"],0,"A perspective reflects what a person or text notices, values, or believes."),
      q("R6-2","Warm-up","Which word describes a neutral tone?",["measured","furious","celebratory"],0,"A measured tone is restrained and relatively neutral."),
      q("R6-3","Guided","How does Text A frame the evening bus trial?",["As improved access","As wasted money","As a permanent solution"],0,"“Connect” and “access” frame the trial as a useful service.","Notice the benefits emphasised by the council.","Text A — Council update: “The six-month evening bus trial will connect shift workers and students with safer transport after 8 pm.”\n\nText B — Ratepayer newsletter: “The council is spending $180,000 on late buses before proving enough passengers will use them.”"),
      q("R6-4","Guided","What concern does Text B emphasise?",["Cost and evidence of demand","Driver uniforms","Daytime traffic"],0,"Text B foregrounds the price and uncertainty about passenger numbers.","Look at the number and the phrase “before proving”."),
      q("R6-5","Guided","Which comparison is best supported?",["Text A stresses access, while Text B questions value for money","Both texts celebrate the trial","Text B proves the buses will be empty"],0,"That comparison accurately captures each emphasis without overstating either text.","Choose a statement supported by both texts."),
      q("R6-6","Independent","Which phrase in Text A is most positive?",["safer transport","six-month","after 8 pm"],0,"“Safer transport” presents an anticipated benefit."),
      q("R6-7","Independent","Which phrase in Text B creates doubt?",["before proving enough passengers","the council","late buses"],0,"It suggests the decision may have been made without adequate evidence."),
      q("R6-8","Independent","What information would help evaluate both perspectives?",["Passenger numbers, costs, and safety outcomes during the trial","The colour of the buses","The authors’ favourite subjects"],0,"Those data directly test the benefits and concerns raised."),
      q("R6-9","Independent","Which perspective is missing from both texts?",["People who may use the evening service","The council and ratepayers","Bus manufacturers only"],0,"Neither text directly quotes or surveys the intended passengers."),
      q("R6-10","Independent","Which conclusion is most responsible?",["The texts frame the trial differently; more outcome evidence is needed to judge it","Text A must be true because it is official","Text B must be true because it includes a number"],0,"Source and numbers matter, but neither alone settles the issue.")]
  },
  {
    id:"W4", subject:"Writing", title:"Build a persuasive argument", intention:"I can support a clear position with reasons, evidence, and a respectful counter-argument.",
    teach:"A persuasive argument states a position, organises reasons logically, supports them with relevant evidence, acknowledges an opposing view, and explains why the preferred position remains stronger.",
    example:"Position: The library should open during lunch. Evidence: Last term’s trial averaged 28 visits a day. Counter-view: It requires supervision. Response: A rotating roster could provide this without adding one person’s workload.",
    curriculum:{strand:"English — Writing",focus:"Year 8 writing to persuade: position, logical reasoning, trustworthy evidence, opposing views, and respectful rhetorical choices",practice:"Selects and sequences claims, evidence, counter-arguments, responses, and conclusions for a persuasive text."},
    questions:[
      q("W4-1","Warm-up","A persuasive position should…",["state what the writer wants the audience to accept or do","hide the main view","include every fact available"],0,"A clear position lets the audience understand the writer’s viewpoint."),
      q("W4-2","Warm-up","Which source is strongest for a claim about road safety?",["Official local crash data across several years","An anonymous comment","A tyre advertisement"],0,"Relevant, transparent data are stronger than anecdotes or advertising."),
      q("W4-3","Guided","Which is the clearest position?",["Our school should provide a sheltered scooter stand beside the main entrance","Scooters exist","Weather can change"],0,"It names both the proposed action and location.","Choose the statement a reader could agree or disagree with."),
      q("W4-4","Guided","Which evidence best supports that position?",["A count found 47 scooters left exposed on three wet mornings","Some scooters are blue","The entrance has a sign"],0,"The repeated count directly shows the size and weather exposure of the need.","Select evidence relevant to shelter and demand."),
      q("W4-5","Guided","Which response best addresses “A shelter would cost too much”?",["A student design and two local quotes could identify a modest, durable option","That view is ridiculous","Cost never matters"],0,"It treats the concern respectfully and proposes a practical way to test it.","A counter-argument should be answered, not insulted."),
      q("W4-6","Independent","Which reason is distinct from the weather argument?",["Organised parking would keep the entrance path clearer","Rain makes seats wet","Shelters have roofs"],0,"Path access is a separate safety and organisation reason."),
      q("W4-7","Independent","Which wording is compelling but respectful?",["A modest shelter would protect equipment and keep a busy path safer","Only an idiot would oppose this","This will solve every transport problem"],0,"It argues firmly without attacking people or exaggerating."),
      q("W4-8","Independent","Where should the counter-argument normally appear?",["After the main case is clear and before the conclusion","Instead of stating a position","Only in the title"],0,"Readers need to understand the case before the writer weighs an alternative view."),
      q("W4-9","Independent","Which conclusion is strongest?",["For these practical reasons, the school should seek quotes and trial a sheltered stand next term","Scooters are interesting","That is my argument and I am done"],0,"It restates the position and ends with a realistic next action."),
      q("W4-10","Independent","Which plan is most logical?",["Position → reasons and evidence → counter-view and response → conclusion","Counter-view → unrelated story → title","Conclusion → evidence → hidden position"],0,"This structure builds and tests the argument before closing it.")]
  },
  {
    id:"W5", subject:"Writing", title:"Choose words for effect", intention:"I can choose precise words and language features for an audience and purpose.",
    teach:"Synonyms are not exact copies. Their tone, intensity, and associations differ. Effective writers choose words and features deliberately, then check whether they suit the audience, purpose, and intended effect.",
    example:"“The stream moved” is neutral. “The stream trickled” suggests a small gentle flow; “surged” suggests force and speed. The best choice depends on what actually happened and the effect needed.",
    curriculum:{strand:"English — Writing",focus:"Year 8 audience, purpose, and language choice: nuances of synonyms, tone, personal voice, and deliberate language features",practice:"Chooses precise vocabulary and rhetorical features to create an intended effect without distorting meaning."},
    questions:[
      q("W5-1","Warm-up","Which verb is most precise for looking briefly?",["glanced","observed","stared"],0,"A glance is a brief look."),
      q("W5-2","Warm-up","Tone is…",["the attitude or feeling conveyed by language","the number of paragraphs","a spelling pattern"],0,"Tone is created through choices such as vocabulary, sentence shape, and detail."),
      q("W5-3","Guided","Choose the best word: “After hours of heavy rain, water ___ through the culvert.”",["surged","wandered","whispered"],0,"“Surged” conveys forceful, fast movement.","Match the verb to heavy rain and a large flow."),
      q("W5-4","Guided","Which sentence suits a formal council email?",["The crossing becomes difficult to see after dusk.","That crossing is super sketchy at night.","OMG, fix it!"],0,"It is specific, respectful, and appropriately formal.","Consider the audience and purpose."),
      q("W5-5","Guided","Which feature adds emphasis without exaggeration?",["Parallel listing: safer for walkers, clearer for drivers, easier for cyclists","Everyone will certainly die","A random pun"],0,"The balanced list reinforces three relevant benefits.","Choose a feature that strengthens meaning responsibly."),
      q("W5-6","Independent","Which synonym makes the strongest reasonable criticism?",["ineffective","imperfect","evil"],0,"“Ineffective” directly judges whether something works without making a moral accusation."),
      q("W5-7","Independent","Which sentence creates a calm, reflective tone?",["By dusk, the last ripples settled against the jetty.","The water went totally wild!","Everything exploded with awesomeness."],0,"The precise image and measured rhythm create a reflective tone."),
      q("W5-8","Independent","Which rhetorical question suits a speech about waste?",["Why send a repairable device to landfill?","What even is rubbish, lol?","Is every single person terrible?"],0,"It focuses attention on the issue without attacking the audience."),
      q("W5-9","Independent","When is repetition effective?",["When it reinforces a key idea deliberately","Whenever the writer runs out of ideas","In every sentence"],0,"Purposeful repetition can create emphasis; accidental repetition weakens clarity."),
      q("W5-10","Independent","Which revision is most precise?",["The nocturnal survey recorded seven pekapeka passes near the river","We saw some stuff there","There were heaps of bats everywhere"],0,"It states the method, number, animal, and location without exaggeration.")]
  },
  {
    id:"M4", subject:"Maths", title:"Reason with ratios", intention:"I can divide quantities and solve problems using part-to-part and part-to-whole ratios.",
    teach:"A ratio compares quantities multiplicatively. In 2:3, every group has 2 parts of the first quantity and 3 of the second—5 parts altogether. Equivalent ratios multiply or divide both parts by the same factor.",
    example:"Red:blue = 2:3 and there are 25 counters. There are 5 total parts; 25 ÷ 5 = 5 per part. Red = 10 and blue = 15.",
    curriculum:{strand:"Mathematics and Statistics — Number",focus:"Year 8 proportional reasoning: part-to-part and part-to-whole ratios and dividing quantities into two parts",practice:"Finds equivalent ratios, determines the value of one part, and solves ratio allocation problems."},
    questions:[
      q("M4-1","Warm-up","In the ratio 3:4, how many total parts are there?",["7","12","1"],0,"Three parts plus four parts gives seven total parts."),
      q("M4-2","Warm-up","Which ratio is equivalent to 2:5?",["4:10","4:7","10:2"],0,"Multiplying both parts by 2 gives 4:10."),
      q("M4-3","Guided","A drink uses juice:water = 1:3. How many cups of water go with 2 cups of juice?",["6","4","2"],0,"Doubling the juice requires doubling the water: 2:6.","Multiply both parts of 1:3 by 2."),
      q("M4-4","Guided","A 30-student group is divided in the ratio 2:3. What is one part worth?",["5","6","10"],1,"There are 5 total parts, so 30 ÷ 5 = 6 per part.","Add the ratio parts, then divide the total."),
      q("M4-5","Guided","Using 2:3 with 30 students, how many are in the larger group?",["12","18","20"],1,"The larger group has 3 parts: 3 × 6 = 18.","Use the value of one part from the previous question."),
      q("M4-6","Independent","Blue:white tiles = 5:2. If there are 28 tiles, how many are blue?",["20","8","14"],0,"Seven total parts means 4 per part; 5 × 4 = 20 blue tiles."),
      q("M4-7","Independent","A class has 12 cyclists and 18 walkers. Cyclists:walkers in simplest form is…",["2:3","3:2","12:30"],0,"Dividing both quantities by 6 gives 2:3."),
      q("M4-8","Independent","If 3 out of every 8 seedlings are mānuka, the part-to-whole ratio is…",["3:8","3:5","5:8"],0,"Part-to-whole compares the 3 mānuka with all 8 seedlings."),
      q("M4-9","Independent","A $72 prize is shared in the ratio 5:3. What is the larger share?",["$45","$27","$40"],0,"Eight parts means $9 per part; 5 × $9 = $45."),
      q("M4-10","Independent","Which method preserves a ratio?",["Multiply or divide every part by the same non-zero number","Add 2 to every part","Change only the larger part"],0,"Equivalent ratios require the same multiplicative scale factor.")]
  },
  {
    id:"M5", subject:"Maths", title:"Interpret data carefully", intention:"I can use centre, spread, and context to interpret data and notice misleading displays.",
    teach:"The mean, median, and mode describe centre in different ways; the range describes spread. Outliers can pull the mean towards them, while the median is often more resistant. Always interpret numbers in context and check graph labels and scales.",
    example:"Times: 10, 11, 11, 12, 46. Median = 11; mean = 18. The unusually high 46 pulls the mean upward, so the median better describes a typical time.",
    curriculum:{strand:"Mathematics and Statistics — Statistics",focus:"Year 8 data interpretation: mean, median, mode, range, outliers, distribution, context, and potentially misleading visualisations",practice:"Calculates and selects summary measures, explains outlier effects, and checks visualisations for missing or distorted information."},
    questions:[
      q("M5-1","Warm-up","What is the median of 3, 5, 8, 9, 12?",["8","7.4","9"],0,"The sorted middle value is 8."),
      q("M5-2","Warm-up","What is the range of 4, 7, 7, 13?",["9","7","3"],0,"Range = maximum − minimum = 13 − 4 = 9."),
      q("M5-3","Guided","What is the mean of 6, 8, 10?",["8","10","24"],0,"The total is 24; 24 ÷ 3 = 8.","Add the values, then divide by how many values there are."),
      q("M5-4","Guided","For 5, 6, 6, 7, 31, which measure best represents a typical value?",["Median 6","Mean 11","Range 26"],0,"The outlier 31 pulls the mean up; the median remains near most values.","Notice the value far from the cluster."),
      q("M5-5","Guided","A graph comparing 98 and 100 starts its vertical axis at 97. What risk does this create?",["The small difference may look very large","The values become incorrect","The graph has no bars"],0,"A truncated scale can visually exaggerate a small difference.","Think about how tall the bars appear relative to the visible axis."),
      q("M5-6","Independent","What is the mode of 2, 3, 3, 4, 4, 4, 8?",["4","3","8"],0,"Four occurs most frequently."),
      q("M5-7","Independent","What is the median of 4, 6, 7, 9?",["6.5","7","26"],0,"With four values, average the middle two: (6 + 7) ÷ 2 = 6.5."),
      q("M5-8","Independent","Which description includes context?",["Typical travel time was 14 minutes for the surveyed students","The median was 14","Fourteen is in the middle"],0,"It names the measure, variable, unit, and group."),
      q("M5-9","Independent","Which missing feature makes a graph hardest to interpret?",["Axis labels and units","Decorative colour","A border"],0,"Without labels and units, viewers cannot identify what the values represent."),
      q("M5-10","Independent","An outlier should always be deleted. Is this true?",["No; first investigate whether it is a valid rare value or an error","Yes; outliers are never real","Yes; they always lower the mean"],0,"Outliers may be errors or genuine unusual observations, so context matters.")]
  }
);
