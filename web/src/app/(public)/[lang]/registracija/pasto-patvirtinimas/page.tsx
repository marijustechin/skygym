import { Language } from '@/shared/config/i18n/config';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { EmailVerificationGate } from './ui/EmailVerificationGate';

type VerifyEmailPageProps = {
  params: Promise<{ lang: Language }>;
};

export default async function VerifyEmailPage({
  params,
}: VerifyEmailPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <EmailVerificationGate lang={lang} dict={dict.forms} />;
}
