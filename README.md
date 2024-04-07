# Getting started

## Install Vercel CLI

After being added to vercel, install the CLI locally using `npm i -g vercel`. Then, login to vercel using `vercel login`.

To pull local dev env vars, run ```vercel env pull```

## Run Inngest Dev Server

Inngest is the primary way to trigger background tasks for the application. To get it running, run

`npx inngest-cli@latest dev`

## Stripe

To get stripe running locally, use the following commands:

```brew install stripe/stripe-cli/stripe```

```stripe login```

```stripe listen --forward-to localhost:3000/api/webhooks/stripe```

## Install & Run

`npm i && npm run dev`

"Error: Invalid URL: undefined/dashboard?session_id={CHECKOUT_SESSION_ID}. URLs must begin with http or https.
    at StripeError.generate (webpack-internal:///(rsc)/./node_modules/stripe/esm/Error.js:23:20)
    at res.toJSON.then._Error_js__WEBPACK_IMPORTED_MODULE_0__.StripeAPIError.message (webpack-internal:///(rsc)/./node_modules/stripe/esm/RequestSender.js:109:82)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
## Prisma

- If making db changes, you can run `npx prisma migrate dev`to create a new migration and then `npx prisma generate` to generate the prisma client. As this is still an alpha stage project, hard db resets may be needed. In that case, you can run `npx prisma db push --force-reset` and then `npx prisma generate` to do a hard db reset.

## DaNgEr ZoNe

- Ensure you have prod env vars, by running `vercel pull --environment=production`
- For prod db changes, do the following after creating a local migration:

1. Open a new terminal window
2. Run `export $(grep -v '^#' .vercel/.env.production.local | xargs)` (this will use the prod creds). If you can do this, you're a trusted servant.
3. npx prisma migrate deploy
4. Close the the current terminal


# Marketing site layout


platform/
- page.tsx
- overview.tsx
- why-lawassistant.tsx
- how-it-works.tsx
- integrations.tsx

use-cases/
- page.tsx
- municipal-bylaws.tsx
- real-estate-compliance.tsx
- legal-research.tsx

solutions/
- page.tsx
- municipalities.tsx
- real-estate-firms.tsx
- legal-professionals.tsx

company/
- page.tsx
- about.tsx
- careers.tsx
- press.tsx
- contact.tsx

resources/
- page.tsx
- blog/
-- page.tsx
-- [slug].tsx
- resource-library.tsx
- faq.tsx