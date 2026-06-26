import type { BestieRequest, BestieResponse } from "@/types";

/**
 * Client-side wrapper for POST /api/bestie.
 * Throws on any non-OK response so callers can show the friendly
 * "Bestie got a little confused" message.
 */
export async function askBestie(input: BestieRequest): Promise<string> {
  const res = await fetch("/api/bestie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Bestie request failed with status ${res.status}`);
  }

  const data = (await res.json()) as BestieResponse;
  if (!data.reply) {
    throw new Error("Bestie returned an empty reply");
  }

  return data.reply;
}
