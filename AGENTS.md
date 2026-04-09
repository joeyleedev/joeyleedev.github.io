# AGENTS.md

This file is the default working guide for AI coding agents operating in this repository, including Codex and other tool-neutral agents.

## 1. Project Summary

- Project name: `yizi-space`
- Product type: Chinese-language personal blog / portfolio site
- Framework: Next.js 14 App Router + React 18 + TypeScript
- Styling: Tailwind CSS + shadcn/ui + Radix UI + `next-themes`
- Deployment model: fully static export to GitHub Pages

The most important constraint in this repo is that the site must continue to work as a static export. Prefer changes that preserve build-time rendering and avoid introducing runtime server dependencies.

## 2. Environment And Commands

Recommended setup:

```bash
fnm use
corepack enable
pnpm install
```

Common commands:

```bash
pnpm dev         # local development
pnpm lint        # eslint
pnpm type-check  # tsc --noEmit
pnpm build       # next build -> out/
pnpm validate    # verify static export output
pnpm clean       # remove build/cache artifacts
```

Version expectations:

- Node.js `>=24.14.1 <25`
- pnpm `>=10.33.0 <11`

## 3. Repository Map

- `app/`: App Router pages, layouts, and route-level UI
- `app/blog/[id]/`: static blog detail route
- `components/`: reusable UI and navigation components
- `content/posts/`: Markdown blog posts
- `lib/utils/blog.ts`: blog content loading/parsing
- `lib/constants.ts`: site metadata, nav items, social links
- `public/`: static assets
- `styles/`: extra styles such as markdown presentation
- `scripts/validate-build.js`: post-build validation

## 4. Architecture Notes

### Static export is non-negotiable

`next.config.mjs` enables:

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`
- build output in `out/`

Agents should avoid introducing features that depend on a long-running Node server or platform runtime, such as:

- API routes as a required production dependency
- middleware-dependent logic
- server actions that assume a live server
- image optimization that requires Next.js runtime support

If a requested feature conflicts with static export, call that out clearly before implementing.

### Server and client components

Keep page-level data fetching in server components when possible. Put interactivity into explicit `"use client"` components instead of turning whole routes into client components without need.

### Blog content model

Posts are stored as Markdown files under `content/posts/`.

Conventions:

- filename pattern: `YYYY-MM-DD-slug.md`
- frontmatter fields in active use: `title`, `date`, `desc`
- route param / post id is derived from the filename without `.md`
- post images should live under `public/images/posts/{slug}/`

`lib/utils/blog.ts` reads from the filesystem at build time. Any content model changes should keep `getAllPosts()` and `getPostById()` consistent with the actual Markdown shape.

## 5. Working Agreements For Agents

### Prefer small, compatible changes

When editing this repo:

- preserve existing static-export compatibility
- preserve Chinese UI copy unless the task asks for copywriting changes
- reuse existing utilities and constants instead of hardcoding duplicates
- follow current file organization before inventing new layers
- keep route additions compatible with pre-rendering

### Be careful with content-driven routes

If you change blog routing or post loading:

- ensure `app/blog/[id]/page.tsx` still supports static generation
- ensure every route can be derived at build time
- ensure missing-content behavior remains graceful

### Respect current UI stack

The codebase already uses shadcn-style components, Tailwind utilities, and `next-themes`. Prefer extending those patterns rather than mixing in a new UI system.

### Keep metadata centralized

Site name, description, nav links, and social links belong in `lib/constants.ts` unless there is a strong reason to relocate them.

## 6. Style And Formatting

- TypeScript-first changes are preferred
- use the `@/*` path alias where it improves clarity
- match the existing Prettier setup:
  - print width `100`
  - double quotes
  - trailing comma `es5`
- keep Tailwind class ordering formatter-friendly
- add comments only when they clarify non-obvious intent

## 7. Validation Expectations

Choose checks based on the scope of the change.

Run these when relevant:

- `pnpm type-check` for TypeScript changes
- `pnpm lint` for UI/component/page changes
- `pnpm build` when routing, config, rendering, or content-loading changes
- `pnpm validate` after build-related changes

Minimum recommendation before handoff:

- for docs-only changes: no build required
- for code changes: `pnpm type-check`
- for routing/config/content pipeline changes: `pnpm build && pnpm validate`

## 8. Good First Places To Look

Depending on the task:

- site-wide metadata / navigation: `lib/constants.ts`
- homepage layout/content: `app/page.tsx`
- blog index: `app/blog/page.tsx` and `app/blog/BlogClient.tsx`
- blog detail page: `app/blog/[id]/page.tsx` and `app/blog/[id]/BlogDetailClient.tsx`
- theme behavior: `components/theme/*`
- navbar / navigation behavior: `components/navigation/*`

## 9. Avoid These Mistakes

- Do not assume a server runtime exists in production.
- Do not add features that only work with `next start` but not `next export`.
- Do not break trailing-slash-compatible asset or route paths.
- Do not move blog metadata into a shape that existing parsers cannot read.
- Do not silently change user-facing language from Chinese to English.

## 10. Relationship To Other Agent Docs

`CLAUDE.md` contains the same repository guidance packaged for Claude Code. Keep the shared project facts and workflow expectations in sync across both files.
