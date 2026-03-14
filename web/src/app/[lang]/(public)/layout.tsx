import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import { getLanguage } from '@/shared/config/i18n/get-language';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function PublicLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const language = getLanguage(lang);
  const dict = await getDictionary(language);

  return (
    <>
      <Header lang={language} dict={dict.public.menu_links} />
      {children}
      <Footer />
    </>
  );
}
