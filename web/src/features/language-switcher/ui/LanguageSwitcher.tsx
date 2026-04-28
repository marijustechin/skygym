'use client';

import { usePathname, useRouter } from 'next/navigation';
import { supportedLanguages, type Language } from '@/shared/config/i18n/config';
import { setLanguage } from '@/features/language-switcher/model/set-language';
import { LanguageFlag } from './LanguageFlag';
import { useEffect, useRef, useState } from 'react';

export const LanguageSwitcher = () => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

  const currentLang = (pathname.split('/')[1] as Language) || 'lt';

  const handleLanguageChange = async (language: Language) => {
    const segments = pathname.split('/');

    if (segments.length > 1) {
      segments[1] = language;
    }

    const newPath = segments.join('/') || `/${language}`;

    await setLanguage(language);
    router.push(newPath);
    router.refresh();
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="hidden md:flex relative z-50">
      <button
        className="flex items-center cursor-pointer"
        aria-label={isLangMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isLangMenuOpen}
        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
      >
        <LanguageFlag lang={currentLang} />
      </button>

      {isLangMenuOpen && (
        <div className="absolute top-full right-0 min-w-32 mt-2 z-40 p-4 rounded-lg shadow-xl bg-slate-950 border border-slate-800">
          <ul>
            {supportedLanguages.map((lang) => (
              <li
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="flex cursor-pointer items-center hover:bg-slate-800 justify-center gap-3 p-2 rounded-lg"
              >
                <LanguageFlag lang={lang} />
                <span className="uppercase text-slate-200">{lang}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
