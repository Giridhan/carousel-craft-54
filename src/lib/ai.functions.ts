import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const generateCarousel = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ topic: z.string().min(1).max(200), count: z.number().int().min(3).max(10), tone: z.string().max(40) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { generateWithAI } = await import("./ai.server");
    try {
      return { ok: true as const, ...(await generateWithAI(data.topic, data.count, data.tone)) };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      const msg =
        status === 402
          ? "AI credits are used up — add credits in Settings → Plans & credits."
          : status === 429
            ? "AI is busy right now — try again in a moment."
            : e instanceof Error
              ? e.message
              : "AI generation failed.";
      console.error("generateCarousel failed", e);
      return { ok: false as const, error: msg };
    }
  });
