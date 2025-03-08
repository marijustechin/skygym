import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export const LoginButton = () => {
  const { t } = useTranslation();

  return (
    <Link
      to={'/prisijungimas'}
      className="cursor-pointer border border-blue-500 rounded-lg px-2 py-1 bg-sky-600 hover:bg-sky-700"
    >
      {t('login_button')}
    </Link>
  );
};
