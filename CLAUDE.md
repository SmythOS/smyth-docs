# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the open-source documentation website for SmythOS, an AI agent platform. Built with **Docusaurus 3.8.1** and deployed to `https://smythos.com/docs/`.

## Commands

```bash
npm install          # Install dependencies
npm run start        # Local dev server at http://localhost:3000
npm run build        # Production build to build/
npm run serve        # Serve the production build locally
npm run typecheck    # TypeScript type checking
npm run clear        # Clear Docusaurus cache
```

## Architecture

### Content (`docs/`)
All documentation is written in `.mdx` files organized into 7 sections: `agent-studio/`, `agent-weaver/`, `agent-runtime/`, `agent-deployments/`, `agent-collaboration/`, `agent-templates/`, `account-management/`. Sidebar navigation is configured in `sidebars.ts`.

Every `.mdx` page must include frontmatter:
```mdx
---
title: Page Title
description: Short summary
keywords: [keyword1, keyword2]
sidebar_position: 1
---
```

### Custom Components (`src/components/`)
Reusable React components embedded in MDX. Key ones:
- `BaseCallout` — `<InfoCallout>`, `<TipCallout>`, `<WarningCallout>` variants
- `Card` / `CardGrid` — content cards
- `Spacer` — `<Spacer size="md" />` between sections
- `PageFeedback` — user feedback via Supabase
- `DocsHelpPopup` — context-aware help popup (appears after 200s)

### Configuration
- `docusaurus.config.ts` — main config: Algolia search, Google Tag Manager, Tailwind, Supabase
- `sidebars.ts` — sidebar navigation structure

### External Services
Requires environment variables (injected via GitHub Secrets in CI):
- `ALGOLIA_APP_ID`, `ALGOLIA_API_KEY`, `ALGOLIA_INDEX_NAME` — search
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` — feedback/help popup backend

### Deployment
GitHub Actions workflows in `.github/workflows/`: `dev-deploy.yml` and `prod-deploy.yml`. Deploys to `/opt/apps/smyth-docs/build` via SSH on Node.js 22.

## Documentation Style

From `DOCS_STYLE_GUIDE.md`:
- **Tone:** Conversational, professional, second person ("you can…"). No emojis, no marketing language.
- **Structure:** Short sentences/paragraphs (1–3 sentences). Use `<Spacer size="md" />` between main sections.
- **Callouts:** Use `InfoCallout`, `TipCallout`, or `WarningCallout` only when it adds clarity — not to repeat main text.
- **Terminology:** Use consistent product names: `Studio`, `Spaces`, `Data Pool`.
- **Links:** Descriptive text only. Avoid "click here."
- **Code:** Every snippet must be accurate and runnable.
- Match the page `title` to its sidebar label.
