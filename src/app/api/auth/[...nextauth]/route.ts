import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

import { authOptions } from "src/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions as NextAuthOptions);
export { handler as GET, handler as POST };