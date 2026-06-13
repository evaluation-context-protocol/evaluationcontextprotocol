# ECP Documentation

This folder holds the content for the ECP docs site, organized to mirror the
[Model Context Protocol docs](https://github.com/modelcontextprotocol/modelcontextprotocol/tree/main/docs).

## Structure

```
docs/
  docs.json                       # navigation (Mintlify-compatible schema)
  getting-started/
    intro.mdx                     # /introduction
    quickstart.mdx                # /quickstart
  specification/
    index.mdx                     # /spec
  examples.mdx                    # /examples
  community/
    index.mdx                     # /community
```

Add new sections by creating folders and `.mdx` files here, then add them
to `docs.json` and to `src/lib/nav.ts` in the site.

## Format

Files are `.mdx` with optional YAML frontmatter:

```mdx
---
title: My Page
description: Short summary used for SEO/social.
---

# My Page

Standard Markdown plus fenced code blocks. JSX components are not currently
rendered — keep content to plain Markdown for portability.
```

## How the site reads these

The TanStack Start site loads every `docs/**/*.mdx` file at build time via
Vite's `import.meta.glob`, strips frontmatter, and renders the body with
`react-markdown`. Editing an `.mdx` file (here or via GitHub) updates the
site on the next build — no code change required for content edits.
