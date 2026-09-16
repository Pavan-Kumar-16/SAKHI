import versesData from "@/data/gita-verses-verified.json";
import type { VerifiedVerse } from "@/types/chat";

const ALL_VERSES = versesData as VerifiedVerse[];

/**
 * Validates that a selected verse exists
 * in the verified Bhagavad Gita dataset.
 */
export function validateVerse(
  verse: VerifiedVerse | null
): VerifiedVerse | null {
  if (!verse?.ref) {
    return null;
  }

  const verifiedVerse = ALL_VERSES.find(
    (item) => item.ref === verse.ref
  );

  return verifiedVerse ?? null;
}