import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale } from "@/i18n/config";
import { DEV_HUB_SESSION_COOKIE } from "@/lib/devHubAuth";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dev-hub")) {
    const sessionCookie = request.cookies.get(DEV_HUB_SESSION_COOKIE)?.value;
    const isAuthenticated =
      Boolean(process.env.DEV_HUB_SESSION_TOKEN) &&
      sessionCookie === process.env.DEV_HUB_SESSION_TOKEN;

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

  if (pathname !== "/") {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${defaultLocale}`;

  // Keep one permanent homepage destination to reinforce the canonical URL.
  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/", "/dev-hub/:path*"],
};
