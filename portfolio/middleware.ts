import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { DEV_HUB_SESSION_COOKIE, hasValidDevHubSession } from "@/lib/devHubAuth";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicInquiryCreate =
    pathname === "/api/inquiries" && request.method === "POST";

  if (isPublicInquiryCreate) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(DEV_HUB_SESSION_COOKIE)?.value;
  const isAuthenticated = hasValidDevHubSession(sessionCookie);

  if (pathname.startsWith("/dev-hub/login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dev-hub", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/dev-hub/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dev-hub/:path*", "/api/inquiries/:path*"],
};
