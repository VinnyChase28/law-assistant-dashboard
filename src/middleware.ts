import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Exclude the signin and callback routes from the middleware to prevent infinite redirects
  if (
    request.nextUrl.pathname.startsWith("/api/auth/signin") ||
    request.nextUrl.pathname.startsWith("/api/auth/callback/auth0")
  ) {
    return NextResponse.next();
  }

  // Attempt to get the session token directly from the cookie
  const sessionToken = request.cookies.get("next-auth.session-token");

  // If session token is not present and the request is not targeting the excluded paths, redirect to signin
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // If session token is present, or the request is targeting the excluded paths, continue with the request
  return NextResponse.next();
}

// Optional: Use `matcher` to specify which paths the middleware applies to
export const config = {
  matcher: "/:path*", // Apply middleware to all routes except for the ones specified to be excluded
};
