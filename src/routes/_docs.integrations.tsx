import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { getDoc } from "@/lib/docs";

const doc = getDoc("integrations");

export const Route = createFileRoute("/_docs/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Test any ECP agent from Promptfoo, DeepEval or your own harness.",
      },
      { property: "og:title", content: "Integrations — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "Use ECP with Promptfoo, DeepEval or your own evaluation harness.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const headings = useMemo(() => extractHeadings(doc.body), []);
  return (
    <>
      <article className="min-w-0 py-10">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Integrations
        </div>
        <Markdown source={doc.body} />
      </article>
      <OnThisPage headings={headings} />
    </>
  );
}
