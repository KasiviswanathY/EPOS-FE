import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value; 
  const pathname = req.nextUrl.pathname;

 
  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // If user IS logged in and tries to access /signin → redirect to /
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all pages except static files & API
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
