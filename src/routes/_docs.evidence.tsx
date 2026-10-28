import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { getDoc } from "@/lib/docs";

const doc = getDoc("evidence");

export const Route = createFileRoute("/_docs/evidence")({
  head: () => ({
    meta: [
      { title: "Evidence — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "What has been measured about ECP, how, and how far the numbers can be trusted.",
      },
      { property: "og:title", content: "Evidence — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "Measured results for ECP, with their limitations.",
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
          Evidence
        </div>
        <Markdown source={doc.body} />
      </article>
      <OnThisPage headings={headings} />
    </>
  );
}
