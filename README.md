This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- Docker
- pnpm

## Getting Started

1. `cp .env.example .env` (This file should not be commited to VCS)
2. Fill out the required environment variables in `.env`
3. Ensure docker is running
4. Start supabase server `npx supabase start`
5. Start local development server`pnpm run dev`

> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- Lint: `pnpm run lint`
- Lint (fix): `pnpm run lint:fix`
- Run all tests: `pnpm run test`
- Running Unit tests: `pnpm run test:unit`
- Running Integration tests: `pnpm run test:integration`
- Reset database `pnpm run db:reset`
- Run DB tests `pnpm run db:test`
- Listen to stripe events: `pnpm run stripe:listen --api-key <your-api-key>`
- Trigger stripe events: `pnpm run stripe:trigger --api-key <your-api-key> <event-name>`

> In order to test stripe events, you'll need to use two terminals.

## frigear-app CLI

- Import stripe products: `pnpm run cli stripe products import`
- Delete all products: `pnpm run cli stripe products delete-all`

## Test users (locally)

| Role      | Email                   | Password    |
|-----------|-------------------------|-------------|
| Admin     | admin@app.localhost     | password123 |
| Manager   | manager@app.localhost   | password123 |
| volunteer | volunteer@app.localhost | password123 |
| user      | user<1-7>@app.localhost | password123 |

## Learn more about NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!
