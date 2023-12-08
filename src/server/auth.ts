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
    async signIn({ user, account }) {
      if (!account) {
        return false;
      }
      // Your logic to handle signIn, e.g., creating a user record in your database
      return true;
    },
    session: async ({ session }) => {
      // Extract roles and company info from Auth0 token and add them to the session
      // session.user.role = token["http://your-auth0-namespace/roles"][0]; // Replace with your actual namespace
      // session.user.companyId = token["http://your-auth0-namespace/company"]; // Replace with your actual namespace

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);