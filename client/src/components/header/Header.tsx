import { TopMenu } from './mainMenu/MainMenu';
import { LanguageSelector } from './LanguageSelector';
import { Logo } from './Logo';
import { UserMenu } from './userMenu/UserMenu';

export const Header = () => {
  return (
    <header className="sg-container flex justify-between border-b border-slate-600 items-center py-1 text-slate-50">
      <Logo />
      <TopMenu />
      <div className="flex gap-2 items-center">
        <UserMenu />
        <LanguageSelector />
      </div>
    </header>
  );
};
