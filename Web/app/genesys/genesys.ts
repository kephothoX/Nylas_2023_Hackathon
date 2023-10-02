export interface Genesys {
}

export interface Result {
  country: String;
  city: String;
  latitude: Number;
  longitude: Number;
  country_code: String;

}

export interface Doc {
  auth_id: String;
  md_email: String;
  md_name: String;
  practice_location: String;
  qualifications: String;

}


export interface Contact {
  given_name: String;
  surname: String;
  email: String;
  id: String;
}

export interface Message {
  id: String;
  bcc: String;
  body: String;
  cc: String;
  date: Date;
  files: {};
  from: {};
  from_: {};
  subject: String;
  to: {};
  unread: String;
  reply_to: String;
}

export interface ExpertAIResponse {
  behavioral_traits: Hierarchy[];
  emotional_traits: Hierarchy[];
  entities: {
    lemma: String;
    type: String;
  };
  geotax: Hierarchy[];
  hate_speech: {
    hierarchy?: [];
    name?: String;
    value?: String;
  };
  iptc: Hierarchy[];

  key_phrases: Array<String>;
  pii: {};
  relations: Array<any>;
  sentiment: {
    sentiment: String;
    sentiment_score: Number;
  };
  temporal_information: {};
  text: String;
  write_print: {}; 

}

export interface Hierarchy {
  id: String;
  hierarchy: Array<String>;
}


export interface CalendarEvent {
  id: String;
  title: String;
  location: String;
  when: {
    date: Date;
  };
  participants: [];
  calendar_id: String;
  status: String;
  owner: String;
  ical_uid: String;
  visibility: String;
  message_id: String;
}

export interface Schema {
  matches: Array<{
    name: String;
    value: String;
  }>
}

export interface HateSpeech {
  hierarchy: [];
  name: String;
  value: String;
}

export interface TemporalInformation {
  name: String;
  value: String;
}

export interface WritePrint {
  readabilityIndexes: Array<WritePrintReadAbilityIndexes>;
  structureIndexes: Array<WritePrintStructureIndexes>;
}

export interface WritePrintReadAbilityIndexes {
  name: String;
  readabilityLevel: String;
  value: Number;

}

 export interface  WritePrintStructureIndexes {
    academicLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    adjectivePhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    adjectivesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    adverbPhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    adverbsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    articlesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    atomsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    auxiliariesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    businessLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    capitalFirstLetterSentences:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    charactersPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    colonsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    commasPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    commonlyMisspelledWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    conjunctionPhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    conjunctionsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    crimeLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    dotsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    doubleQuotationMarksPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    emoticonsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    exclamationMarkQuestionMarkSequencesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    exclamationMarksPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    functionWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    laymanLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    legalLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    militaryLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    mostCommonWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    multipleDotsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    multipleExclamationMarksPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    multipleQuestionMarksPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    namedEntitiesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    nominalPredicatesPerSentence    :   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    nounPhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    nounsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    particlesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    phrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    politicalLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    prepositionPhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    prepositionsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    pronounsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    properNounsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    punctuationPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    questionMarksPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    relativePhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    semicolonsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    sentences:   { total: Number };
    singleQuotationMarksPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    smallFirstLetterSentences:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    socialMediaLanguageWordsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    tokenLengthPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number }>;
    tokens:   { total: Number };
    tokensPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    unknownConceptsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    verbPhrasesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    verbTypes:   { total: Number };
    verbTypesPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
    verbsPerSentence:   Array<{  mean: Number, meanAbsoluteDeviation: Number, standardDeviation: Number, total: Number }>;
  
}