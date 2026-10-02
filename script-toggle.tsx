import { SCRIPT_OPTIONS, useScriptMode, type ScriptMode } from "@/lib/script-mode";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

export function ScriptToggle({ className }: { className?: string }) {
  const stored = useScriptMode((s) => s.mode);
  const setMode = useScriptMode((s) => s.setMode);
  const hydrated = useHydrated();
  const mode = hydrated ? stored : "all";

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-lg bg-bg-deep p-1",
        className,
      )}
      role="tablist"
      aria-label="Script"
    >
      {SCRIPT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="tab"
          aria-selected={mode === opt.id}
          onClick={() => setMode(opt.id as ScriptMode)}
          className={cn(
            "h-9 rounded-md px-3 text-sm transition-[background-color,color] duration-quick ease-smooth",
            mode === opt.id
              ? "bg-surface text-fg shadow-[var(--shadow-border)]"
              : "text-muted hover:text-fg",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
