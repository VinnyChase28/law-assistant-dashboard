# Notes

- sometimes, after doing a prisma migration, kill server and restart vscode. dont ask.

# Prisma

- during dev, you can run ```npx prisma db push --force-reset``` and ```npx prisma generate``` as you modify the schema

After updating the schema, ```run npx prisma migrate dev``` to apply the changes and ```npx prisma generate``` to update the Prisma client.

