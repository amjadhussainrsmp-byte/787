import type { ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bookmark, Menu, Search, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Mark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/lib/favorites";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/poetry", label: "Poetry" },
  { to: "/poets", label: "Poets" },
  { to: "/quotes", label: "Quotes" },
  { to: "/qawwali", label: "Qawwali" },
  { to: "/stories", label: "Stories" },
  { to: "/terms", label: "Terms" },
  { to: "/places", label: "Places" },
] as const;

function NavLinks({ onClick, className }: { onClick?: () => void; className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {NAV.map((item) => {
        const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClick}
            className={cn(
              "flex h-11 items-center rounded-md px-3 text-sm transition-colors duration-quick ease-smooth",
              active ? "bg-bg-deep text-fg" : "text-muted hover:text-fg",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const saved = useFavorites((s) => Object.values(s.items).reduce((n, arr) => n + arr.length, 0));
  const hydrated = useHydrated();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      void navigate({ to: "/search", search: { q: "" } });
      return;
    }
    void navigate({ to: "/search", search: { q: query } });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:h-[4.5rem] md:px-6">
        <Link to="/" className="flex items-center gap-2 text-fg">
          <Mark className="size-8" />
          <span className="font-display text-2xl tracking-tight">Noornama</span>
        </Link>
        <NavLinks className="ml-4 hidden lg:flex" />
        <div className="ml-auto flex items-center gap-1">
          <form onSubmit={onSearch} className="hidden md:block">
            <label className="sr-only" htmlFor="header-search">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <Input
                id="header-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search kalam, poets, terms"
                className="h-10 w-56 pl-9 lg:w-72"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link to="/search" search={{ q: "" }} aria-label="Search">
              <Search className="size-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/favorites" aria-label="Saved verses">
              <span className="relative">
                <Bookmark className="size-5" />
                {hydrated && saved > 0 ? (
                  <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-fg tabular-nums">
                    {saved > 9 ? "9+" : saved}
                  </span>
                ) : null}
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-border bg-bg px-4 py-3 lg:hidden">
          <NavLinks onClick={() => setOpen(false)} className="flex-col items-stretch" />
          <Link
            to="/articles"
            onClick={() => setOpen(false)}
            className="flex h-11 items-center rounded-md px-3 text-sm text-muted"
          >
            Articles
          </Link>
          <Link
            to="/ebooks"
            onClick={() => setOpen(false)}
            className="flex h-11 items-center rounded-md px-3 text-sm text-muted"
          >
            Library
          </Link>
        </div>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-bg-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Mark className="size-7" />
            <span className="font-display text-2xl">Noornama</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            A reading-room of Sufi poetry, sant vani, qawwali kalam, and the old stories. A lamp on a
            table — not a shrine, not a school.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Browse</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">The shelf</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/articles" className="text-muted hover:text-fg">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/ebooks" className="text-muted hover:text-fg">
                E-books
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-muted hover:text-fg">
                Saved
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted hover:text-fg">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-subtle">
        Public-domain verse, retold in a new room. Noornama is not affiliated with any dargah or publisher.
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  dek,
}: {
  kicker?: string;
  title: string;
  dek?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:px-6 md:pt-16">
      {kicker ? (
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-subtle">{kicker}</p>
      ) : null}
      <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight md:text-5xl">{title}</h1>
      {dek ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{dek}</p> : null}
    </header>
  );
}
