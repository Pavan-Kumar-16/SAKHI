import { callGemini } from "./gemini";
import type { MessageAnalysis, ChatMessage } from "@/types/chat";

export async function analyzeMessage(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<MessageAnalysis> {

  const recentConversation = conversationHistory
    .slice(-6)
    .map(
  (message) =>
    `${message.sender === "user" ? "User" : "Sakhi"}: ${message.text}`
)
    .join("\n");

  const prompt = `
You are the internal emotional analysis system for Sakhi,
an AI spiritual companion based on the Bhagavad Gita.

Your job is NOT to answer the user.
Your job is to understand what the user is experiencing so that
another system can retrieve relevant Bhagavad Gita teachings.

RECENT CONVERSATION:
${recentConversation || "No previous conversation"}

CURRENT USER MESSAGE:
"${userMessage}"

Analyse the user's message and identify:

1. emotion:
   The primary emotion being experienced.

2. intensity:
   Must be exactly one of:
   "low", "medium", or "high".

3. situation:
   Briefly describe what is happening in the user's life.
   If unknown, return "unknown".

4. underlyingNeed:
   Identify what the person may need emotionally or practically.

5. themes:
   Return 2-5 conceptual themes that can be used to retrieve
   relevant Bhagavad Gita teachings.

   Examples:
   - fear of failure
   - attachment to results
   - grief and loss
   - anger and self-control
   - uncertainty
   - duty
   - courage
   - inner peace
   - self-doubt
   - relationships

6. needsMoreContext:
   Return true when there is not enough information to understand
   the user's actual situation.

IMPORTANT:
Do not generate spiritual advice.
Do not select a Bhagavad Gita verse.
Do not answer the user.
Only analyse their emotional state and situation.

Return valid JSON only in exactly this structure:

{
  "emotion": "string",
  "intensity": "low | medium | high",
  "situation": "string",
  "underlyingNeed": "string",
  "themes": ["string"],
  "needsMoreContext": true
}
`;

  try {
    const result = await callGemini(prompt, {
      temperature: 0.1,
    });

    const analysis = JSON.parse(result) as MessageAnalysis;

    return analysis;
  } catch (error) {
    console.error("Message analysis failed:", error);

    return {
      emotion: "unknown",
      intensity: "medium",
      situation: "unknown",
      underlyingNeed: "understanding and support",
      themes: ["inner peace"],
      needsMoreContext: true,
    };
  }
}