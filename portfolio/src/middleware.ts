import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale } from "@/i18n/config";
import { DEV_HUB_SESSION_COOKIE } from "@/lib/devHubAuth";

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const primaryLanguage = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";

  if (primaryLanguage.startsWith("es")) {
    return "es";
  }

  return defaultLocale;
}

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

  const locale = getPreferredLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/", "/dev-hub/:path*"],
};
