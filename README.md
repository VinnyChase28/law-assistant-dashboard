# Notes

- sometimes, after doing a prisma migration, kill server and restart vscode. dont ask.

# Prisma

- during dev, you can run ```npx prisma db push --force-reset``` and ```npx prisma generate``` as you modify the schema

After updating the schema, ```npx prisma migrate dev``` to apply the changes and ```npx prisma generate``` to update the Prisma client.


run ```vercel env pull``` to grab all environment variables

NOTE: For now, automatic extraction of JSDoc @description tags requires these forked npm package builds @deepkit/type and @deepkit/type-compiler


npm install @deepkit/type@npm:@jefflaporte/deepkit-type@1.0.1-alpha.97-jl
npm install --save-dev @deepkit/type-compiler@npm:@jefflaporte/deepkit-type-compiler@1.0.1-alpha.97-jl

# Bash
./node_modules/.bin/deepkit-type-install

