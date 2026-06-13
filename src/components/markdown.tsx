import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useMemo } from "react";
import { CodeBlock } from "./code-block";
import type { Heading } from "./on-this-page";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(md: string): Heading[] {
  const out: Heading[] = [];
  const lines = md.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+)$/.exec(line);
    if (m) {
      const text = m[2].replace(/`/g, "").trim();
      out.push({ id: slugify(text), text, depth: m[1].length });
    }
  }
  return out;
}

export function Markdown({ source }: { source: string }) {
  const content = useMemo(() => source, [source]);
  return (
    <div className="prose-doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...rest }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              return <CodeBlock className={className}>{String(children)}</CodeBlock>;
            }
            return (
              <code className={className} {...rest}>
                {children}
              </code>
            );
          },
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
