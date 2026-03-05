import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { defaultLocale } from "@/i18n/config";

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
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/"],
};
