import { Language } from '@/shared/config/i18n/config';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return (
    <main>
      <h1>{dict.forms.api.USER_REGISTRATION_SUCCESSFUL}</h1>
    </main>
  );
}
