import { RegisterForm } from '@/features/auth/register';
import { Language } from '@/shared/config/i18n/config';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';

export default async function RegistrationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return (
    <main>
      <h1>Registracijos forma</h1>
      <RegisterForm langStrings={dict.forms} lang={lang as Language} />
    </main>
  );
}
