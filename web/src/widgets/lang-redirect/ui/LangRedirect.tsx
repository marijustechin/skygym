'use client';

import {
  defaultLanguage,
  Language,
  LANGUAGE_STORAGE_KEY,
  supportedLanguages,
} from '@/shared/config/i18n/config';
import { useEffect } from 'react';

export const LangRedirect = () => {
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    const language =
      savedLanguage && supportedLanguages.includes(savedLanguage as Language)
        ? savedLanguage
        : defaultLanguage;

    window.location.replace(`/${language}`);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};
