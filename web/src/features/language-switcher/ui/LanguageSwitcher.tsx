'use client';

import { usePathname, useRouter } from 'next/navigation';
import { supportedLanguages, type Language } from '@/shared/config/i18n/config';
import { setLanguage } from '@/features/language-switcher/model/set-language';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { ChevronDown } from 'lucide-react';
import { LanguageFlag } from './LanguageFlag';

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2">
          <LanguageFlag lang={currentLang} />
          <span className="uppercase">{currentLang}</span>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="flex cursor-pointer items-center gap-3"
          >
            <LanguageFlag lang={lang} />
            <span className="flex-1 uppercase">{lang}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
