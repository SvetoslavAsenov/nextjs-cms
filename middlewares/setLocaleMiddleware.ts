import { NextResponse } from "next/server";
import { defaultLocale, supportedLocales } from "@/constants/server/index";
import type { SupportedLocale } from "@/constants/server/index";

export default function setLocaleMiddleware(request: Request): NextResponse {
  const LOCALE_SLUG_POSITION = 1;
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const possibleLocaleSlug = pathSegments[
    LOCALE_SLUG_POSITION
  ] as SupportedLocale;
  const isValidLocaleSlug = supportedLocales.includes(possibleLocaleSlug);
  const locale = isValidLocaleSlug ? possibleLocaleSlug : defaultLocale;
  let response;

  if (isValidLocaleSlug && possibleLocaleSlug !== defaultLocale) {
    const newPath = url.pathname.replace(`/${possibleLocaleSlug}`, "");
    response = NextResponse.rewrite(new URL(newPath, request.url));
  } else {
    response = NextResponse.next();
  }

  response.headers.set("x-language", locale);

  return response;
}
