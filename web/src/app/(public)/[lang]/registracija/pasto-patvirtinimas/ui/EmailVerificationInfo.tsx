'use client';

import { Language } from '@/shared/config/i18n/config';
import { FormsDictionary } from '@/shared/config/i18n/dictionary';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type EmailVerificationInfoProps = {
  lang: Language;
  dict: FormsDictionary;
};

export const EmailVerificationInfo = ({
  lang,
  dict,
}: EmailVerificationInfoProps) => {
  const router = useRouter();

  const success =
    typeof window !== 'undefined' &&
    sessionStorage.getItem('registrationSuccess') === '1';

  useEffect(() => {
    if (!success) {
      router.replace(`/${lang}/registracija`);
    }
  }, [success, lang, router]);

  if (!success) return null;

  return (
    <div>
      <h1>{dict.api.USER_REGISTRATION_SUCCESSFUL}</h1>
    </div>
  );
};
