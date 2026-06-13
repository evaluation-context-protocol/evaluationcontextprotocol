import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { getDoc } from "@/lib/docs";

const doc = getDoc("specification/index");

export const Route = createFileRoute("/_docs/spec")({
  head: () => ({
    meta: [
      { title: "Specification — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "The ECP JSON-RPC 2.0 contract: transports, methods, manifest format, graders, reports, and JSON schemas.",
      },
      { property: "og:title", content: "Specification — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "JSON-RPC 2.0 contract for portable agent evaluations.",
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
          Reference
        </div>
        <Markdown source={doc.body} />
      </article>
      <OnThisPage headings={headings} />
    </>
  );
}
