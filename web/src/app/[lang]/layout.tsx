import { notFound } from 'next/navigation';
import { supportedLanguages, Language } from '@/shared/config/index';

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
