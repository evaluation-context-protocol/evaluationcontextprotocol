import { useEffect, useState } from "react";

export type Heading = { id: string; text: string; depth: number };

export function OnThisPage({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[8.5rem] max-h-[calc(100vh-9rem)] overflow-y-auto pb-12 pl-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </div>
        <ul className="space-y-1.5 border-l border-border">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: (h.depth - 2) * 12 + 12 }}>
              <a
                href={`#${h.id}`}
                className={`-ml-px block border-l text-[13px] transition-colors ${
                  active === h.id
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={{ paddingLeft: 8 }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
