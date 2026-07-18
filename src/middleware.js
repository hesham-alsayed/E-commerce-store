import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "jwt";

const authPrefixes = ["/auth", "/forgot-password"];
const protectedPrefixes = ["/profile", "/checkout", "/order"];

export function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname, searchParams } = request.nextUrl;

  const isAuthRoute = authPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isProtected && !token) {
    const loginUrl = new URL("/auth?mode=login", request.url);
    loginUrl.searchParams.set("from", pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icons\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
