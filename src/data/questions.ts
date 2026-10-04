export interface Question {
  id: number;
  question: string;
  underlinedPart?: string;
  category: string;
  options: string[];
  correctAnswer: number; // 0-indexed: 0 for a, 1 for b, 2 for c, 3 for d
  explanation: string;
}

export const EXAM_DETAILS = {
  academyName: "CPR MEDICAL ACADEMY",
  batch: "BCS SPECIAL BATCH-51",
  subject: "English Grammar",
  totalQuestions: 50,
  durationMinutes: 45,
  marksPerQuestion: 1.0,
  negativeMarkPerWrong: 0.5,
  passPercentage: 50, // 25 marks
};

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    question: "'To win a prize is my ambition'. The underlined part of the sentence is a/an -",
    underlinedPart: "To win a prize",
    category: "Phrases & Clauses",
    options: [
      "a) adjective phrase",
      "b) noun phrase",
      "c) adverb phrase",
      "d) conjunctional phrase"
    ],
    correctAnswer: 1,
    explanation: "'To win a prize' বাক্যের verb 'is'-এর Subject হিসেবে বসেছে। যে phrase বাক্যে subject বা object হিসেবে বসে noun-এর মতো কাজ করে, তাকে Noun Phrase বলা হয়।"
  },
  {
    id: 2,
    question: "'He ran with great speed'. The underlined part of the sentence is a -",
    underlinedPart: "with great speed",
    category: "Phrases & Clauses",
    options: [
      "a) noun phrase",
      "b) adverb phrase",
      "c) adjective phrase",
      "d) participle phrase"
    ],
    correctAnswer: 1,
    explanation: "'with great speed' phrase-টি 'ran' verb-কে modify করে কীভাবে দৌড়েছিল (manner) তা নির্দেশ করে। তাই এটি Adverbial / Adverb Phrase।"
  },
  {
    id: 3,
    question: "'Strike while the iron is hot' is an example of -",
    underlinedPart: "while the iron is hot",
    category: "Phrases & Clauses",
    options: [
      "a) Noun clause",
      "b) Adjective clause",
      "c) Adverbial clause",
      "d) Subordinate clause"
    ],
    correctAnswer: 2,
    explanation: "'while the iron is hot' clause-টি 'strike' verb কখন করতে হবে তা (time) নির্দেশ করে। সুতরাং এটি Adverbial clause of time।"
  },
  {
    id: 4,
    question: "This is the book I lost. Here 'I lost' is -",
    underlinedPart: "I lost",
    category: "Phrases & Clauses",
    options: [
      "a) A noun clause",
      "b) An adverbial clause",
      "c) An adjective clause",
      "d) None of the three."
    ],
    correctAnswer: 2,
    explanation: "'[which / that] I lost' পূর্ববর্তী noun 'book'-কে modify করছে। Noun-কে qualify বা modify করা clause-কে Adjective (Relative) Clause বলে।"
  },
  {
    id: 5,
    question: "He worked with all sincerity. The underlined phrase is -",
    underlinedPart: "with all sincerity",
    category: "Phrases & Clauses",
    options: [
      "a) A noun phrase.",
      "b) An adjective phrase.",
      "c) An infinitive phrase.",
      "d) An adverbial phrase."
    ],
    correctAnswer: 3,
    explanation: "'with all sincerity' phrase-টি সে কীভাবে কাজ করেছিল (How) তা প্রকাশ করে 'worked' verb-কে modify করে। ফলে এটি Adverbial phrase।"
  },
  {
    id: 6,
    question: "We were waiting for the bus. The underlined parts is -",
    underlinedPart: "for the bus",
    category: "Phrases & Clauses",
    options: [
      "a) a noun phrase",
      "b) an infinitive phrase",
      "c) a prepositional phrase",
      "d) a verb phrase"
    ],
    correctAnswer: 2,
    explanation: "'for the bus' preposition 'for' দিয়ে শুরু হয়ে noun 'bus'-এ শেষ হয়েছে, তাই এটি একটি Prepositional Phrase।"
  },
  {
    id: 7,
    question: "'They rested at sunset'. Here 'at sunset' is a/an-",
    underlinedPart: "at sunset",
    category: "Phrases & Clauses",
    options: [
      "a) adjective clause",
      "b) noun clause",
      "c) adverb clause",
      "d) adverb phrase"
    ],
    correctAnswer: 3,
    explanation: "'at sunset'-এ কোনো finite verb নেই, তাই এটি Clause নয়, Phrase। এটি বিশ্রামের সময় নির্দেশ করায় Adverb Phrase of time।"
  },
  {
    id: 8,
    question: "I won't allow you to play Blue Whale, even though you are old enough. The underlined part is a/an --",
    underlinedPart: "even though you are old enough",
    category: "Phrases & Clauses",
    options: [
      "a) noun clause",
      "b) adjectival clause",
      "c) adverbial clause",
      "d) principal clause"
    ],
    correctAnswer: 2,
    explanation: "'even though you are old enough' শর্ত/বৈপরীত্য (concession) প্রকাশ করায় এটি Adverbial Clause।"
  },
  {
    id: 9,
    question: "Though the ball was crowded, they managed to find seats. The underlined clause is a/an-",
    underlinedPart: "Though the ball was crowded",
    category: "Phrases & Clauses",
    options: [
      "a) adjective clause",
      "b) noun clause",
      "c) adverb clause",
      "d) main clause"
    ],
    correctAnswer: 2,
    explanation: "'Though the ball was crowded' হলো Adverbial clause of concession, যা 'managed to find seats'-এর সাথে বৈপরীত্য যুক্ত করেছে।"
  },
  {
    id: 10,
    question: "'Among' is preposition that is used when — people are involved.",
    category: "Prepositions",
    options: [
      "a) two",
      "b) more than two",
      "c) two or more than two",
      "d) four only"
    ],
    correctAnswer: 1,
    explanation: "সাধারণত দুজনের মধ্যে বোঝাতে 'between' এবং দুইয়ের অধিক (more than two) ব্যক্তি বা বস্তুর মধ্যে বোঝাতে 'among' ব্যবহৃত হয়।"
  },
  {
    id: 11,
    question: "Choose the appropriate preposition in the blank of the following sentence: Eight men were concerned — the plot.",
    category: "Prepositions",
    options: [
      "a) at",
      "b) with",
      "c) in",
      "d) for"
    ],
    correctAnswer: 2,
    explanation: "কোনো ষড়যন্ত্র, অপকর্ম বা চক্রান্তে যুক্ত বা জড়িত থাকা বোঝাতে 'concerned in' ব্যবহৃত হয় (Eight men were concerned in the plot)। কোনো বিষয়ে সম্পর্কিত বোঝাতে 'concerned with' হয়।"
  },
  {
    id: 12,
    question: "Choose the correct sentence:",
    category: "Prepositions",
    options: [
      "a) He refrained to take any drastic action",
      "b) He refrained on taking any drastic action",
      "c) He refrained in taking any drastic action",
      "d) He refrained from taking any drastic action"
    ],
    correctAnswer: 3,
    explanation: "'Refrain'-এর পর appropriate preposition হিসেবে 'from' বসে এবং এরপর verb+ing (gerund) বসে। সঠিক বাক্য: 'He refrained from taking any drastic action'।"
  },
  {
    id: 13,
    question: "Choose the appropriate prepositions in the blank of the following sentence: The family doesn't feel — going outing this season.",
    category: "Prepositions",
    options: [
      "a) in",
      "b) on",
      "c) like",
      "d) of"
    ],
    correctAnswer: 2,
    explanation: "'Feel like + V-ing' একটি সুপরিচিত ইংরেজি Idiomatic expression, যার অর্থ কোনো কিছু করার ইচ্ছা বা আগ্রহ পোষণ করা।"
  },
  {
    id: 14,
    question: "He insisted — there. (Fill in the gap)",
    category: "Prepositions",
    options: [
      "a) on my going",
      "b) is to go",
      "c) over going",
      "d) to go"
    ],
    correctAnswer: 0,
    explanation: "'Insist'-এর পর preposition 'on' বসে এবং gerund-এর পূর্বে possessive adjective (my/his) বসে: 'insisted on my going'।"
  },
  {
    id: 15,
    question: "I have been living in Dhaka — 2000.",
    category: "Prepositions",
    options: [
      "a) since",
      "b) from",
      "c) after",
      "d) till"
    ],
    correctAnswer: 0,
    explanation: "Present Perfect Continuous tense-এ অতীত থেকে কোনো নির্দিষ্ট সময় (point of time) শুরু হয়ে বর্তমান পর্যন্ত চললে 'since' ব্যবহৃত হয়।"
  },
  {
    id: 16,
    question: "Credit tk. 5000 — my account.",
    category: "Prepositions",
    options: [
      "a) in",
      "b) with",
      "c) against",
      "d) to"
    ],
    correctAnswer: 3,
    explanation: "ব্যাংকিং নিয়মে অ্যাকাউন্টে টাকা জমা বা ক্রেডিট করতে 'Credit ... to an account' ব্যবহৃত হয়।"
  },
  {
    id: 17,
    question: "'Call me if you have any problems regarding your work.' Here 'regarding' is a/an-",
    underlinedPart: "regarding",
    category: "Parts of Speech",
    options: [
      "a) gerund",
      "b) apposition",
      "c) preposition",
      "d) conjunction"
    ],
    correctAnswer: 2,
    explanation: "এখানে 'regarding' শব্দটি 'about' বা 'concerning' অর্থে ব্যবহৃত হয়ে noun phrase 'your work'-এর পূর্বে বসেছে। এটি একটি Participial Preposition।"
  },
  {
    id: 18,
    question: "Would you please find out Bangladesh --- the map?",
    category: "Prepositions",
    options: [
      "a) in",
      "b) on",
      "c) over",
      "d) at"
    ],
    correctAnswer: 1,
    explanation: "মানচিত্রে বা কোনো সমতল পৃষ্ঠে কিছু চিহ্নিত করতে 'on the map' ব্যবহার করা হয়।"
  },
  {
    id: 19,
    question: "In which sentence is the word 'past' used as a preposition?",
    category: "Parts of Speech",
    options: [
      "a) Writing letters is a thing of the past.",
      "b) I look back on the past without regret.",
      "c) I called out to him as he ran past.",
      "d) Tania was a wonderful singer, but she's past her prime"
    ],
    correctAnswer: 3,
    explanation: "(d) বাক্যে 'past' শব্দটি 'her prime' noun phrase-এর পূর্বে বসে 'beyond' (অতিক্রম করে যাওয়া) অর্থে Preposition হিসেবে কাজ করেছে। (a) ও (b)-তে এটি noun, এবং (c)-তে এটি adverb।"
  },
  {
    id: 20,
    question: "Fill in the blank: As she was talking, he suddenly broke ___, saying, 'That's a lie!'",
    category: "Phrasal Verbs",
    options: [
      "a) off",
      "b) in",
      "c) down",
      "d) into"
    ],
    correctAnswer: 1,
    explanation: "'Break in' একটি Group Verb যার অর্থ কারো কথায় বাধা দেওয়া বা কথার মাঝে বিঘ্ন ঘটানো (interrupt someone who is talking)।"
  },
  {
    id: 21,
    question: "Fill in the blank: You may go for a walk if you feel ___ it. [40th BCS]",
    category: "Prepositions & Idioms",
    options: [
      "a) about",
      "b) on",
      "c) like",
      "d) for"
    ],
    correctAnswer: 2,
    explanation: "৪০তম বিসিএস-এর প্রশ্ন। 'Feel like something/doing something' অর্থ কোনো কিছু করার ইচ্ছা থাকা বা মন চাওয়া।"
  },
  {
    id: 22,
    question: "'There was a small reception following the wedding'. The word 'following' in the sentence above is a/an-",
    underlinedPart: "following",
    category: "Parts of Speech",
    options: [
      "a) adjective",
      "b) adverb",
      "c) noun",
      "d) preposition"
    ],
    correctAnswer: 3,
    explanation: "এখানে 'following' শব্দটি 'after' (পরবর্তী বা পরে) অর্থে ব্যবহৃত হয়ে noun 'the wedding'-এর পূর্বে বসে Preposition-এর ভূমিকা পালন করেছে।"
  },
  {
    id: 23,
    question: "\"They have little money\" means -",
    category: "Determiners & Modifiers",
    options: [
      "a) They have no money at all",
      "b) They have almost no money.",
      "c) They have yet some money",
      "d) They have quite some money"
    ],
    correctAnswer: 1,
    explanation: "Article ছাড়া 'little' শব্দটি নেতিবাচক অর্থ প্রকাশ করে, যার অর্থ 'নেই বললেই চলে' বা 'almost no / hardly any money'।"
  },
  {
    id: 24,
    question: "He has few friends means he has -",
    category: "Determiners & Modifiers",
    options: [
      "a) no friend at all",
      "b) almost no friends",
      "c) some friends",
      "d) a few friends"
    ],
    correctAnswer: 1,
    explanation: "Countable noun-এর পূর্বে article ছাড়া 'few' ব্যবহৃত হলে তা নেতিবাচক অর্থ প্রকাশ করে: 'almost no friends' বা বন্ধু নেই বললেই চলে।"
  },
  {
    id: 25,
    question: "There were — guests than I expected.",
    category: "Determiners & Modifiers",
    options: [
      "a) less",
      "b) lesser",
      "c) fewer",
      "d) few"
    ],
    correctAnswer: 2,
    explanation: "'Guests' হলো plural countable noun। গণনাবাচক বিশেষ্যের তুলনামূলক পরিমাপে comparative রূপ হিসেবে 'fewer' বসে (fewer ... than)।"
  },
  {
    id: 26,
    question: "We should use — time we have in our hands to complete our preparation.",
    category: "Determiners & Modifiers",
    options: [
      "a) the little of",
      "b) the few",
      "c) the little",
      "d) little"
    ],
    correctAnswer: 2,
    explanation: "'Time' uncountable noun। 'The little' অর্থ যেটুকু সামান্য পরিমাণ আছে তার সম্পূর্ণটুকুই ('the little time we have in our hands')।"
  },
  {
    id: 27,
    question: "We should use — time we have at our disposal to settle the dispute.",
    category: "Determiners & Modifiers",
    options: [
      "a) the little",
      "b) the little of",
      "c) the few",
      "d) few"
    ],
    correctAnswer: 0,
    explanation: "'The little time we have at our disposal'—এখানে নির্দিষ্ট অল্প সময়টুকুর পুরোটাই বোঝাতে 'the little' সঠিক উত্তর।"
  },
  {
    id: 28,
    question: "He lost — few books he had. Choose the correct option for the gap.",
    category: "Determiners & Modifiers",
    options: [
      "a) the",
      "b) a",
      "c) some",
      "d) one"
    ],
    correctAnswer: 0,
    explanation: "'The few' অর্থ সংখ্যায় কম হলেও তার সবগুলোই। তার যে কয়টি অল্প বই ছিল সবগুলোই সে হারিয়েছে ('the few books he had')।"
  },
  {
    id: 29,
    question: "— milk he gave me has been spilt. Choose the correct option.",
    category: "Determiners & Modifiers",
    options: [
      "a) few",
      "b) a few",
      "c) little",
      "d) the little"
    ],
    correctAnswer: 3,
    explanation: "সে আমাকে যে অল্প দুধ দিয়েছিল তার পুরো অংশই চলকে পড়ে গেছে। নির্দিষ্ট পরিমাণের পুরোটা বোঝাতে uncountable noun 'milk'-এর সাথে 'the little' বসে।"
  },
  {
    id: 30,
    question: "— people trying to get into the football stadium.",
    category: "Subject-Verb Agreement",
    options: [
      "a) There are too much",
      "b) There was too much",
      "c) There were too much",
      "d) It was too much"
    ],
    correctAnswer: 2,
    explanation: "অফিসিয়াল অ্যানসার কি অনুযায়ী সঠিক উত্তর (c) 'There were too much'।"
  },
  {
    id: 31,
    question: "The pronoun agrees with its antecedent in -",
    category: "Pronoun-Antecedent Agreement",
    options: [
      "a) The family does their best to make a living.",
      "b) The family do its best to make a living.",
      "c) The family are doing its best to make a living.",
      "d) The family does its best to make a living."
    ],
    correctAnswer: 3,
    explanation: "'The family' একক সমষ্টি (collective noun) হিসেবে ব্যবহৃত হলে এটি singular verb 'does' এবং singular pronoun 'its' গ্রহণ করে।"
  },
  {
    id: 32,
    question: "Identify the word which remains the same in its plural form:",
    category: "Number (Singular/Plural)",
    options: [
      "a) aircraft",
      "b) intention",
      "c) mouse",
      "d) thesis"
    ],
    correctAnswer: 0,
    explanation: "'Aircraft' শব্দটির singular ও plural উভয় রূপই একই ('aircraft')। অন্যান্য শব্দে: mouse -> mice, thesis -> theses, intention -> intentions।"
  },
  {
    id: 33,
    question: "What is the plural form of the word 'deer'?",
    category: "Number (Singular/Plural)",
    options: [
      "a) deers",
      "b) deer",
      "c) deerz",
      "d) many dear"
    ],
    correctAnswer: 1,
    explanation: "'Deer' শব্দটির Plural রূপ 'deer'-ই থাকে (Zero plural)। যেমন: sheep, deer, salmon, aircraft।"
  },
  {
    id: 34,
    question: "\"I\" — the 9th letter of English alphabet.",
    category: "Subject-Verb Agreement",
    options: [
      "a) is",
      "b) am",
      "c) are",
      "d) will be"
    ],
    correctAnswer: 0,
    explanation: "এখানে \"I\" প্রথম পুরুষ সর্বনাম (first person pronoun) নয়, বরং বর্ণমালার ৯ম বর্ণ বা নামবাচক বিষয় (singular entity) হিসেবে ব্যবহৃত হয়েছে। তাই এর পর 'is' বসবে।"
  },
  {
    id: 35,
    question: "The memoranda — not important.",
    category: "Subject-Verb Agreement",
    options: [
      "a) is",
      "b) has",
      "c) have",
      "d) are"
    ],
    correctAnswer: 3,
    explanation: "'Memoranda' শব্দটি 'memorandum'-এর plural রূপ (Latin plural)। Plural subject হওয়ায় verb হিসেবে plural 'are' বসবে।"
  },
  {
    id: 36,
    question: "My family and I — well.",
    category: "Subject-Verb Agreement",
    options: [
      "a) am",
      "b) is",
      "c) are",
      "d) None"
    ],
    correctAnswer: 2,
    explanation: "'My family and I' দুটি subject 'and' দ্বারা যুক্ত হওয়ায় যৌগিক বহুবচন (plural compound subject) তৈরি করেছে, তাই verb হবে 'are'।"
  },
  {
    id: 37,
    question: "Choose the correct option:",
    category: "Subject-Verb Agreement",
    options: [
      "a) Either she or her sisters is responsible",
      "b) Neither she nor her sisters is responsible",
      "c) Either she or her sisters are responsible",
      "d) Neither she nor her sisters is responsible"
    ],
    correctAnswer: 2,
    explanation: "'Either... or' বা 'Neither... nor' দ্বারা দুটি subject যুক্ত হলে verb তার নিকটবর্তী subject অনুযায়ী হয়। এখানে verb-এর নিকটবর্তী 'her sisters' বহুবচন (plural), তাই 'are' বসবে।"
  },
  {
    id: 38,
    question: "Choose the correct one:",
    category: "Sentence Correction",
    options: [
      "a) Two parties has different views to democracy.",
      "b) Two parties have different views to democracy.",
      "c) Two parties have different views of democracy.",
      "d) Two parties different views to democracy."
    ],
    correctAnswer: 2,
    explanation: "'Two parties' plural subject হওয়ায় verb হবে 'have', এবং কোনো ধারণা বা বিষয়ের দৃষ্টিভঙ্গি বোঝাতে 'views of democracy' উপযুক্ত।"
  },
  {
    id: 39,
    question: "Choose the correct one:",
    category: "Sentence Correction",
    options: [
      "a) Over a billion people using Microsoft Windows operating system.",
      "b) Over a billion people uses Microsoft Windows operating system.",
      "c) Over a billion peoples use Microsoft Windows operating system.",
      "d) Over a billion people use Microsoft Windows operating system."
    ],
    correctAnswer: 3,
    explanation: "'People' নিজেই বহুবচন শব্দ (plural noun), তাই verb-এর সাথে s/es যুক্ত হবে না এবং মূল ক্রিয়া 'use' বসবে।"
  },
  {
    id: 40,
    question: "Choose the correct proverb:",
    category: "Proverbs",
    options: [
      "a) All is well that end well",
      "b) All are well that ends well",
      "c) All is well that ends well",
      "d) All are well that end well"
    ],
    correctAnswer: 2,
    explanation: "প্রচলিত ইংরেজি প্রবাদ হলো: 'All is well that ends well' (শেষ ভালো যার, সব ভালো তার)।"
  },
  {
    id: 41,
    question: "What is the singular of 'corps'?",
    category: "Number (Singular/Plural)",
    options: [
      "a) corps",
      "b) corp",
      "c) corpe",
      "d) corpes"
    ],
    correctAnswer: 0,
    explanation: "ফরাসি উৎসজাত 'corps' শব্দটির একবচন ও বহুবচন বানান একই: 'corps'। একবচনে এর উচ্চারণ /kɔːr/ এবং বহুবচনে /kɔːrz/।"
  },
  {
    id: 42,
    question: "Her brother along with her parents insist that she remain in school. Choose the correct answer.",
    category: "Subject-Verb Agreement",
    options: [
      "a) are insisting",
      "b) have insisted",
      "c) insists",
      "d) were insisting"
    ],
    correctAnswer: 2,
    explanation: "'along with', 'as well as', 'together with' ইত্যাদি দ্বারা দুটি subject যুক্ত হলে প্রথম subject অনুযায়ী verb বসে। প্রথম subject 'Her brother' 3rd person singular হওয়ায় verb হবে 'insists'।"
  },
  {
    id: 43,
    question: "Either you or I — wrong.",
    category: "Subject-Verb Agreement",
    options: [
      "a) are",
      "b) was",
      "c) am",
      "d) were"
    ],
    correctAnswer: 2,
    explanation: "'Either... or' দ্বারা যুক্ত subject-এর ক্ষেত্রে verb নিকটবর্তী subject অনুযায়ী নির্ধারিত হয়। এখানে শূন্যস্থানের ঠিক আগে 'I' থাকায় verb হবে 'am'।"
  },
  {
    id: 44,
    question: "Which one of the following is a common gender?",
    category: "Gender",
    options: [
      "a) king",
      "b) monarch",
      "c) queen",
      "d) emperor"
    ],
    correctAnswer: 1,
    explanation: "'Monarch' (সম্রাট বা সম্রাজ্ঞী/শাসক) দ্বারা পুরুষ ও নারী উভয়কেই বোঝায়, তাই এটি Common gender (উভয়লিঙ্গ)। king ও emperor হলো masculine, queen হলো feminine।"
  },
  {
    id: 45,
    question: "The feminine gender of the word 'horse' is -",
    category: "Gender",
    options: [
      "a) mare",
      "b) vixen",
      "c) drone",
      "d) ewe"
    ],
    correctAnswer: 0,
    explanation: "'Horse' (ঘোড়া)-এর স্ত্রীলিঙ্গ হলো 'mare' (ঘোড়ী)। vixen হলো female fox, drone হলো male bee, ewe হলো female sheep।"
  },
  {
    id: 46,
    question: "The singular form of 'phenomena' is-",
    category: "Number (Singular/Plural)",
    options: [
      "a) phenomenna",
      "b) phenomenon",
      "c) phenomenone",
      "d) phenon"
    ],
    correctAnswer: 1,
    explanation: "'Phenomena' বহুবচনের একবচন (singular) রূপ হলো গ্রিক শব্দ 'phenomenon'।"
  },
  {
    id: 47,
    question: "Which is the plural form of the word 'madam'?",
    category: "Number (Singular/Plural)",
    options: [
      "a) Madams",
      "b) Madames",
      "c) Madem",
      "d) Mesdames"
    ],
    correctAnswer: 3,
    explanation: "'Madam'-এর ঐতিহ্যবাহী ও ব্যাকরণগত বহুবচন (plural) হলো 'Mesdames' (ফরাসি 'mes dames' থেকে উদ্ভূত)।"
  },
  {
    id: 48,
    question: "The plural word 'phenomena', 'data' are called -",
    category: "Number (Singular/Plural)",
    options: [
      "a) foreign plural",
      "b) zero plural",
      "c) unusual plural",
      "d) irregular plural"
    ],
    correctAnswer: 0,
    explanation: "ল্যাটিন বা গ্রিক প্রভৃতি বিদেশি ভাষা থেকে সরাসরি আগত শব্দগুলোর বহুবচনকে 'Foreign Plural' বলা হয় (যেমন: datum -> data, phenomenon -> phenomena)।"
  },
  {
    id: 49,
    question: "The plural form of 'wildlife' is-",
    category: "Number (Singular/Plural)",
    options: [
      "a) wildlives",
      "b) wildlifes",
      "c) wildlife",
      "d) wildlive"
    ],
    correctAnswer: 2,
    explanation: "'Wildlife' শব্দটি অপরিবর্তনীয় (uncountable / invariable), যার plural রূপও 'wildlife'।"
  },
  {
    id: 50,
    question: "The pair of scissors — dull.",
    category: "Subject-Verb Agreement",
    options: [
      "a) have been",
      "b) is",
      "c) are",
      "d) has"
    ],
    correctAnswer: 1,
    explanation: "সাধারণত 'scissors' plural verb গ্রহণ করে, কিন্তু যখন 'The pair of' বসে তখন মূল grammatical subject হয় একবচন 'pair'। তাই verb হবে singular 'is'।"
  }
];
