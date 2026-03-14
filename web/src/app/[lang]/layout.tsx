import { notFound } from 'next/navigation';
import { supportedLanguages, type Language } from '@/shared/config/i18n/config';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!supportedLanguages.includes(lang as Language)) {
    notFound();
  }

  return <>{children}</>;
}
