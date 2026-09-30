import { findEntry, type RawSlideContent } from "./content-bank";

export type Tone = "Educational" | "Provocative / Viral" | "Step-by-Step Tutorial" | "Cheat Sheet";

export const TONES: Tone[] = ["Educational", "Provocative / Viral", "Step-by-Step Tutorial", "Cheat Sheet"];

const HOOKS: Record<Tone, (t: string) => string> = {
  Educational: (t) => `${t}, explained in plain English`,
  "Provocative / Viral": (t) => `You're probably doing ${t} wrong`,
  "Step-by-Step Tutorial": (t) => `${t}: the step-by-step playbook`,
  "Cheat Sheet": (t) => `The only ${t} cheat sheet you need`,
};

const GENERIC_BODIES = [
  "Start with the fundamentals. Most people skip this and end up debugging symptoms instead of causes.",
  "Write it down before you build it. A five-line outline saves an hour of rework.",
  "Measure before you optimise. Intuition is a terrible profiler.",
  "Keep the interface small. Every extra option is a future support ticket.",
  "Automate the boring half. Your future self will thank you at 2am.",
  "Document the decision, not just the code. Context decays faster than syntax.",
  "Ship the smallest useful version, then iterate with real feedback.",
];

export function generateRaw(topic: string, count: number, tone: Tone): RawSlideContent[] {
  const clean = topic.trim() || "Your Topic";
  const entry = findEntry(clean);
  if (entry) {
    const middle = entry.slides.filter((s) => s.type !== "hook" && s.type !== "cta");
    const body = middle.slice(0, Math.max(1, count - 2));
    while (body.length < count - 2) body.push(middle[body.length % middle.length]!);
    return [entry.slides[0]!, ...body, entry.slides[entry.slides.length - 1]!];
  }
  const middleCount = Math.max(1, count - 2);
  const slides: RawSlideContent[] = [
    {
      type: "hook",
      title: HOOKS[tone](clean),
      body: `${middleCount} ideas that change how you think about ${clean.toLowerCase()}.`,
    },
  ];
  for (let i = 0; i < middleCount; i++) {
    if (i === 2 && middleCount > 3) {
      slides.push({
        type: "comparison",
        title: `${clean}: myth vs reality`,
        compare: {
          leftTitle: "Myth",
          left: "It has to be complex\nMore tools = more speed\nPerfect the first time",
          rightTitle: "Reality",
          right: "Simple scales better\nFewer tools, deeper skill\nIterate in public",
        },
      });
      continue;
    }
    slides.push({
      type: "content",
      title: `${String(i + 1).padStart(2, "0")} · Key idea about ${clean.toLowerCase()}`,
      body: GENERIC_BODIES[i % GENERIC_BODIES.length]!,
    });
  }
  slides.push({
    type: "cta",
    title: "Save this for later",
    body: "Follow for more breakdowns like this.",
  });
  return slides;
}

export function categoryFor(topic: string) {
  const entry = findEntry(topic);
  return entry?.category ?? (topic.split(/\s+/)[0] || "INSIGHT").toUpperCase().slice(0, 16);
}

export function titleFor(topic: string) {
  const entry = findEntry(topic);
  return entry?.title ?? (topic.trim() || "Untitled Carousel");
}

/** Simulated generation stream — yields status lines while "thinking". */
export async function streamGeneration(
  topic: string,
  count: number,
  onTick: (line: string) => void,
) {
  const steps = [
    `Researching "${topic || "your topic"}"…`,
    "Drafting a scroll-stopping hook…",
    `Structuring ${count} slides…`,
    "Writing body copy and code samples…",
    "Applying brand kit and auto-layout…",
    "Running pre-flight checks…",
  ];
  for (const s of steps) {
    onTick(s);
    await new Promise((r) => setTimeout(r, 380));
  }
}
