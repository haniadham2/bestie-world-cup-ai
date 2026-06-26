import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  BESTIE_SYSTEM_PROMPT,
  buildBestieUserMessage,
} from "@/lib/bestiePrompt";
import type { BestieRequest, BestieResponse } from "@/types";

// Use the Node.js runtime so the OpenAI SDK and server-only env vars work.
export const runtime = "nodejs";

/**
 * POST /api/bestie
 * Body: { match, moment, vibe }
 * Returns: { reply } — a short, warm Bestie reaction.
 *
 * The OpenAI key is read on the server only and never exposed to the client.
 */
export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[/api/bestie] Missing OPENAI_API_KEY");
    return NextResponse.json(
      { error: "Server is missing its OpenAI key." },
      { status: 500 }
    );
  }

  // Parse and lightly validate the request body.
  let body: Partial<BestieRequest>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const match = body.match?.trim();
  const moment = body.moment?.trim();
  const vibe = body.vibe ?? "Friendly Bestie";

  if (!match || !moment) {
    return NextResponse.json(
      { error: "Both 'match' and 'moment' are required." },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 120,
      messages: [
        { role: "system", content: BESTIE_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildBestieUserMessage({ match, moment, vibe }),
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error("Empty completion from model.");
    }

    const payload: BestieResponse = { reply };
    return NextResponse.json(payload);
  } catch (error) {
    console.error("[/api/bestie] OpenAI request failed:", error);
    return NextResponse.json(
      { error: "Bestie could not respond right now." },
      { status: 502 }
    );
  }
}
