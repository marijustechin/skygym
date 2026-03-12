'use client';

import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  i18n,
  defaultLanguage,
  supportedLanguages,
  type Language,
} from '@/shared/config';

type Props = {
  children: ReactNode;
};

export function I18nProvider({ children }: Props) {
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');

    if (
      savedLanguage &&
      supportedLanguages.includes(savedLanguage as Language)
    ) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage(defaultLanguage);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
