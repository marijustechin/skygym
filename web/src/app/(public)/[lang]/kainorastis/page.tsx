import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import {
  Dumbbell,
  GraduationCap,
  Heart,
  CheckCircle2,
  MessageCircle,
  Zap,
  User,
} from 'lucide-react';

function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}

type CardVariant = 'default' | 'popular' | 'highlight' | 'slate';

const variantStyles: Record<CardVariant, string> = {
  default: 'border-slate-200 bg-white',
  popular: 'border-red-600 bg-white ring-2 ring-red-600',
  highlight: 'border-red-600/20 bg-red-600/5',
  slate: 'border-slate-400 bg-slate-300',
};

function PricingCard({
  icon,
  title,
  price,
  priceLabel,
  features,
  description,
  variant = 'default',
  badge,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  price: number;
  priceLabel: string;
  features?: string[];
  description?: string;
  variant?: CardVariant;
  badge?: string;
  cta?: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-xl border-2 p-6 transition-shadow duration-300 hover:shadow-xl',
        variantStyles[variant],
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          {badge}
        </span>
      )}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="shrink-0 rounded-lg bg-slate-200 p-2.5"
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold uppercase tracking-wide">{title}</h3>
      </div>

      <div className="mb-5 text-center">
        <span className="text-5xl font-extrabold text-red-600">{price}</span>
        <span className="text-2xl font-semibold text-red-600">€</span>
        {priceLabel && (
          <span className="ml-1 text-base text-slate-500">{priceLabel}</span>
        )}
      </div>

      {features && features.length > 0 && (
        <ul className="mb-5 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {description && (
        <p className="mt-auto leading-relaxed text-slate-500">{description}</p>
      )}

      {cta && <div className="mt-5">{cta}</div>}
    </article>
  );
}

export default async function PriceList({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);
  const t = dict.public.pricelist_page;

  const features = [t.unlimitedHours, t.readyTrainers, t.yearDiscounts];

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Title section */}
      <section className="flex flex-col items-center">
        <h1 className="relative mb-4 pt-8 text-3xl font-bold uppercase">
          {t.title}
          <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-red-600" />
        </h1>
        <p className="max-w-xl text-center text-slate-600">{t.subTitle}</p>
        <p className="mt-3 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          {t.adminHoursNotice}
        </p>
      </section>

      {/* Row 1 — 3 columns: monthly plans */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          icon={<GraduationCap className="h-5 w-5" />}
          title={t.planStudentTitle}
          price={25}
          priceLabel={t.perMonth}
          features={features}
          description={t.planStudentDesc}
        />
        <PricingCard
          icon={<Heart className="h-5 w-5" />}
          title={t.planFitnessTitle}
          price={25}
          priceLabel={t.perMonth}
          features={features}
          description={t.planFitnessDesc}
        />
        <PricingCard
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planStandardTitle}
          price={30}
          priceLabel={t.perMonth}
          features={features}
          description={t.planStandardDesc}
          variant="popular"
          badge={t.popularLabel}
        />
      </section>

      {/* Row 2 — 2 columns: 3-month & 6-month */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <PricingCard
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planThreeMonthTitle}
          price={70}
          priceLabel={t.perMonth}
          features={features}
          description={t.planThreeMonthDesc}
          variant="highlight"
          badge={interpolate(t.saveLabel, { amount: 20 })}
        />
        <PricingCard
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planSixMonthTitle}
          price={120}
          priceLabel={t.perMonth}
          features={features}
          description={t.planSixMonthDesc}
          variant="highlight"
          badge={interpolate(t.saveLabel, { amount: 60 })}
        />
      </section>

      {/* Row 3 — 2 columns: single visit & personal training */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <PricingCard
          icon={<Zap className="h-5 w-5" />}
          title={t.planSingleVisitTitle}
          price={6}
          priceLabel=""
          features={features}
          variant="slate"
          cta={
            <Link
              href={`/${lang}/kontaktai/`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              {t.haveQuestions}
            </Link>
          }
        />
        <PricingCard
          icon={<User className="h-5 w-5" />}
          title={t.planPersonalTrainingTitle}
          price={25}
          priceLabel=""
          features={features}
          variant="slate"
          cta={
            <Link
              href={`/${lang}/kontaktai/`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              {t.haveQuestions}
            </Link>
          }
        />
      </section>

      {/* Bottom CTA */}
      <section className="mb-10 mt-12 text-center">
        <Link
          href={`/${lang}/kontaktai/`}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          <MessageCircle className="h-5 w-5" />
          {t.contactUs}
        </Link>
      </section>
    </div>
  );
}
