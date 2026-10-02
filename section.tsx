import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ActionHref = "/poets" | "/terms" | "/places" | "/stories" | "/qawwali" | "/quotes" | "/articles";

export function Section({
  kicker,
  title,
  action,
  href,
  children,
  className,
}: {
  kicker?: string;
  title: string;
  action?: string;
  href?: ActionHref;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-14 md:px-6", className)}>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          {kicker ? (
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-subtle">{kicker}</p>
          ) : null}
          <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">{title}</h2>
        </div>
        {href && action ? (
          <Link to={href} className="shrink-0 text-sm text-primary hover:underline">
            {action}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
