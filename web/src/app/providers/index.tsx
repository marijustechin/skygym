'use client';

import type { ReactNode } from 'react';
import { ReduxProvider } from './redux-provider';
import { I18nProvider } from './i18n-provider';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <ReduxProvider>
      <I18nProvider>{children}</I18nProvider>
    </ReduxProvider>
  );
}
