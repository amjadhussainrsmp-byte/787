import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("text-primary", className)} aria-hidden>
      <rect
        x="11"
        y="11"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="11"
        y="11"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(45 20 20)"
      />
      <circle cx="20" cy="20" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden>
      <span className="h-px flex-1 bg-border" />
      <Mark className="size-5 opacity-70" />
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
