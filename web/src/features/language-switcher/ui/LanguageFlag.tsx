import type { Language } from '@/shared/config/i18n/config';
import Image from 'next/image';

type LanguageFlagProps = {
  lang: Language;
};

const getFlagSrc = (lang: string) => `/assets/icons/flags/${lang}.svg`;

export const LanguageFlag = ({ lang }: LanguageFlagProps) => {
  return <Image src={getFlagSrc(lang)} alt={lang} width={24} height={24} />;
};
