import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// const protectedRoutes = ["/"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookie = request.cookies.get("session")?.value;
  console.log("cookie", cookie);

  const session = JSON.parse(cookie || "{}");
  console.log("session", session);

  if (pathname !== "/signin" && !session?.token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  if (session?.token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
