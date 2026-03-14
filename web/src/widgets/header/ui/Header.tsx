import Link from 'next/link';
import { Dictionary } from '@/shared/config/i18n/dictionary';
import { Language } from '@/shared/config/i18n/config';
import { getHeaderNavigation } from '../model/get-header-navigation';
import { LanguageSwitcher } from '@/features/language-switcher/ui/LanguageSwitcher';

interface HeaderProps {
  dict: Dictionary['public']['menu_links'];
  lang: Language;
}

export const Header = ({ dict, lang }: HeaderProps) => {
  const navigation = getHeaderNavigation(lang, dict);

  return (
    <header className="flex items-center justify-between">
      <div>logo</div>

      <nav className="flex items-center justify-center gap-2">
        {navigation.map((menuItem) => (
          <div key={menuItem.key}>
            <Link href={menuItem.href}>{menuItem.label}</Link>
          </div>
        ))}
      </nav>

      <LanguageSwitcher />
    </header>
  );
};
