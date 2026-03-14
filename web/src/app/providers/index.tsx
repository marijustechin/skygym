'use client';

import type { ReactNode } from 'react';
import { ReduxProvider } from './redux-provider';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
