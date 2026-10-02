import { Link } from "@tanstack/react-router";
import type { Poet } from "@/lib/catalog/types";
import { versesByPoet } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function PoetMark({ poet, className }: { poet: Poet; className?: string }) {
  const initial = poet.name.replace("Jalaluddin ", "").replace("Amir ", "").charAt(0);
  return (
    <div
      className={cn(
        "relative flex size-16 shrink-0 items-center justify-center rounded-xl",
        className,
      )}
      style={{ background: poet.hue }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="absolute inset-1 text-primary-fg/25">
        <rect x="11" y="11" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect
          x="11"
          y="11"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          transform="rotate(45 20 20)"
        />
      </svg>
      <span className="relative font-display text-2xl text-primary-fg">{initial}</span>
    </div>
  );
}

export function PoetCard({ poet }: { poet: Poet }) {
  const count = versesByPoet(poet.slug).length;
  return (
    <Link
      to="/poets/$slug"
      params={{ slug: poet.slug }}
      className="group flex gap-4 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-fast ease-smooth hover:shadow-[var(--shadow-border-hover)]"
    >
      <PoetMark poet={poet} />
      <div className="min-w-0">
        <h3 className="font-display text-xl leading-tight text-fg group-hover:text-primary">
          {poet.name}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {poet.years} · {poet.place}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-subtle">
          {poet.tradition}
          {count ? ` · ${count} verses` : ""}
        </p>
      </div>
    </Link>
  );
}
