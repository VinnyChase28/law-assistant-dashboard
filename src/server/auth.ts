import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
} from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { env } from "src/env.mjs";
import { db } from "src/server/db";

declare module "next-auth" {
  interface User extends DefaultUser {}
  interface Session extends DefaultSession {
    user: {
      id: string;
      // roleId and companyId will be added from Auth0 token
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn() {
      return true;
    },
    session: async ({ session, user }) => {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the callback URL is the one you expect, return it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Otherwise, return a default URL
      return baseUrl;
    },
  },

  adapter: PrismaAdapter(db),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);