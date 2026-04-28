import Link from 'next/link';
import { Language } from '@/shared/config/i18n/config';
import { Dictionary } from '@/shared/config/i18n/dictionary';
import { getRoutePath } from '@/shared/config/routes';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '../../../../public/assets/skygym-logo-250x667.webp';
import Image from 'next/image';

interface FooterProps {
  dict: Dictionary['public']['footer'];
  lang: Language;
  menuLinks: Dictionary['public']['menu_links'];
}

export const Footer = ({ lang, dict, menuLinks }: FooterProps) => {
  const year = new Date().getFullYear();
  const copyright = dict.copyright.replace('{year}', String(year));
  const h3Class =
    'underline underline-offset-4 font-semibold uppercase tracking-widest text-slate-400';

  const navigationLinks = [
    { label: menuLinks.home, href: getRoutePath(lang, 'home') },
    { label: menuLinks.pricelist, href: getRoutePath(lang, 'pricelist') },
    { label: menuLinks.rules, href: getRoutePath(lang, 'rules') },
    { label: menuLinks.contacts, href: getRoutePath(lang, 'contacts') },
  ];

  return (
    <footer className="w-full skygym-footer">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3 flex flex-col items-center">
            <Link
              href={`/${lang}`}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image alt="SkyGym logo" src={logo} width={667} height={250} />
            </Link>
            <p className="leading-relaxed text-slate-300 text-center">
              {dict.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className={h3Class}>{dict.navigation_title}</h3>
            <nav className="flex flex-col gap-1.5 items-center">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Working Hours */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className={h3Class}>{dict.hours_title}</h3>
            <div className="space-y-1 text-slate-300 text-center">
              <p>{dict.hours_weekdays}</p>
              <p>{dict.hours_weekends}</p>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className={h3Class}>{dict.contacts_title}</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2 justify-center">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{dict.address}</span>
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`tel:${dict.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-primary"
                >
                  {dict.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${dict.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {dict.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-200">
          <p>
            {copyright} -{' '}
            <Link
              className="transition-colors hover:text-primary"
              href={`/${lang}`}
            >
              {dict.link_to_home}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
