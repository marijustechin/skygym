interface NavbarProps {
  links: string[];
}

export const Navbar = ({ links }: NavbarProps) => {
  const menuLinks = [
    { title: t('menu_links.home'), link: '/' },
    { title: t('menu_links.pricelist'), link: '/kainorastis' },
    { title: t('menu_links.rules'), link: '/taisykles' },
    { title: t('menu_links.contacts'), link: '/kontaktai' },
  ];

  return <nav>Navigacija</nav>;
};
