import Link from 'next/link';
import { Language } from '@/shared/config/i18n/config';
import { Dictionary } from '@/shared/config/i18n/dictionary';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo from '../../../../public/assets/skygym-logo-baltas.webp';
import Image from 'next/image';

interface FooterProps {
  dict: Dictionary['public'];
  lang: Language;
}

export const Footer = ({ lang, dict }: FooterProps) => {
  const { common, footer } = dict;
  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace('{year}', String(year));
  const h3Class =
    'underline underline-offset-4 font-semibold uppercase tracking-widest text-slate-400';

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
              {footer.description}
            </p>
          </div>

          {/* Admin Working Hours */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className={h3Class}>{common.admin_hours_title}</h3>
            <div className="space-y-1 text-slate-300 text-center">
              <p>{common.admin_hours_weekdays}</p>
              <p className="text-red-600">{common.admin_hours_weekends}</p>
            </div>
          </div>

          {/* Gym Working Hours */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className={h3Class}>{common.gym_hours_title}</h3>
            <div className="space-y-1 text-slate-300 text-center">
              <p>{common.gym_hours_weekdays}</p>
              <p className="text-red-600">{common.gym_hours_weekends}</p>
            </div>
          </div>

          {/* Contacts */}
          <div className="space-y-3 flex flex-col items-center">
            <h3 className={h3Class}>{common.contacts_title}</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2 justify-center">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{common.address}</span>
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`tel:${common.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-primary"
                >
                  {common.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${common.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {common.email}
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
              {footer.link_to_home}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
