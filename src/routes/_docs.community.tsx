import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Markdown, extractHeadings } from "@/components/markdown";
import { OnThisPage } from "@/components/on-this-page";
import { getDoc } from "@/lib/docs";

const doc = getDoc("community/index");

export const Route = createFileRoute("/_docs/community")({
  head: () => ({
    meta: [
      { title: "Community — Evaluation Context Protocol" },
      {
        name: "description",
        content:
          doc.frontmatter.description ??
          "ECP is an open protocol. Find the repository, contribute to the spec or runtime, and validate your implementation.",
      },
      { property: "og:title", content: "Community — Evaluation Context Protocol" },
      {
        property: "og:description",
        content: "Repository, contributing, and conformance for the ECP open protocol.",
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
          Project
        </div>
        <Markdown source={doc.body} />
      </article>
      <OnThisPage headings={headings} />
    </>
  );
}
