# Database

This starter uses [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL for database management.

## Setup

Configure your database connection in `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/your-db
```

## Schema

Define your database schema in `server/db/schema/`:

```ts
// server/db/schema/user.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

Export all schemas from the index:

```ts
// server/db/schema/index.ts
export * from './user'
```

## Client

The database client is initialized in `server/db/index.ts`:

```ts
import process from 'node:process'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || ''

const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })

export { schema }
```

::: warning
`server/db/` is **NOT** auto-imported by Nitro. Use explicit imports:
```ts
import { db } from '~/db'
```
:::

## Usage in Routes

```ts
// server/api/users.ts
import { defineHandler } from 'nitro'
import { db } from '~/db'
import { user } from '~/db/schema'

export default defineHandler(async () => {
  const users = await db.select().from(user)
  return users
})
```

```ts
// server/api/users.post.ts
import { defineHandler } from 'nitro'
import { db } from '~/db'
import { user } from '~/db/schema'

export default defineHandler(async (event) => {
  const body = await event.req.json()
  const newUser = await db.insert(user).values(body).returning()
  return newUser
})
```

## Migrations

Generate and apply migrations as your schema changes:

```bash
# Generate migration files
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Push schema directly (dev only)
pnpm db:push
```

## Drizzle Studio

Open Drizzle Studio for a GUI to browse and edit data:

```bash
pnpm db:studio
```

## Best Practices

1. **Always use migrations** in production — avoid `db:push`
2. **Use explicit imports** — `server/db/` is not auto-imported
3. **Define types** — Use `typeof` and `z.infer` for type safety
4. **Use transactions** for multi-step operations
5. **Validate input** with Zod before database operations
