# Configuration

## Nitro Configuration

The main configuration file is `nitro.config.ts`:

```ts
import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './server',
  devServer: {
    port: 5677,
  },
})
```

## TypeScript Configuration

The project extends a shared tsconfig:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@oiij/tsconfig/tsconfig.json",
  "compilerOptions": {
    "paths": {
      "~/*": ["./server/*"]
    },
    "types": ["node", "vitest/globals"]
  },
  "include": ["server", "docs", "*.d.ts"],
  "exclude": ["node_modules", "dist", "test"]
}
```

## ESLint Configuration

Uses `@antfu/eslint-config` with formatters:

```ts
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  // Options
})
```

## Vitest Configuration

Test configuration in `vitest.config.ts`:

```ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

## Commit Linting

Conventional commits are enforced via `commitlint.config.js` with `cz-git` for interactive prompts.

### Commit Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type     | Description   |
| -------- | ------------- |
| feat     | New feature   |
| fix      | Bug fix       |
| docs     | Documentation |
| style    | Code style    |
| refactor | Refactoring   |
| test     | Tests         |
| chore    | Build/tooling |
| perf     | Performance   |
| ci       | CI/CD         |

## Drizzle Configuration

Database ORM powered by [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview):

```ts
// drizzle.config.ts
import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/db/schema/index.ts',
  out: './.drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
})
```

Available commands:

| Command             | Description                 |
| ------------------- | --------------------------- |
| `pnpm db:generate`  | Generate migrations         |
| `pnpm db:migrate`   | Apply migrations            |
| `pnpm db:push`      | Push schema directly to DB  |
| `pnpm db:studio`    | Open Drizzle Studio GUI     |

## Redis Configuration

The project uses `ioredis` for Redis integration. Connection is configured via environment variables:

```ts
// server/utils/redis.ts
import Redis from 'ioredis'

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
})
```

The `useRedis(prefix)` composable provides namespaced key operations (get/set/del/exists/keys).

## Environment Variables

Create a `.env` file for local configuration:

```env
# Database (PostgreSQL)
DATABASE_URL=your-database-url

# Redis
REDIS_HOST=your-redis-url
REDIS_PORT=your-redis-port
REDIS_USERNAME=your-redis-username
REDIS_PASSWORD=your-redis-password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=2h
JWT_REFRESH_EXPIRES_IN=30d
```

::: warning
Never commit `.env` files. Use `.env.example` to document required variables.
:::

## Package Manager

This project enforces pnpm via the `preinstall` script:

```json
{
  "preinstall": "npx only-allow pnpm"
}
```

### Registry Configuration

The `.npmrc` file configures the npm registry:

```ini
registry=https://registry.npmmirror.com/
shamefully-hoist=true
auto-install-peers=true
```

## Git Hooks

Pre-commit hooks run automatically via `simple-git-hooks`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged && pnpm type:check"
  }
}
```

This ensures all staged files are linted and type-checked before committing.
