import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { t } = useTranslation();

  const menuLinks = [
    { title: t('menu_links.home'), link: '/' },
    { title: t('menu_links.pricelist'), link: '/kainorastis' },
    { title: t('menu_links.rules'), link: '/taisykles' },
    { title: t('menu_links.contacts'), link: '/kontaktai' },
  ];

  return (
    <nav className={styles.container}>
      {menuLinks.map((link) => (
        <NavLink
          key={link.title}
          to={link.link}
          className={({ isActive }) =>
            isActive ? styles.active_link : styles.inactive_link
          }
        >
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
};
