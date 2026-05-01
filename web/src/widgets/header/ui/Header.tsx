'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Dictionary } from '@/shared/config/i18n/dictionary';
import { Language } from '@/shared/config/i18n/config';
import { LanguageSwitcher } from '@/features/language-switcher/ui/LanguageSwitcher';
import Logo from '../../../../public/assets/skygym-logo-baltas.webp';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  dict: Dictionary['public'];
  lang: Language;
}

export const Header = ({ dict, lang }: HeaderProps) => {
  return (
    /* We keep z-50 here. 
       The MobileMenu internal overlay will use z-[100] to sit ABOVE this header.
    */
    <header className="sticky top-0 z-50 w-full bg-slate-950 backdrop-blur-md border-b border-slate-900">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left Side: Menus */}

        {/* Desktop/Tablet */}
        <DesktopMenu lang={lang} dict={dict} />

        {/* Mobile */}
        <MobileMenu lang={lang} dict={dict} />

        {/* Logo */}
        <Link
          href={`/${lang}/`}
          className="hover:opacity-80 transition-opacity h-16"
        >
          <Image
            alt="SkyGym logo"
            src={Logo}
            className="h-full w-auto object-contain"
          />
        </Link>

        {/* Right Side: Language (Desktop only) */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
