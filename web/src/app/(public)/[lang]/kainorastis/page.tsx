import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';
import Link from 'next/link';
import {
  Dumbbell,
  GraduationCap,
  Heart,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

// ── Helpers ──────────────────────────────────────────────────────────────────

function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
}

// ── Card Component ───────────────────────────────────────────────────────────

function PricingCard({
  icon,
  title,
  price,
  priceLabel,
  features,
  description,
  highlight,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  price: number;
  priceLabel: string;
  features?: string[];
  description?: string;
  highlight?: string;
  cta?: React.ReactNode;
}) {
  return (
    <article
      className={`relative flex flex-col rounded-xl border-2 p-6 transition-shadow duration-300 hover:shadow-lg ${
        highlight
          ? 'border-red-600 bg-red-600/5'
          : 'border-slate-600 text-slate-950'
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-50">
          {highlight}
        </span>
      )}

      <div className="mb-4 flex items-center gap-3">
        <div
          className="shrink-0 rounded-lg bg-slate-300 p-2.5"
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3 className="text-lg font-bold uppercase">{title}</h3>
      </div>

      <div className="mb-4">
        <span className="text-4xl font-extrabold text-red-600">{price}</span>
        <span className="ml-1 text-lg font-semibold text-red-600">€</span>
        <span className="ml-2 text-sm text-slate-500">{priceLabel}</span>
      </div>

      {features && features.length > 0 && (
        <ul className="mb-4 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-red-600" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {description && (
        <p className="mt-auto text-sm leading-relaxed text-slate-500">
          {description}
        </p>
      )}

      {cta && <div className="mt-4">{cta}</div>}
    </article>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

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
    <div className="mx-auto max-w-7xl px-2">
      {/* Title section */}
      <section className="flex flex-col items-center">
        <h1 className="relative mb-4 pt-8 uppercase">
          {t.title}
          <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-red-600" />
        </h1>
        <p className="max-w-xl text-center text-slate-600">{t.subTitle}</p>
        <p className="mt-3 rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          {t.adminHoursNotice}
        </p>
      </section>

      {/* Monthly plans */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PricingCard
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planStandardTitle}
          price={30}
          priceLabel={t.perMonth}
          features={features}
          description={t.planStandardDesc}
        />
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
      </section>

      {/* 6-month plan */}
      <section className="mt-6">
        <PricingCard
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planSixMonthTitle}
          price={120}
          priceLabel={t.perMonth}
          features={features}
          description={t.planSixMonthDesc}
          highlight={interpolate(t.saveLabel, { amount: 60 })}
        />
      </section>

      {/* Single visit & Personal training */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <PricingCard
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planSingleVisitTitle}
          price={6}
          priceLabel=""
          features={features}
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
          icon={<Dumbbell className="h-5 w-5" />}
          title={t.planPersonalTrainingTitle}
          price={25}
          priceLabel=""
          features={features}
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
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-slate-50 transition-colors hover:bg-red-700"
        >
          <MessageCircle className="h-5 w-5" />
          {t.contactUs}
        </Link>
      </section>
    </div>
  );
}
