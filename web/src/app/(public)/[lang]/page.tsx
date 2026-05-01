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
import heroImg from '../../../../public/img/home-page/pradzia-hero.webp';
import optionGirl from '../../../../public/img/home-page/options/merginos-sporto-klube.webp';
import optionPush from '../../../../public/img/home-page/options/skygym-spaudimas.webp';
import optionCardio from '../../../../public/img/home-page/options/kardio-pratimai.webp';
import optionBoxing from '../../../../public/img/home-page/options/skygym-boksas.webp';
import servicePower from '../../../../public/img/home-page/options/jegos-treniruotes.webp';
import serviceGymnastics from '../../../../public/img/home-page/options/gimnastika.webp';
import serviceCardio from '../../../../public/img/home-page/options/paslaugos-laikinas.webp';

// ── Card Components ──────────────────────────────────────────────────────────

function OptionsCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="text-slate-950 flex flex-col gap-6 rounded-xl border-2 border-slate-600 hover:border-slate-600/50 transition-colors duration-300">
      <div className="last:pb-6 p-6">
        <div className="flex items-start space-x-4">
          <div
            className="bg-slate-300 p-3 rounded-lg shrink-0"
            aria-hidden="true"
          >
            {icon}
          </div>
          <div>
            <h3 className="font-bold mb-2 text-slate-950">{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

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
    <article className="text-slate-950 flex flex-col gap-6 rounded-xl border group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <Image
          alt={imageAlt}
          src={image}
          className="w-full h-48 object-cover"
        />
        <div
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg"
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
      <div className="px-6 pt-2">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="px-6 last:pb-6 space-y-4">
        <p className="text-slate-600 leading-relaxed">{description}</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-center text-sm">
              <span
                className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 shrink-0"
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
      icon: <Dumbbell className="w-5 h-5" />,
      title: t.servicePowerTitle,
      description: t.servicePowerDesc,
      items: [t.servicePowerItem1, t.servicePowerItem2, t.servicePowerItem3],
    },
    {
      image: serviceGymnastics,
      imageAlt: 'Gimnastika ir tempimas',
      icon: <Activity className="w-5 h-5" />,
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
      icon: <Heart className="w-5 h-5" />,
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
          <p className="text-slate-100 font-bold uppercase tracking-wider text-xl md:text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-red-600/55 p-3 rounded-xl">
            {t.subTitle}
          </p>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="container mx-auto py-10 px-1 lg:px-0 border-b border-slate-400"
        aria-labelledby="about-heading"
      >
        {/* Options */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2
                id="about-heading"
                className="font-semibold uppercase text-center text-2xl md:text-3xl lg:text-4xl text-slate-950"
              >
                {t.sectionOptionsTitle}
              </h2>
              <p className="font-semibold text-lg md:text-xl lg:text-2xl uppercase text-center text-red-600">
                {t.sectionOptionsSubTitle}
              </p>
              <p className="text-center text-slate-950">
                {t.sectionOptionsParagraph}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <OptionsCard
                title={t.optionNoContractsTitle}
                text={t.optionNoContractsText}
                icon={<FileX />}
              />
              <OptionsCard
                title={t.optionEquipmentTitle}
                text={t.optionEquipmentText}
                icon={<Dumbbell />}
              />
              <OptionsCard
                title={t.optionCoachingTitle}
                text={t.optionCoachingText}
                icon={<UserCheck />}
              />
              <OptionsCard
                title={t.optionUnlimitedAccessTitle}
                text={t.optionUnlimitedAccessText}
                icon={<Clock />}
              />
            </div>
          </div>

          {/* Option photos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image src={optionGirl} alt="Merginos sporto klube" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image src={optionPush} alt="SkyGym spaudimas" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image src={optionBoxing} alt="SkyGym boksas" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image src={optionCardio} alt="SkyGym kardio pratimai" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="container mx-auto py-10 px-1 lg:px-0"
        aria-labelledby="services-heading"
      >
        <h2
          id="services-heading"
          className="font-semibold uppercase text-center text-2xl md:text-3xl lg:text-4xl text-slate-950"
        >
          {t.sectionEquipmentTitle}
        </h2>
        <p className="font-semibold text-lg md:text-xl lg:text-2xl uppercase text-center text-red-600">
          {t.sectionEquipmentSubTitle}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </>
  );
}
