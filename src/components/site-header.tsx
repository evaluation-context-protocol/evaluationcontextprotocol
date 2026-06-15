import { Link, useRouterState } from "@tanstack/react-router";
import { Github, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { tabs, tabForPath } from "@/lib/nav";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeTab = tabForPath(pathname);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/favicon.png"
            alt="ECP"
            className="h-6 w-6 rounded object-cover"
          />
          <span className="text-[15px] font-semibold tracking-tight">
            Evaluation Context Protocol
          </span>
        </Link>

        <div className="ml-auto flex max-w-md flex-1 items-center">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search documentation..."
              className="h-9 w-full rounded-md border border-border bg-muted/40 pl-9 pr-12 text-sm outline-none transition-colors focus:border-ring focus:bg-background"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
              ⌘K
            </kbd>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <a
            href="https://github.com/evaluation-context-protocol/ecp"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </nav>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-6">
          {tabs.map((t) => {
            const active = t.label === activeTab;
            return (
              <Link
                key={t.label}
                to={t.to}
                className={`relative px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-foreground" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
