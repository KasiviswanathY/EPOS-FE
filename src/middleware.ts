import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get("session")?.value;

  const session = JSON.parse(cookie || "{}");

  if (pathname !== "/signin" && !session?.token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  if (session?.token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/index", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
