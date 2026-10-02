import type { ScriptKind, Verse } from "@/lib/catalog/types";
import { useScriptMode } from "@/lib/script-mode";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const rtlScripts: ScriptKind[] = ["urdu", "persian", "arabic", "punjabi", "sindhi"];

function OriginalText({
  text,
  script,
  size = "lg",
}: {
  text: string;
  script: ScriptKind;
  size?: "lg" | "md";
}) {
  const isRtl = rtlScripts.includes(script);
  const isIndic = script === "hindi";
  return (
    <p
      className={cn(
        "whitespace-pre-line text-fg",
        isRtl && "font-nastaliq text-right",
        isIndic && "font-devanagari",
        !isRtl && !isIndic && "font-display",
        size === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
      )}
      dir={isRtl ? "rtl" : "ltr"}
      lang={script === "persian" || script === "urdu" ? "ur" : undefined}
    >
      {text}
    </p>
  );
}

export function VerseLines({
  original,
  originalScript,
  hindi,
  roman,
  english,
  size = "lg",
}: {
  original: string;
  originalScript: ScriptKind;
  hindi?: string;
  roman?: string;
  english: string;
  size?: "lg" | "md";
}) {
  const stored = useScriptMode((s) => s.mode);
  const hydrated = useHydrated();
  const mode = hydrated ? stored : "all";
  const show = (key: "original" | "hindi" | "roman" | "english") =>
    mode === "all" || mode === key;

  return (
    <div className="flex flex-col gap-5">
      {show("original") ? <OriginalText text={original} script={originalScript} size={size} /> : null}
      {show("hindi") && hindi ? (
        <p
          className={cn(
            "whitespace-pre-line font-devanagari text-ink-soft",
            size === "lg" ? "text-xl md:text-2xl" : "text-lg",
          )}
        >
          {hindi}
        </p>
      ) : null}
      {show("roman") && roman ? (
        <p
          className={cn(
            "whitespace-pre-line font-display italic text-muted",
            size === "lg" ? "text-xl md:text-2xl" : "text-lg",
          )}
        >
          {roman}
        </p>
      ) : null}
      {show("english") ? (
        <p
          className={cn(
            "whitespace-pre-line font-display text-ink-soft",
            size === "lg" ? "text-xl leading-snug md:text-2xl" : "text-lg leading-snug",
          )}
        >
          {english}
        </p>
      ) : null}
    </div>
  );
}

export function VerseBlock({ verse, size = "lg" }: { verse: Verse; size?: "lg" | "md" }) {
  return (
    <VerseLines
      original={verse.original}
      originalScript={verse.originalScript}
      hindi={verse.hindi}
      roman={verse.roman}
      english={verse.english}
      size={size}
    />
  );
}
