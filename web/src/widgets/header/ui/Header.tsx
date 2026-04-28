'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/shared/lib/utils'; // Shadcn standartas stilių jungimui

import { Dictionary } from '@/shared/config/i18n/dictionary';
import { Language } from '@/shared/config/i18n/config';
import { getHeaderNavigation } from '../model/get-header-navigation';
import { LanguageSwitcher } from '@/features/language-switcher/ui/LanguageSwitcher';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import Logo from '../../../../public/assets/skygym-sporto-klubas.webp';
import Image from 'next/image';

interface HeaderProps {
  dict: Dictionary['public']['menu_links'];
  lang: Language;
  loginButtonText: Dictionary['forms']['common']['login_button'];
}

export const Header = ({ dict, lang, loginButtonText }: HeaderProps) => {
  const navigation = getHeaderNavigation(lang, dict);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-300 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* LOGO */}
        <Link
          href={`/${lang}`}
          className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
        >
          <Image alt="SkyGym logo" src={Logo} width={100} height={295} />
        </Link>

        {/* DESKTOP NAVIGACIJA */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavigationMenuItem key={item.key}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent transition-colors',
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground hover:text-primary',
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* VEIKSMAI: Kalba + Mobilus Meniu */}
        <div className="flex items-center gap-4">
          <Link href={`/${lang}/prisijungimas`}>
            <Button className="bg-sky-600 text-white uppercase">
              {loginButtonText}
            </Button>
          </Link>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-6 pt-12">
                <SheetTitle className="sr-only">Navigacijos meniu</SheetTitle>
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary py-2 border-b border-muted/50',
                        pathname === item.href
                          ? 'text-primary'
                          : 'text-muted-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pb-8 sm:hidden">
                  <p className="text-xs uppercase text-muted-foreground mb-4 tracking-widest font-semibold">
                    Pasirinkite kalbą
                  </p>
                  <LanguageSwitcher />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
