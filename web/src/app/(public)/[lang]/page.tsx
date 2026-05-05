import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';
import Image, { type StaticImageData } from 'next/image';
import {
  Clock,
  Dumbbell,
  FileX,
  UserCheck,
  Activity,
  Heart,
} from 'lucide-react';
import { InfoCard } from '@/shared/ui/info-card';
import heroImg from '../../../../public/img/home-page/pradzia-hero.webp';
import optionGirl from '../../../../public/img/home-page/options/merginos-sporto-klube.webp';
import optionPush from '../../../../public/img/home-page/options/skygym-spaudimas.webp';
import optionCardio from '../../../../public/img/home-page/options/kardio-pratimai.webp';
import optionBoxing from '../../../../public/img/home-page/options/skygym-boksas.webp';
import servicePower from '../../../../public/img/home-page/options/jegos-treniruotes.webp';
import serviceGymnastics from '../../../../public/img/home-page/options/gimnastika.webp';
import serviceCardio from '../../../../public/img/home-page/options/paslaugos-laikinas.webp';

// ── Card Components ──────────────────────────────────────────────────────────

function ServiceCard({
  image,
  imageAlt,
  icon,
  title,
  description,
  items,
}: {
  image: StaticImageData;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <article className="group flex flex-col gap-6 overflow-hidden rounded-xl border text-slate-950 shadow transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <Image
          alt={imageAlt}
          src={image}
          className="h-48 w-full object-cover"
        />
        <div
          className="absolute left-4 top-4 rounded-lg bg-white/90 p-2"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
      <div className="px-6 pt-2">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-4 px-6 last:pb-6">
        <p className="leading-relaxed text-slate-600">{description}</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-center text-sm">
              <span
                className="mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);
  const t = dict.public.home_page;

  const services = [
    {
      image: servicePower,
      imageAlt: 'Jėgos treniruotės',
      icon: <Dumbbell className="h-5 w-5" />,
      title: t.servicePowerTitle,
      description: t.servicePowerDesc,
      items: [t.servicePowerItem1, t.servicePowerItem2, t.servicePowerItem3],
    },
    {
      image: serviceGymnastics,
      imageAlt: 'Gimnastika ir tempimas',
      icon: <Activity className="h-5 w-5" />,
      title: t.serviceGymnasticsTitle,
      description: t.serviceGymnasticsDesc,
      items: [
        t.serviceGymnasticsItem1,
        t.serviceGymnasticsItem2,
        t.serviceGymnasticsItem3,
      ],
    },
    {
      image: serviceCardio,
      imageAlt: 'Kardio zona',
      icon: <Heart className="h-5 w-5" />,
      title: t.serviceCardioTitle,
      description: t.serviceCardioDesc,
      items: [t.serviceCardioItem1, t.serviceCardioItem2, t.serviceCardioItem3],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[600px] items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg.src})` }}
        aria-label={t.title}
      >
        {/* 60% dark overlay — linear gradient for better readability */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 to-slate-950/40" />
        <div className="relative z-10 max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold uppercase tracking-wider text-slate-50 md:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="rounded-xl bg-red-600/55 p-3 text-xl font-bold uppercase tracking-wider text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:text-2xl">
            {t.subTitle}
          </p>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="container mx-auto border-b border-slate-400 px-1 py-10 lg:px-0"
        aria-labelledby="about-heading"
      >
        {/* Options */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2
                id="about-heading"
                className="text-center text-2xl font-semibold uppercase text-slate-950 md:text-3xl lg:text-4xl"
              >
                {t.sectionOptionsTitle}
              </h2>
              <p className="text-center text-lg font-semibold uppercase text-red-600 md:text-xl lg:text-2xl">
                {t.sectionOptionsSubTitle}
              </p>
              <p className="text-center text-slate-950">
                {t.sectionOptionsParagraph}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoCard
                card={{
                  title: t.optionNoContractsTitle,
                  icon: <FileX />,
                  lines: [{ text: t.optionNoContractsText, important: false }],
                }}
              />
              <InfoCard
                card={{
                  title: t.optionEquipmentTitle,
                  icon: <Dumbbell />,
                  lines: [{ text: t.optionEquipmentText, important: false }],
                }}
              />
              <InfoCard
                card={{
                  title: t.optionCoachingTitle,
                  icon: <UserCheck />,
                  lines: [{ text: t.optionCoachingText, important: false }],
                }}
              />
              <InfoCard
                card={{
                  title: t.optionUnlimitedAccessTitle,
                  icon: <Clock />,
                  lines: [{ text: t.optionUnlimitedAccessText, important: false }],
                }}
              />
            </div>
          </div>

          {/* Option photos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image src={optionGirl} alt="Merginos sporto klube" />
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image src={optionPush} alt="SkyGym spaudimas" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image src={optionBoxing} alt="SkyGym boksas" />
              </div>

              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image src={optionCardio} alt="SkyGym kardio pratimai" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="container mx-auto px-1 py-10 lg:px-0"
        aria-labelledby="services-heading"
      >
        <h2
          id="services-heading"
          className="text-center text-2xl font-semibold uppercase text-slate-950 md:text-3xl lg:text-4xl"
        >
          {t.sectionEquipmentTitle}
        </h2>

        <p className="text-center text-lg font-semibold uppercase text-red-600 md:text-xl lg:text-2xl">
          {t.sectionEquipmentSubTitle}
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </>
  );
}
