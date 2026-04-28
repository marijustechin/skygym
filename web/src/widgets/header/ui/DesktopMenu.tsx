import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getHeaderNavigation } from '../model/get-header-navigation';
import { usePathname } from 'next/navigation';
import { Language } from '@/shared/config/i18n/config';
import { Dictionary } from '@/shared/config/i18n/dictionary';
import { cn } from '@/shared/lib/utils';

interface DesktopMenuProps {
  dict: Dictionary['public'];
  lang: Language;
}

export const DesktopMenu = ({ dict, lang }: DesktopMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = getHeaderNavigation(lang, dict['menu_links']);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
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
        className="flex items-center"
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
            'absolute top-full left-0 mt-2 z-40',
            'min-w-xs bg-slate-950 text-slate-200 p-4 border border-slate-800 rounded-md shadow-xl',
          )}
        >
          <nav className="flex flex-col items-center gap-4">
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
        </div>
      )}
    </div>
  );
};
