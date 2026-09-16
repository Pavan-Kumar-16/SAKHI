import { NextResponse } from "next/server";

import { analyzeMessage } from "@/lib/ai/analyzeMessage";
import { generateResponse } from "@/lib/ai/generateResponse";
import { retrieveVerses } from "@/lib/rag/retrieveVerses";
import { rerankVerses } from "@/lib/rag/rerankVerses";
import { validateVerse } from "@/lib/rag/validateVerse";

import type { ChatMessage } from "@/types/chat";

interface ChatRequestBody {
  messages: ChatMessage[];
  currentMood?: string;
  userName?: string;
  language?: string;
}

export async function POST(request: Request) {
  try {
    // 1. Read request body
    const body = (await request.json()) as ChatRequestBody;

    const {
      messages = [],
      currentMood = "general",
      userName,
      language = "english",
    } = body;

    // 2. Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          error: "At least one message is required.",
        },
        {
          status: 400,
        }
      );
    }

    // 3. Get latest user message
    const latestUserMessage = [...messages]
      .reverse()
      .find((message) => message.sender === "user");

    if (!latestUserMessage?.text?.trim()) {
      return NextResponse.json(
        {
          error: "A valid user message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const userMessage = latestUserMessage.text.trim();

    // 4. Analyse the user's emotional state and situation
    const analysis = await analyzeMessage(
      userMessage,
      messages
    );

    console.log("Sakhi Message Analysis:", analysis);

    // 5. If we don't understand the situation yet,
    // generate a natural follow-up response without forcing a verse
    if (analysis.needsMoreContext) {
      const reply = await generateResponse({
        userMessage,
        analysis,
        verse: null,
        conversationHistory: messages,
        userName,
        language,
        currentMood,
      });

      return NextResponse.json({
        reply,
        verse: null,
        analysis,
      });
    }

    // 6. Retrieve potentially relevant Bhagavad Gita verses
    const candidates = retrieveVerses(
      userMessage,
      analysis
    );

    console.log(
      "Retrieved Verse Candidates:",
      candidates.map((candidate) => ({
        ref: candidate.verse.ref,
        score: candidate.score,
      }))
    );

    // 7. Semantically rerank candidates and select the best verse
   // 7. Semantically rerank candidates
const rerankedVerse =
  candidates.length > 0
    ? await rerankVerses(
        userMessage,
        analysis,
        candidates
      )
    : null;

// 8. Validate against the verified 701-verse dataset
const selectedVerse = validateVerse(rerankedVerse);

    // 8. Generate Sakhi's final conversational response
    const reply = await generateResponse({
      userMessage,
      analysis,
      verse: selectedVerse,
      conversationHistory: messages,
      userName,
      language,
      currentMood,
    });

    // 9. Return response to frontend
    return NextResponse.json({
      reply,
      verse: selectedVerse,
      analysis,
    });
  } catch (error) {
    console.error("Sakhi Chat API Error:", error);

    return NextResponse.json(
      {
        error:
          "Sakhi is unable to respond right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}