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



resources/
- page.tsx
- blog/
-- page.tsx
-- [slug].tsx
- resource-library.tsx
- faq.tsx

## SEO

- run `tree -I 'node_modules|outstatic|videos'` to get the project structure as you improve SEO. 

## Tree

├── README.md
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── prettier.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20240226075628_start_new
│   │   │   └── migration.sql
│   │   ├── 20240305040305_fresh_stripe_migration
│   │   │   └── migration.sql
│   │   ├── 20240305052607_
│   │   │   └── migration.sql
│   │   ├── 20240306100051_add_final_report_column_to_file_table
│   │   │   └── migration.sql
│   │   ├── 20240323211356_add_labels
│   │   │   └── migration.sql
│   │   ├── 20240324083925_make_char_limit_20
│   │   │   └── migration.sql
│   │   ├── 20240402211246_migrate_usage_cost
│   │   │   └── migration.sql
│   │   ├── 20240403013053_new_usage_table
│   │   │   └── migration.sql
│   │   ├── 20240403042937_add_accepted_term_boolean
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── _next-video -> ../videos
│   ├── robots.txt
│   ├── sitemap-0.xml
│   └── sitemap.xml
├── src
│   ├── app
│   │   ├── (cms)
│   │   │   └── layout.tsx
│   │   ├── _components
│   │   │   ├── alert-dialogue.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── bubble
│   │   │   │   └── bubble.tsx
│   │   │   ├── card.tsx
│   │   │   ├── charts
│   │   │   │   ├── area-chart.tsx
│   │   │   │   ├── bar-list.tsx
│   │   │   │   ├── charts.tsx
│   │   │   │   ├── kpi-card.tsx
│   │   │   │   ├── line-chart.tsx
│   │   │   │   └── usage-circle.tsx
│   │   │   ├── chat
│   │   │   │   ├── chat-docs.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── helpers.tsx
│   │   │   │   └── types.ts
│   │   │   ├── checkbox-with-text.tsx
│   │   │   ├── create-post.tsx
│   │   │   ├── dark-mode-toggle.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── external-link.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── generate-report
│   │   │   │   └── generate-report.tsx
│   │   │   ├── icons.tsx
│   │   │   ├── input
│   │   │   │   ├── add-files.tsx
│   │   │   │   └── file-form.tsx
│   │   │   ├── main-navigation.tsx
│   │   │   ├── markdown.tsx
│   │   │   ├── pdf-viewer.tsx
│   │   │   ├── sidebar-nav.tsx
│   │   │   ├── sign-in-out.tsx
│   │   │   ├── skeleton-abstract.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── stripe
│   │   │   │   ├── active-subscription.tsx
│   │   │   │   └── subscriptions.tsx
│   │   │   ├── tailwind-indicator.tsx
│   │   │   ├── theme-provider.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── ui
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── avatar.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── calendar.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── command.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── icons.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── navigation-menu.tsx
│   │   │   │   ├── popover.tsx
│   │   │   │   ├── progress.tsx
│   │   │   │   ├── radio-group.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── toaster.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   ├── tooltip.tsx
│   │   │   │   └── use-toast.ts
│   │   │   └── user-nav.tsx
│   │   ├── accept-terms
│   │   │   └── page.tsx
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   ├── chat
│   │   │   │   └── route.ts
│   │   │   ├── inngest
│   │   │   │   └── route.ts
│   │   │   ├── trpc
│   │   │   │   └── [trpc]
│   │   │   │       └── route.ts
│   │   │   ├── upload-file
│   │   │   │   └── route.ts
│   │   │   └── webhooks
│   │   │       └── stripe
│   │   │           └── route.ts
│   │   ├── assets
│   │   │   ├── cube-leg.png
│   │   │   ├── growth.png
│   │   │   ├── icon.ico
│   │   │   ├── icon.png
│   │   │   ├── looking-ahead.png
│   │   │   ├── pilot.png
│   │   │   ├── react.svg
│   │   │   └── reflecting.png
│   │   ├── auth
│   │   │   └── sign-in
│   │   │       ├── page.tsx
│   │   │       └── user-auth-form.tsx
│   │   ├── dashboard
│   │   │   ├── files
│   │   │   │   ├── components
│   │   │   │   │   ├── columns.tsx
│   │   │   │   │   ├── data-table-column-header.tsx
│   │   │   │   │   ├── data-table-faceted-filter.tsx
│   │   │   │   │   ├── data-table-pagination.tsx
│   │   │   │   │   ├── data-table-row-actions.tsx
│   │   │   │   │   ├── data-table-toolbar.tsx
│   │   │   │   │   ├── data-table-view-options.tsx
│   │   │   │   │   ├── data-table.tsx
│   │   │   │   │   ├── data.tsx
│   │   │   │   │   ├── label-dialogue.tsx
│   │   │   │   │   ├── label-form.tsx
│   │   │   │   │   ├── schema.ts
│   │   │   │   │   ├── tabbed-tables.tsx
│   │   │   │   │   └── table-container.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── pdf-viewer
│   │   │   │   └── page.tsx
│   │   │   ├── settings
│   │   │   │   ├── appearance
│   │   │   │   │   ├── appearance-form.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── billing
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── notifications
│   │   │   │   │   ├── notifications-form.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── profile-form.tsx
│   │   │   └── success
│   │   │       └── page.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── marketing
│   │   │   ├── assets
│   │   │   │   └── law-assistant-logo.tsx
│   │   │   ├── components
│   │   │   │   ├── about.tsx
│   │   │   │   ├── case-studies.tsx
│   │   │   │   ├── cta.tsx
│   │   │   │   ├── faq.tsx
│   │   │   │   ├── features
│   │   │   │   │   ├── feature-list.tsx
│   │   │   │   │   ├── feature-showcase.tsx
│   │   │   │   │   └── features.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   ├── full-page
│   │   │   │   │   └── full-page-section.tsx
│   │   │   │   ├── hero
│   │   │   │   │   ├── hero-cards.tsx
│   │   │   │   │   ├── hero-features.tsx
│   │   │   │   │   └── hero-home.tsx
│   │   │   │   ├── how-it-works.tsx
│   │   │   │   ├── icons.tsx
│   │   │   │   ├── mode-toggle.tsx
│   │   │   │   ├── navigation
│   │   │   │   │   ├── navbar.tsx
│   │   │   │   │   └── navigation-menu.tsx
│   │   │   │   ├── newsletter.tsx
│   │   │   │   ├── pricing.tsx
│   │   │   │   ├── scroll-to-top.tsx
│   │   │   │   ├── services.tsx
│   │   │   │   ├── sponsors.tsx
│   │   │   │   ├── statistics.tsx
│   │   │   │   ├── team.tsx
│   │   │   │   └── testimonials.tsx
│   │   │   └── platform
│   │   │       ├── how-it-works
│   │   │       │   ├── components
│   │   │       │   │   └── how-it-works.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── integrations
│   │   │       │   ├── components
│   │   │       │   │   └── how-it-works.tsx
│   │   │       │   └── page.tsx
│   │   │       ├── overview
│   │   │       │   ├── components
│   │   │       │   │   └── overview.tsx
│   │   │       │   └── page.tsx
│   │   │       └── why-codex
│   │   │           ├── components
│   │   │           │   └── why-codex.tsx
│   │   │           └── page.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── privacy-policy
│   │   │   └── page.tsx
│   │   ├── sitemap.ts
│   │   └── terms-of-use
│   │       └── page.tsx
│   ├── assets
│   │   ├── cube-leg.png
│   │   ├── growth.png
│   │   ├── icon.ico
│   │   ├── icon.png
│   │   ├── looking-ahead.png
│   │   ├── pilot.png
│   │   ├── react.svg
│   │   └── reflecting.png
│   ├── env.mjs
│   ├── helpers
│   │   ├── textTransformers.ts
│   │   └── usage.ts
│   ├── inngest
│   │   ├── client.ts
│   │   ├── functions
│   │   │   ├── compliance-reports.ts
│   │   │   ├── subsections-embeddings.ts
│   │   │   └── usage.ts
│   │   ├── helpers
│   │   │   └── report-helpers.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── lib
│   │   ├── analytics.ts
│   │   ├── fonts.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── public
│   │   ├── CenterCourt.svg
│   │   ├── ConcordPacific.svg
│   │   ├── CrestonValley.svg
│   │   ├── FairField.svg
│   │   ├── MattamyHomes.svg
│   │   ├── Provo.svg
│   │   ├── favicon.ico
│   │   └── favicon.svg
│   ├── server
│   │   ├── api
│   │   │   ├── root.ts
│   │   │   ├── routers
│   │   │   │   ├── chat.ts
│   │   │   │   ├── file.ts
│   │   │   │   ├── llm.ts
│   │   │   │   ├── stripe.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── vector.ts
│   │   │   └── trpc.ts
│   │   ├── auth.ts
│   │   └── db.ts
│   ├── store
│   │   └── store.ts
│   ├── styles
│   │   └── globals.css
│   ├── trpc
│   │   ├── react.tsx
│   │   ├── server.ts
│   │   └── shared.ts
│   ├── types
│   └── utils
│       ├── openai.ts
│       ├── pinecone.ts
│       ├── prisma.ts
│       └── stripe.ts
├── tailwind.config.ts
├── tsconfig.json
└── video.d.ts