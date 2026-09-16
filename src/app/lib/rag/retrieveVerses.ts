import versesData from "@/data/gita-verses-verified.json";
import metadataData from "@/data/verse-metadata.json";

import type {
  MessageAnalysis,
  VerifiedVerse,
  VerseCandidate,
  VerseMetadata,
} from "@/types/chat";

const ALL_VERSES = versesData as VerifiedVerse[];
const VERSE_METADATA = metadataData as VerseMetadata[];

function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function retrieveVerses(
  userMessage: string,
  analysis: MessageAnalysis,
  limit = 10
): VerseCandidate[] {

  const queryWords = normalize(
    [
      userMessage,
      analysis.emotion,
      analysis.situation,
      analysis.underlyingNeed,
      ...analysis.themes,
    ].join(" ")
  );

  const scoredMetadata = VERSE_METADATA.map((metadata) => {

    const themeWords = normalize(metadata.themes.join(" "));
    const summaryWords = normalize(metadata.summary);

    let score = 0;

    for (const queryWord of queryWords) {

      if (themeWords.includes(queryWord)) {
        score += 5;
      }

      if (summaryWords.includes(queryWord)) {
        score += 3;
      }
    }

    return {
      metadata,
      score,
    };
  });

  return scoredMetadata
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ metadata, score }) => {

      const verse = ALL_VERSES.find(
        (verse) => verse.ref === metadata.ref
      );

      return verse
        ? { verse, score }
        : null;
    })
    .filter(
      (candidate): candidate is VerseCandidate =>
        candidate !== null
    );
}