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


## Prisma

- If making db changes, you can run `npx prisma migrate dev`to create a new migration and then `npx prisma generate` to generate the prisma client. As this is still an alpha stage project, hard db resets may be needed. In that case, you can run `npx prisma db push --force-reset` and then `npx prisma generate` to do a hard db reset.

## Contenful

run `npm run contentful` to import the types from contenful
