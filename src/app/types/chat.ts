export interface VerifiedVerse {
  chapter: number;
  verse: number;
  ref: string;
  sanskrit: string;
  transliteration: string;
  word_meanings: string;
}

export interface MessageAnalysis {
  emotion: string;
  intensity: "low" | "medium" | "high";
  situation: string;
  underlyingNeed: string;
  themes: string[];
  needsMoreContext: boolean;
}

export interface ChatMessage {
  id?: string;
  sender: "user" | "bot";
  text: string;
  time?: string;
}

export interface VerseCandidate {
  verse: VerifiedVerse;
  score: number;
}

export interface SakhiResponse {
  reply: string;
  matchedVerseRef: string | null;
}

export interface VerseMetadata {
  ref: string;
  themes: string[];
  summary: string;
}