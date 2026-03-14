'use server';

import { cookies } from 'next/headers';
import {
  LANGUAGE_COOKIE_NAME,
  type Language,
} from '@/shared/config/i18n/config';

export async function setLanguage(language: Language) {
  const cookieStore = await cookies();

  cookieStore.set(LANGUAGE_COOKIE_NAME, language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}
