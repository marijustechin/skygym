import { useTranslation } from 'react-i18next';

export const MainMenuLinks = () => {
  const { t } = useTranslation();

  return [
    { title: t('menu_home'), href: '/' },
    { title: t('menu_prices'), href: '/kainos' },
    { title: t('menu_toc'), href: '/taisykles' },
    { title: t('menu_contacts'), href: '/kontaktai' },
  ];
};
