# SmythOS Documentation

This repository contains the **open source** documentation for SmythOS. The docs are written in Markdown/MDX and built with [Docusaurus 2](https://docusaurus.io/).

The content covers everything from building agents in the cloud-based Studio to running them locally with the Runtime and deploying them in production. Browse the documentation online or run it locally using the instructions below.

## Documentation Overview

The docs are organized into several areas:

- **Introduction** – quickstart, glossary, and core concepts.
- **Studio** – visually build, test, and debug agents.
- **Weaver** – describe your goal and have Weaver create agents with no code.
- **Runtime** – run agents locally or at scale.
- **Deployments** – version and host agents on real-world platforms.
- **Collaboration** – work in teams with Spaces and Groups.
- **Templates** – start fast with prebuilt agent templates.
- **Account Management** – manage subscriptions and integrations.

## Prerequisites

- Node.js **18** or later

## Installation

Install project dependencies:

```bash
npm install
```

## Local Development

Start a local development server and open the site in your browser:

```bash
npm start
```

The website will be available at `http://localhost:3000`.

## Production Build

Generate a static build in the `build/` directory:

```bash
npm run build
```

You can serve the build locally with:

```bash
npm run serve
```

## Project Structure

- `docs/` – MDX files that make up the documentation content.
- `src/` – React components, pages, and styling.
- `static/` – Images and other static assets.
- `docusaurus.config.ts` – Docusaurus configuration.
- `sidebars.ts` – Sidebar navigation setup.

Edit files under `docs/` or `src/` to update the documentation and then submit a pull request.

## Contributing

We welcome contributions and fixes. If you spot an issue or want to add new content:

1. Fork this repository and create a new branch.
2. Make your changes to the Markdown/MDX files in `docs/` or to the components in `src/`.
3. Open a pull request describing your changes.

No production deployment is required to contribute—just open a PR and share your improvements.
