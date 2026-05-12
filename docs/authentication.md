# Authentication

This starter includes JWT authentication scaffolding with middleware and utility functions.

## How It Works

1. **Middleware** (`server/middleware/verify-token.ts`) - Verifies the JWT from the `Authorization` header on each request
2. **Utils** (`server/utils/jwt.ts`) - JWT sign, verify, and decode functions

## JWT Utility

The `server/utils/jwt.ts` provides three methods:

```ts
import { jwt } from '~/utils/jwt'

// Sign a token (expires in 1d by default)
const token = jwt.sign({ userId: '1', username: 'john' })

// Verify a token
const payload = await jwt.verify<{ userId: string, username: string }>(token)

// Decode without verification
const decoded = jwt.decode(token)
```

## Middleware: Token Verification

Use the middleware to verify tokens on specific routes:

```ts
// server/middleware/verify-token.ts
import { defineMiddleware } from 'nitro'

export default defineMiddleware((event) => {
  const token = event.context._token
  // Verify the token or reject the request
})
```

## Type Augmentation

The `shims.d.ts` file extends the `H3EventContext` interface to add the `_token` property:

```ts
// shims.d.ts
import 'h3'

declare module 'h3' {
  type H3EventContext = {
    _token: string
  }
}
```

## Usage Example

```ts
// server/api/protected.ts
import { defineHandler } from 'nitro'
import { jwt } from '~/utils/jwt'

export default defineHandler(async (event) => {
  const token = event.context._token

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  try {
    const payload = await jwt.verify(token)
    return { user: payload }
  }
  catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
```

## Environment Variables

Set your JWT config in `.env`:

```env
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=2h
JWT_REFRESH_EXPIRES_IN=30d
```

::: warning
Never commit your `.env` file to version control. Use `.env.example` to share required variables.
:::
