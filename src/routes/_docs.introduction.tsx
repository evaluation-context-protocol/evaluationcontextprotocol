import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { getDoc } from "@/lib/docs";

const doc = getDoc("getting-started/intro");

export const Route = createFileRoute("/_docs/introduction")({
  head: () => ({
    meta: [
      { title: "Introduction — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Overview of the Evaluation Context Protocol: portable agent evaluations across frameworks, models, and CI systems.",
      },
      { property: "og:title", content: "Introduction — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "What ECP is, why it exists, and what it checks.",
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
          Get started
        </div>
        <Markdown source={doc.body} />
      </article>
      <OnThisPage headings={headings} />
    </>
  );
}
