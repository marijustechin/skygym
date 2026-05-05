import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';
import { ContactForm } from '@/features/contact';
import { InfoCard } from '@/shared/ui/info-card';
import { Clock, FileClock, MapPin, Phone } from 'lucide-react';

export default async function Contacts({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);
  const t = dict.public.contacts_page;
  const cards = dict.public.common;

  const infoCards = [
    {
      title: cards.address_title,
      icon: <MapPin />,
      lines: [{ text: cards.address, important: false }],
    },
    {
      title: cards.gym_hours_title,
      icon: <Clock />,
      lines: [
        { text: cards.gym_hours_weekdays, important: false },
        { text: cards.gym_hours_weekends, important: true },
      ],
    },
    {
      title: cards.admin_hours_title,
      icon: <FileClock />,
      lines: [
        { text: cards.admin_hours_weekdays, important: false },
        { text: cards.admin_hours_weekends, important: true },
      ],
    },
    {
      title: cards.contacts_title,
      icon: <Phone />,
      lines: [
        { text: cards.phone, href: `tel:${cards.phone.replace(/\s/g, '')}`, important: true },
        { text: cards.email, href: `mailto:${cards.email}`, important: false },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2">
      <section className="flex flex-col items-center">
        <h1 className="relative uppercase pt-8 mb-4">
          {t.title}
          <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-red-600" />
        </h1>
        <p className="text-center max-w-md text-slate-600">{t.subTitle}</p>
      </section>

      <section className="grid lg:grid-cols-2 gap-16 mt-12 mb-10">
        <div className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {cards.contacts_title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {infoCards.map((card) => (
              <InfoCard key={card.title} card={card} />
            ))}
          </div>
        </div>
        <ContactForm lang={lang as Language} langStrings={dict.forms} />
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
          {t.mapTitle}
        </h2>
        <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2841.126468272389!2d25.264435237500493!3d54.737062231032965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd9117df54eb6b%3A0x3bb207b5146fdcbb!2sAteities%20g.%2010%2C%20Vilnius%2C%2008345%20Vilniaus%20m.%20sav.!5e0!3m2!1slt!2slt!4v1777699021541!5m2!1slt!2slt"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
