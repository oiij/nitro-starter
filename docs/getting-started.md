# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (required)

## Installation

```bash
# Clone the repository
git clone https://github.com/oiij/nitro-starter.git
cd nitro-starter

# Install dependencies
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

The API server will be available at `http://localhost:5677`.

## Project Structure

```
nitro-starter/
├── server/               # Nitro server source (serverDir)
│   ├── api/              # API routes (file-based routing)
│   │   ├── hello.ts      # GET /api/hello (Redis demo)
│   │   └── zod.post.ts   # POST /api/zod
│   ├── db/               # Database layer (Drizzle ORM + postgres)
│   │   ├── index.ts      # Drizzle client & schema export
│   │   └── schema/       # Drizzle schema definitions
│   ├── middleware/        # Nitro middleware
│   ├── plugins/          # Nitro plugins
│   └── utils/            # Shared utilities
│       ├── jwt.ts        # JWT sign/verify/decode
│       └── redis.ts      # Redis client & composable
├── .drizzle/             # Generated migrations output
├── docs/                 # VitePress documentation
├── drizzle.config.ts     # Drizzle Kit configuration
├── nitro.config.ts       # Nitro configuration
├── tsconfig.json         # TypeScript config
└── vitest.config.ts      # Test config
```

## Scripts

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `pnpm dev`          | Start Nitro dev server          |
| `pnpm build`        | Build for production            |
| `pnpm test`         | Run tests with Vitest           |
| `pnpm lint`         | Lint all files                  |
| `pnpm lint:fix`     | Lint and auto-fix               |
| `pnpm type:check`   | TypeScript type check           |
| `pnpm docs:dev`     | Start docs dev server           |
| `pnpm docs:build`   | Build docs for production       |
| `pnpm docs:preview` | Preview built docs              |
| `pnpm db:generate`  | Generate Drizzle migrations     |
| `pnpm db:migrate`   | Run Drizzle migrations          |
| `pnpm db:push`      | Push schema directly to DB      |
| `pnpm db:studio`    | Open Drizzle Studio GUI         |
| `pnpm cz`           | Interactive conventional commit |
| `pnpm commit`       | Pull, stage, commit, push       |
| `pnpm release`      | Bump version and publish        |

## Environment Setup

Copy `.env.example` to `.env` and configure your environment:

```bash
cp .env.example .env
```

Required environment variables:

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

## Quick Test

After starting the dev server, test the API:

```bash
# Hello World
curl http://localhost:5677/api/hello
# "Nitro is amazing!"

# Zod Validation
curl -X POST http://localhost:5677/api/zod \
  -H "Content-Type: application/json" \
  -d '{"foo": "bar"}'
```

## Next Steps

- [API Routes](/api-routes) - Learn about file-based routing
- [Authentication](/authentication) - Set up JWT auth
- [Database](/database) - Drizzle ORM setup & migrations
- [Caching](/caching) - Redis integration
- [Validation](/validation) - Validate request data with Zod
