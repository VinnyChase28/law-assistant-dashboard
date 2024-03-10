import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      // verify token and return a boolean
      const environment = process.env.NODE_ENV;
      const cookieKey =
        environment === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token";
      const sessionToken = req.cookies.get(cookieKey);
      if (sessionToken) return true;
      else return false;
    },
  },
});

export const config = { matcher: ["/dashboard/:path*"] };
