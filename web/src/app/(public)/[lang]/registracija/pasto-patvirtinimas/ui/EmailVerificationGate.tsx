'use client';

import { Language } from '@/shared/config/i18n/config';
import { FormsDictionary } from '@/shared/config/i18n/dictionary';
import { EmailVerificationStatus } from './EmailVerificationStatus';
import { EmailVerificationInfo } from './EmailVerificationInfo';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type EmailVerificationGate = {
  lang: Language;
  dict: FormsDictionary;
};

export const EmailVerificationGate = ({
  lang,
  dict,
}: EmailVerificationGate) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {token ? (
          <EmailVerificationStatus lang={lang} token={token} dict={dict} />
        ) : (
          <EmailVerificationInfo lang={lang} dict={dict} />
        )}
      </div>
    </Suspense>
  );
};
