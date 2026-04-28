import { LoginForm } from '@/features/auth/login';
import { Language } from '@/shared/config/i18n/config';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return (
    <>
      <h1>Prisijungimo forma</h1>
      <LoginForm langStrings={dict.forms} lang={lang as Language} />
    </>
  );
}
