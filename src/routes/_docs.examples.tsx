import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { examplesMd } from "@/content/examples";

export const Route = createFileRoute("/_docs/examples")({
  head: () => ({
    meta: [
      { title: "Examples — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          "Example ECP manifests: customer support, framework integrations, and Streamable HTTP demos.",
      },
      { property: "og:title", content: "Examples — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "Working ECP demos across plain Python and major agent frameworks.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const headings = useMemo(() => extractHeadings(examplesMd), []);
  return (
    <>
      <article className="min-w-0 py-10">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Demos
        </div>
        <Markdown source={examplesMd} />
      </article>
      <OnThisPage headings={headings} />
    </>
  );
}
