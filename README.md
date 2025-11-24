# OLU Ayurveda Treatments Page

This monorepo hosts a client-side React SPA and an Express server that together deliver a serene, Ayurveda-inspired landing experience mirroring the look and feel of [oluayurvedabeach.lk](https://www.oluayurvedabeach.lk/).

## Structure

- `client/` – React 18 + Vite + TailwindCSS + Framer Motion single-page app
- `server/` – Express server that serves the built client with security and compression middleware
- `package.json` (root) – scripts for running both workspaces concurrently

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (install globally if needed: `npm install -g pnpm`)

## Install

```bash
# from repository root
pnpm install --filter ./client --filter ./server
```

## Scripts

```bash
pnpm dev    # run client (Vite) and server (Express) together
pnpm build  # build client and server outputs
pnpm start  # serve the production build through Express
```

## Assets

Replace the placeholder images in `client/public/img/` with high-quality spa visuals to align with the brand once available.

