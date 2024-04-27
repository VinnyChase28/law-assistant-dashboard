import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

import { authOptions } from "src/server/auth";

// Use a type assertion if necessary
const handler = NextAuth(authOptions as NextAuthOptions);
export { handler as GET, handler as POST };
