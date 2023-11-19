import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  DefaultUser,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "src/env.mjs";
import { db } from "src/server/db";
import { pinecone } from "src/utils/pinecone";

declare module "next-auth" {
  interface User extends DefaultUser {
    roleId?: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      roleId?: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account }) {
      if (!account) {
        return false;
      }
      const providerAccountId = account.providerAccountId;

      let existingAccount = await db.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: providerAccountId,
          },
        },
      });

      // If the account does not exist, create the user along with the account
      if (!existingAccount) {
        let adminRole = await db.role.findFirst({
          where: { name: "ADMIN" },
        });

        if (!adminRole) {
          adminRole = await db.role.create({
            data: { name: "ADMIN" },
          });
        }

        const newCompany = await db.company.create({
          data: { name: "Default Company" },
        });

        const newUser = await db.user.create({
          data: {
            name: user.name,
            image: user.image,
            companyId: newCompany.id,
            roleId: adminRole.id,
          },
        });

        existingAccount = await db.account.create({
          data: {
            providerAccountId: providerAccountId,
            userId: newUser.id,
            provider: account.provider,
            type: account.type,
          },
        });

        const indexName = `company-${newCompany.id}-index`;
        console.debug(`Creating index ${indexName}`);
        const response = await pinecone.createIndex({
          name: indexName,
          dimension: 512,
          metric: "cosine",
        });

        console.debug(`Created index ${indexName}`, response);

        await db.company.update({
          where: { id: newCompany.id },
          data: { pineconeIndexName: indexName },
        });
      }

      return true;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        roleId: user.roleId,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);