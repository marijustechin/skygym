import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';

export default async function Pricelist({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);

  return <div className="text-black">{dict.public.rules_page.title}</div>;
}
