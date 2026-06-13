import { Link, useRouterState } from "@tanstack/react-router";
import { sidebarByTab, tabForPath } from "@/lib/nav";

export function DocsSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tab = tabForPath(pathname);
  const groups = sidebarByTab[tab] ?? [];

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[8.5rem] max-h-[calc(100vh-9rem)] overflow-y-auto pb-12 pr-4">
        <nav className="space-y-6">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {g.label}
              </div>
              <ul className="space-y-0.5">
                {g.items.map((item) => {
                  const [path, hash] = item.to.split("#");
                  const active = pathname === path && !hash;
                  return (
                    <li key={item.to}>
                      <Link
                        to={path}
                        hash={hash}
                        className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                          active
                            ? "bg-accent font-medium text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
