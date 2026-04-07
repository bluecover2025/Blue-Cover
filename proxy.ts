import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["fr", "en"];
const DEFAULT_LOCALE = "fr";

function resolveLocale(request: NextRequest): string {
  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && LOCALES.includes(cookie)) return cookie;
  return DEFAULT_LOCALE;
}

export default function proxy(request: NextRequest) {
  const locale = resolveLocale(request);
  const response = NextResponse.next();

  response.headers.set("x-next-intl-locale", locale);

  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 365 * 24 * 60 * 60,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
