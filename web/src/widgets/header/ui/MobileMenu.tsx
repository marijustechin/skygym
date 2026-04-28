import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { getHeaderNavigation } from '../model/get-header-navigation';
import { usePathname, useRouter } from 'next/navigation';
import { Language, supportedLanguages } from '@/shared/config/i18n/config';
import { Dictionary } from '@/shared/config/i18n/dictionary';
import { cn } from '@/shared/lib/utils';
import { LanguageFlag } from '@/features/language-switcher/ui/LanguageFlag';
import { setLanguage } from '@/features/language-switcher/model/set-language';

interface MobileMenuProps {
  dict: Dictionary['public'];
  lang: Language;
}

export const MobileMenu = ({ dict, lang }: MobileMenuProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = getHeaderNavigation(lang, dict['menu_links']);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

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
  };

  return (
    <div className="flex md:hidden">
      <button
        className="relative z-60 flex items-center"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="h-10 w-10 text-white" />
        ) : (
          <Menu className="h-10 w-10 text-white" />
        )}
      </button>
      {isMenuOpen && (
        <div
          className={cn(
            'absolute top-0 left-0 mt-2 pb-2 z-40 transition-all duration-200', // 2. Right-Bottom alignment
            'min-w-full min-h-dvh bg-slate-950 text-slate-200 p-4',
          )}
        >
          <nav className="w-full flex flex-col items-center gap-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href + '/';
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    'w-full text-center text-lg rounded-lg p-2 uppercase font-medium transition-colors hover:text-primary hover:bg-slate-900',
                    isActive
                      ? 'text-primary bg-slate-900 underline underline-offset-4'
                      : 'text-slate-200',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-slate-800 mt-2 p-2 text-center">
            <p className="py-4">{dict.common.selectLangTitle}</p>
            <ul>
              {supportedLanguages.map((lang) => {
                const isActiveLang = currentLang === lang;
                return (
                  <li
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    //className=""
                    className={cn(
                      'flex cursor-pointer items-center justify-center gap-3 pt-2 pb-2 rounded-lg',
                      isActiveLang
                        ? 'bg-slate-900 underline underline-offset-4'
                        : 'bg-slate-950',
                    )}
                  >
                    <LanguageFlag lang={lang} />
                    <span className="uppercase">{lang}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
