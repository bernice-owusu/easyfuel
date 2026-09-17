# AGENTS.md

## What this is

Single-package React (Vite + TypeScript) app — an EV charging / gas station site template ("Fossil" / "Easy Fuel"). No monorepo, no backend code in this repo.

## Commands

- `npm run dev` — Vite dev server on port 3000 (host 0.0.0.0)
- `npm run build` — production build to `dist/`
- `npm run lint` — runs `tsc --noEmit` (type-check only, no ESLint)
- `npm run preview` — preview the production build
- `npm run clean` — removes `dist/` and `server.js`

There are no test scripts. No ESLint/Prettier configured.

## Environment

Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`. AI Studio injects it at runtime in production. `APP_URL` is also available for deployed environments.

## Path alias

`@` resolves to the project root (configured in both `vite.config.ts` and `tsconfig.json`).

## Structure

- `src/main.tsx` — React entrypoint
- `src/App.tsx` — root component, all page sections composed here
- `src/components/` — section-level components plus two shared utilities: `ServiceCard.tsx` (renders a service card, reused on home + services page) and `Modals.tsx`
- `src/data/fossilData.ts` — all content/data (slides, services, pricing, blog posts)
- `src/types.ts` — shared TypeScript interfaces
- `public/assets/img/` — static images
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (no `tailwind.config` file — uses CSS-based config in `src/index.css`)

## Conventions

- React 19, no routing library; navigation is hash-based — `#/services` renders the `AllServicesPage`, other hashes scroll to section IDs on the home page
- `lucide-react` for icons, `motion` (Framer Motion) for animations
- Brand colors: `#E17226` (orange, primary), `#051232` (dark navy, secondary); hover/darker shades `#C65F1D` / `#030A1F`; use `orange-*` Tailwind classes for tints/shadows
- All component files are `.tsx` with named exports (except `App.tsx` which is default export)
- Data is static — no API calls from the frontend; Gemini API usage is server-side only via AI Studio runtime
