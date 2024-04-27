import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
  type Session,
} from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

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
      return session as Session; // Explicitly cast the modified session to the extended type
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
      issuer: process.env.AUTH0_ISSUER_BASE_URL ?? "",
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);