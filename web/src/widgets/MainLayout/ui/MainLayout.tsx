import { Outlet } from 'react-router';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
