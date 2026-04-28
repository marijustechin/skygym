'use client';

import { Language } from '@/shared/config/i18n/config';
import { FormsDictionary } from '@/shared/config/i18n/dictionary';
import { FormShell } from '@/shared/ui/form-shell';
import Link from 'next/link';
import { useMemo } from 'react';
import { createLoginSchema } from '../model/login-schema';

type LoginFormProps = {
  langStrings: FormsDictionary;
  lang: Language;
};

export const LoginForm = ({ langStrings, lang }: LoginFormProps) => {
  const schema = useMemo(() => createLoginSchema(langStrings), [langStrings]);

  const { common, login, api } = langStrings;

  const footer = (
    <p className="text-sm text-muted-foreground">
      {common.register_question}{' '}
      <Link
        href={`/${lang}/registracija`}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {common.register_link}
      </Link>
    </p>
  );

  return (
    <FormShell headerLabel={login.title} footer={footer}>
      <form noValidate className="space-y-4">
        forma
      </form>
    </FormShell>
  );
};
