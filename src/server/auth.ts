import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  DefaultUser,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { api } from "src/trpc/react";
import { env } from "src/env.mjs";
import { db } from "src/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  interface User extends DefaultUser {
    roleId?: string; // Assuming 'roleId' connects to the 'Role' model in Prisma
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      roleId?: string; // Include the role ID in the session
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user }) {
      const existingUser = await db.user.findUnique({
        where: { id: user.id },
      });

      if (!existingUser?.companyId) {
        // This user is signing in for the first time
        let adminRole = await db.role.findFirst({
          where: { name: "ADMIN" },
        });

        // If the ADMIN role doesn't exist, create it
        if (!adminRole) {
          adminRole = await db.role.create({
            data: { name: "ADMIN" },
          });
        }

        // Create a new company
        const newCompany = await db.company.create({
          data: { name: "Default Company" },
        });

        // Assign the company and role to the user
        await db.user.update({
          where: { id: user.id },
          data: { companyId: newCompany.id, roleId: adminRole.id },
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
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
