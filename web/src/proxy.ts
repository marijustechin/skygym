import { NextRequest, NextResponse } from 'next/server';
import {
  LANGUAGE_COOKIE_NAME,
  defaultLanguage,
} from '@/shared/config/i18n/config';
import { getLanguage } from '@/shared/config/i18n/get-language';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  const language = getLanguage(cookieLanguage) ?? defaultLanguage;

  return NextResponse.redirect(new URL(`/${language}`, request.url));
}

export const config = {
  matcher: ['/'],
};
