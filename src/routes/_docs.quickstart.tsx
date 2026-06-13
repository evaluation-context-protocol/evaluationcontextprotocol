import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { getDoc } from "@/lib/docs";

const doc = getDoc("getting-started/quickstart");

export const Route = createFileRoute("/_docs/quickstart")({
  head: () => ({
    meta: [
      { title: "Quickstart — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "Install the ECP runtime, create a starter eval, and run your first portable agent evaluation.",
      },
      { property: "og:title", content: "Quickstart — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "Run your first ECP evaluation in a few commands.",
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
