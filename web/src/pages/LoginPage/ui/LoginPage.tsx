import { useTranslation } from 'react-i18next';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1>{t('login_page.title')}</h1>
    </div>
  );
}
