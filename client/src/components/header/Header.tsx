import { Logo } from './Logo';
import { MainMenu } from './mainMenu/MainMenu';
import { UserMenu } from './userMenu/UserMenu';

export const Header = () => {
  return (
    <header className="sg-container flex justify-between border-b border-slate-600 items-center py-1 text-slate-50">
      <Logo />
      <MainMenu />
      <UserMenu />
    </header>
  );
};
