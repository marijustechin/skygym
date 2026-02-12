import { Navbar } from '@/widgets/Navbar';
import styles from './Header.module.css';
import { LanguageSwitcher } from '@/shared/ui';
import { ASSETS } from '@/shared/const/assets';

export const Header = () => {
  return (
    <header className={styles.container}>
      <img src={ASSETS.LOGO.FULL} width={300} />
      <Navbar />
      <div className={styles.actions}>
        <LanguageSwitcher />
        <button>Login buttonas</button>
      </div>
    </header>
  );
};
