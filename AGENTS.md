# AGENTS.md

## Quick Commands

- `pnpm dev` — Nitro dev server on port 5677
- `pnpm build` — production build
- `pnpm lint` / `pnpm lint:fix` — ESLint (auto-formatter enabled via `eslint-plugin-format`)
- `pnpm type:check` — TypeScript (`tsc --noEmit`)
- `pnpm test` — Vitest in watch mode; use `pnpm test run` for single run
- `pnpm docs:dev` — VitePress docs dev server
- `pnpm db:generate` — Generate Drizzle migrations
- `pnpm db:migrate` — Apply Drizzle migrations
- `pnpm db:push` — Push schema directly to DB
- `pnpm db:studio` — Open Drizzle Studio GUI

## Required Order for Verification

Run `pnpm lint:fix && pnpm type:check` before committing. The pre-commit hook runs `pnpm lint-staged && pnpm type:check` automatically.

## Package Manager

pnpm only (enforced by `preinstall` hook). Uses `shamefully-hoist=true` in `.npmrc`.

## Project Structure

- **`server/`** — Nitro server source (configured via `serverDir` in `nitro.config.ts`)
  - `server/api/` — File-based API routes. Suffix controls HTTP method: `foo.ts` = GET, `foo.post.ts` = POST, etc.
  - `server/middleware/` — Nitro middleware (runs on every request)
  - `server/plugins/` — Nitro plugins (run at startup)
  - `server/utils/` — Shared utilities (auto-imported by Nitro)
  - `server/db/` — Database layer (Drizzle ORM + postgres). NOT auto-imported — use explicit imports from `~/db`.
    - `server/db/schema/` — Drizzle schema definitions
- **`docs/`** — VitePress documentation site
- `~/*` path alias maps to `./server/*` (tsconfig)

## Key Config

- **Nitro**: `nitro.config.ts` — dev port 5677
- **ESLint**: `@antfu/eslint-config` with formatters enabled; `.agents/` is ignored
- **Vitest**: globals enabled, jsdom environment, Vue plugin
- **Drizzle**: `drizzle.config.ts` — schema in `server/db/schema/`, migrations output to `.drizzle/migrations`
- **Redis**: `ioredis` via `server/utils/redis.ts` — composable `useRedis(prefix, baseTTL?)` for get/set/del/exists/keys; `set` falls back to `baseTTL` when no TTL is given
- **Commits**: Conventional commits via `commitlint` + `cz-git`. Emoji prefixed. Use `pnpm cz` for interactive commit.

## Gotchas

- `vitest.config.ts` imports `@vitejs/plugin-vue` — this is for docs testing, not the Nitro server
- `shims.d.ts` augments `h3`'s `H3EventContext` with `_token` — middleware reads JWT from `event.context._token`
- `server/utils/` contents are auto-imported by Nitro — no explicit imports needed in route/middleware files
