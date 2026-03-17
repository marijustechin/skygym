import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';
import Link from 'next/link';
import { Laikinas } from '@/shared/ui/laikinas';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return (
    <main className='text-black'>
      <h1>{dict.public.home_page.title}</h1>
      <Laikinas />
      <Link href={`/${lang}/registracija`}>Registracija</Link>
    </main>
  );
}
