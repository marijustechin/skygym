import { notFound } from 'next/navigation';
import { supportedLanguages, type Language } from '@/shared/config/i18n/config';
import { getLanguage } from '@/shared/config/i18n/get-language';
import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ToTop } from '@/shared/ui/to-top';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: 'lt' }, { lang: 'en' }, { lang: 'ru' }];
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!supportedLanguages.includes(lang as Language)) {
    notFound();
  }

  const language = getLanguage(lang);
  const dict = await getDictionary(language);

  return (
    <>
      <Header lang={language} dict={dict.public} />
      <main className="w-full">{children}</main>
      <Footer lang={language} dict={dict.public} />
      <ToTop />
    </>
  );
}
