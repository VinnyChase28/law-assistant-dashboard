# Getting started

## Pull Env Vars

run ```vercel env pull``` to grab all environment variables after yoouve been added to vercel. You can then copy the env vars in the .vercel folder to the root

## Run server

run ```npm run dev``` to launch the project

## Run Inngest Dev Server

Inngest is the primary way to trigger background tasks for the application. To get it running, run 

```npx inngest-cli@latest dev```

## Prisma

- If making db changes, you can run ```npx prisma migrate dev```and then  ```npx prisma generate``` to generate the prisma client. As this is still an alpha stage project, hard db resets may be needed. In that case, you can run ```npx prisma db push --force-reset``` and then ```npx prisma generate``` to do a hard db reset.

# Documents

`Regulatory Framework` - This category can include all the governing rules and regulations such as zoning bylaws, building codes, environmental regulations, etc. It encompasses the legal and procedural guidelines that proposals and projects must adhere to.

`Compliance Submissions` - This category can encompass all documents that are created to demonstrate compliance with the Regulatory Framework. It can include proposals, contracts, development applications, compliance reports, etc., essentially any document that is submitted for review against the established rules.

