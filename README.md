# Getting started

## Pull Env Vars

run `vercel env pull` to grab all environment variables after yoouve been added to vercel. You can then copy the env vars in the .vercel folder to the root

## Install & Run

`npm i && npm run dev`

## Run server

run `npm run dev` to launch the project

## Run Inngest Dev Server

Inngest is the primary way to trigger background tasks for the application. To get it running, run

`npx inngest-cli@latest dev`

## Prisma

- If making db changes, you can run `npx prisma migrate dev`and then `npx prisma generate` to generate the prisma client. As this is still an alpha stage project, hard db resets may be needed. In that case, you can run `npx prisma db push --force-reset` and then `npx prisma generate` to do a hard db reset.

# Creating a new local DB for testing

## Step 1: Access PostgreSQL

Open your terminal and access PostgreSQL using the psql command-line interface. If you're using the default postgres user, you can enter:

`psql -U postgres`

You might be prompted to enter the password for the postgres user.

## Step 2: Create Database

Once you're in the psql interface, execute the following command to create a new database named local_lawassistant:

`CREATE DATABASE local_lawassistant;`

You should see a message indicating that the database was created successfully.

## Step 3: Exit psql

After creating the database, you can exit the psql interface by typing:

`\q`

## Step 4: Update Environment Configuration

## Install Vercel CLI

After being added to vercel, install the CLI locally using `npm i -g vercel`. Then, login to vercel using `vercel login`.

## update .env

In your Next.js project, update your .env file or the respective environment configuration file to include the connection string for your new database. DO NOT proceed with the prod DB ENV variables pulled using `vercel pull`. Add or modify an entry for DATABASE_URL to reflect the new database:

`"DATABASE_URL="postgresql://postgres:your_password@localhost:5432/local_lawassistant"`

POSTGRES_DATABASE="local_lawassistant"
POSTGRES_HOST="localhost"
POSTGRES_PASSWORD="your_local_db_password"
POSTGRES_PRISMA_URL="postgresql://default:your_local_db_password@localhost/local_lawassistant"
POSTGRES_URL="postgresql://default:your_local_db_password@localhost/local_lawassistant"
POSTGRES_URL_NON_POOLING="postgresql://default:your_local_db_password@localhost/local_lawassistant"
POSTGRES_USER="default"

# Documents Guidelines

`Regulatory Framework` - This category can include all the governing rules and regulations such as zoning bylaws, building codes, environmental regulations, etc. It encompasses the legal and procedural guidelines that proposals and projects must adhere to.

`Compliance Submissions` - This category can encompass all documents that are created to demonstrate compliance with the Regulatory Framework. It can include proposals, contracts, development applications, compliance reports, etc., essentially any document that is submitted for review against the established rules.

`Compliance Reports` - This is currently being generated by a combination of vector search and the openai api. The end goal is to have full compliance reports that highlight potential compliance issues with `Compliance Submissions`.
