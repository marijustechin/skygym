'use client';

import { usePathname, useRouter } from 'next/navigation';
import { supportedLanguages, type Language } from '@/shared/config/i18n/config';
import { setLanguage } from '@/features/language-switcher/model/set-language';

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = async (language: Language) => {
    const segments = pathname.split('/');

    if (segments.length > 1) {
      segments[1] = language;
    }

    const newPath = segments.join('/') || `/${language}`;

    await setLanguage(language);
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      {supportedLanguages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => handleLanguageChange(lang)}
          className="rounded border px-2 py-1"
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
