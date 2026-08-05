# Caching

This starter provides Redis integration via `ioredis` with a composable utility for common caching operations.

## Setup

Configure your Redis connection in `.env`:

```env
REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
REDIS_USERNAME=your-redis-username
REDIS_PASSWORD=your-redis-password
```

## Redis Client

The Redis client is initialized in `server/utils/redis.ts`:

```ts
import process from 'node:process'
import Redis from 'ioredis'

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
})
```

## Composable: `useRedis`

The `useRedis(prefix, baseTTL?)` composable provides namespaced key-value operations:

```ts
import { useRedis } from '~/utils/redis'

// With optional default TTL (in seconds)
const cache = useRedis<{ name: string }>('users', 3600)
```

When `set` is called without a TTL argument, it falls back to the `baseTTL` provided at creation.

Available methods:

| Method                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `get(key)`              | Get value by key (auto-parsed JSON)        |
| `set(key, value, ttl?)` | Set value with TTL (falls back to baseTTL) |
| `del(key)`              | Delete a key                               |
| `exists(key)`           | Check if key exists                        |
| `keys()`                | List all keys with the prefix              |

## Usage in Routes

```ts
// server/api/users/[id].ts
import { defineHandler } from 'nitro'
import { useRedis } from '~/utils/redis'

export default defineHandler(async (event) => {
  const { id } = event.context.params
  const cache = useRedis<{ id: string, name: string }>('users')

  // Try cache first
  const cached = await cache.get(id)
  if (cached) {
    return cached
  }

  // Simulate DB fetch
  const user = { id, name: 'John' }

  // Cache for 1 hour
  await cache.set(id, user, 3600)

  return user
})
```

## Raw Redis Access

You can also access the raw Redis client directly:

```ts
import { redis } from '~/utils/redis'

await redis.set('key', 'value')
await redis.get('key')
```

## Best Practices

1. **Use prefixes** — `useRedis('users')` auto-prefixes keys as `users:key`
2. **Set baseTTL** — Pass a default TTL to `useRedis(prefix, baseTTL)` for consistent expiration
3. **Override per key** — Pass a specific TTL to `set(key, value, ttl)` to override baseTTL
4. **Handle null** — `get()` returns `null` for missing keys
5. **JSON serialization** — Objects are auto-serialized/parsed
