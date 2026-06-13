# Evaluation Context Protocol — Docs Site

A multi-page documentation site for the Evaluation Context Protocol (ECP), modeled visually on `modelcontextprotocol.io` (Mintlify-style: clean header with global search/GitHub/theme toggle, second-level tab nav, sidebar + content + on-this-page TOC, monochrome accent, generous whitespace). Content is sourced from `evaluationcontextprotocol.io` via Firecrawl.

## Scope

A TanStack Start site with a shared shell (top bar + tab nav) and a docs layout (left sidebar, article, right TOC):

```text
/                          Landing / Introduction
/quickstart                Install + first eval walkthrough
/spec                      Specification (JSON-RPC methods, manifest, graders)
/concepts/public-output    What ECP checks: public_output
/concepts/tool-calls         tool_calls
/concepts/evaluation-context evaluation_context
/runtime                   ecp CLI + CI usage
/frameworks                LangChain / LlamaIndex / CrewAI / PydanticAI adapters
/examples                  Example manifests gallery
/community                 GitHub, contributing, license
```

Top-level tabs (mirrors MCP's tab row): **Documentation · Specification · Examples · Community**. The sidebar swaps based on the active tab.

## Visual direction

MCP-site DNA, ECP-branded:
- Light + dark theme via existing `:root` / `.dark` tokens. Near-white background light, near-black dark. Single subtle accent (deep indigo/slate — distinct from MCP's neutral but in the same family).
- Typography: Inter (UI) + JetBrains Mono (code). Tight, large h1; small uppercase eyebrow ("Get started") above page titles.
- Header: logo left, centered search input (`⌘K` chip, non-functional client-side filter over a static doc index), GitHub link + theme toggle right. Second row: tab nav.
- Docs page: 3-column grid (sidebar 260px / content / TOC 220px). Sticky sidebar + TOC. Code blocks with copy button, language label, dark syntax theme in both modes.
- Landing page: short hero ("Portable evaluations for AI agents."), the "MCP vs ECP" contract sentence, a simple diagram (runtime ↔ agent over JSON-RPC), the "What ECP Checks" 4-row table as cards, framework logos row, CTA buttons (Quickstart / GitHub).

## Content sourcing

Scrape the live ECP site once at build time of the plan (not runtime): home, quickstart, spec, and any linked subpages. Convert each markdown page into a route's body via a small `react-markdown` + `remark-gfm` render with a custom code block component. Store the markdown as static `.md` files under `src/content/` so the site has no runtime dependency on Firecrawl.

## Technical details

- TanStack Start file-based routing under `src/routes/` — one file per page above, plus `__root.tsx` (header + tab nav + theme provider + outlet) and `_docs.tsx` pathless layout that adds the sidebar/TOC frame for everything except `/`.
- New components: `SiteHeader`, `TabNav`, `DocsSidebar` (data-driven from a `src/lib/nav.ts` tree), `OnThisPage` (derives headings from rendered markdown), `Search` (client filter, no backend), `ThemeToggle` (class on `<html>`), `Markdown` (wraps react-markdown), `CodeBlock` (copy button).
- Add `react-markdown`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `shiki` (or `rehype-pretty-code`) for syntax highlighting. Static, all rendered at build/SSR — no server functions needed.
- Per-route `head()` metadata: unique title + description for each page; `og:image` only on the landing route (generated hero card).
- No auth, no DB, no Lovable Cloud. Fully static + SSR.

## Out of scope (for this pass)

- Real full-text search backend (Algolia/Inkeep) — UI only.
- "Ask AI" assistant button shown on MCP — omitted unless requested later.
- Versioned docs switcher.

After approval I'll scrape the remaining ECP pages, scaffold the routes and shell, drop the markdown into `src/content/`, and wire the docs layout.
