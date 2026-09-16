import { callGemini } from "@/lib/ai/gemini";
import type {
  MessageAnalysis,
  VerseCandidate,
  VerifiedVerse,
} from "@/types/chat";

interface RerankResult {
  matchedVerseRef: string;
  reason: string;
}

export async function rerankVerses(
  userMessage: string,
  analysis: MessageAnalysis,
  candidates: VerseCandidate[]
): Promise<VerifiedVerse | null> {
  if (candidates.length === 0) {
    return null;
  }

  const candidateText = candidates
    .map(
      ({ verse }, index) => `
Candidate ${index + 1}
Reference: ${verse.ref}
Transliteration: ${verse.transliteration}
Word Meanings: ${verse.word_meanings}
`
    )
    .join("\n---\n");

  const prompt = `
You are the verse-selection system for Sakhi,
an AI spiritual companion grounded in the Bhagavad Gita.

Your ONLY job is to select the Bhagavad Gita verse that is most
relevant to the user's actual emotional situation.

USER MESSAGE:
"${userMessage}"

EMOTIONAL ANALYSIS:

Emotion: ${analysis.emotion}
Intensity: ${analysis.intensity}
Situation: ${analysis.situation}
Underlying Need: ${analysis.underlyingNeed}

Themes:
${analysis.themes.join(", ")}

CANDIDATE VERSES:

${candidateText}

SELECTION RULES:

1. Select the verse whose teaching is most relevant to the user's
   underlying problem, not merely one containing similar words.

2. Consider the user's situation, emotion and underlying need.

3. Do not select a verse simply because it appears first.

4. You MUST select only from the provided candidate verses.

5. Never invent a Bhagavad Gita reference.

Return valid JSON only:

{
  "matchedVerseRef": "2.47",
  "reason": "Brief internal explanation of why this verse is relevant."
}
`;

  try {
    const result = await callGemini(prompt, {
      temperature: 0,
    });

    const parsed = JSON.parse(result) as RerankResult;

    return (
      candidates.find(
        ({ verse }) => verse.ref === parsed.matchedVerseRef
      )?.verse ?? null
    );
  } catch (error) {
    console.error("Verse reranking failed:", error);

    return candidates[0]?.verse ?? null;
  }
}