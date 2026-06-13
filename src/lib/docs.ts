// Loads docs/**/*.mdx at build time, strips frontmatter, exposes by slug.
// Slug examples: "getting-started/intro", "specification/index", "examples", "community/index".

const modules = import.meta.glob("/docs/**/*.mdx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type DocFrontmatter = {
  title?: string;
  description?: string;
  [key: string]: unknown;
};

export type DocEntry = {
  slug: string;
  frontmatter: DocFrontmatter;
  body: string;
};

function parseFrontmatter(raw: string): { frontmatter: DocFrontmatter; body: string } {
  if (!raw.startsWith("---")) return { frontmatter: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: {}, body: raw };
  const block = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const fm: DocFrontmatter = {};
  for (const line of block.split("\n")) {
    const m = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    fm[m[1]] = v;
  }
  return { frontmatter: fm, body };
}

const bySlug: Record<string, DocEntry> = {};
for (const [path, raw] of Object.entries(modules)) {
  // "/docs/getting-started/intro.mdx" -> "getting-started/intro"
  const slug = path.replace(/^\/docs\//, "").replace(/\.mdx$/, "");
  const { frontmatter, body } = parseFrontmatter(raw);
  bySlug[slug] = { slug, frontmatter, body };
}

export function getDoc(slug: string): DocEntry {
  const doc = bySlug[slug];
  if (!doc) {
    throw new Error(
      `Doc not found: ${slug}. Available: ${Object.keys(bySlug).join(", ")}`,
    );
  }
  return doc;
}

export function listDocs(): DocEntry[] {
  return Object.values(bySlug);
}
