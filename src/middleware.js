import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "jwt";

const protectedPrefixes = ["/profile", "/checkout"];

const authPrefixes = ["/auth", "/forgot-password"];

export function middleware(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );
  const isAuthRoute = authPrefixes.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("mode", "login");
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    const lastPath =
      request.cookies.get("lastPath")?.value ||
      request.nextUrl.searchParams.get("from") ||
      "/profile";
    return NextResponse.redirect(new URL(lastPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|icons\\.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
