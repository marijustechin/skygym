import { getDictionary } from '@/shared/config/i18n/get-dictionary';
import type { Language } from '@/shared/config/i18n/config';

type RuleConfig = {
  key: string;
  items: string[] | null;
};

const rulesConfig: RuleConfig[] = [
  { key: 'rule1', items: null },
  { key: 'rule2', items: null },
  {
    key: 'rule3',
    items: ['rule3Item1', 'rule3Item2', 'rule3Item3', 'rule3Item4'],
  },
  { key: 'rule4', items: null },
  { key: 'rule5', items: null },
  { key: 'rule6', items: null },
  { key: 'rule7', items: null },
  { key: 'rule8', items: null },
  { key: 'rule9', items: null },
  {
    key: 'rule10',
    items: [
      'rule10Item1',
      'rule10Item2',
      'rule10Item3',
      'rule10Item4',
      'rule10Item5',
      'rule10Item6',
    ],
  },
  { key: 'rule11', items: ['rule11Item1', 'rule11Item2', 'rule11Item3'] },
  { key: 'rule12', items: null },
  { key: 'rule13', items: null },
];

export default async function Rules({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Language);
  const t = dict.public.rules_page;

  return (
    <div className="mx-auto max-w-5xl px-2">
      {/* Title section */}
      <section className="flex flex-col items-center">
        <h1 className="relative mb-4 pt-8 uppercase">
          {t.title}
          <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-red-600" />
        </h1>
        <p className="text-sm font-medium text-slate-500">{t.subTitle}</p>
      </section>

      {/* Intro */}
      <section className="mt-8 rounded-xl border-2 border-red-600/20 bg-red-600/5 p-6">
        <p className="leading-relaxed text-slate-700">{t.intro}</p>
      </section>

      {/* Rules */}
      <section className="mt-8 mb-10 space-y-4">
        {rulesConfig.map((rule, idx) => {
          const ruleText = t[rule.key as keyof typeof t];
          const subItems = rule.items
            ? rule.items.map((itemKey) => t[itemKey as keyof typeof t])
            : null;

          return (
            <article
              key={rule.key}
              className="rounded-xl border border-slate-600 p-6 transition-colors duration-300 hover:border-slate-500"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-slate-50">
                  {idx + 1}
                </span>
                <div className="min-w-0 space-y-2">
                  <p className="leading-relaxed text-slate-950">{ruleText}</p>
                  {subItems && (
                    <ul className="ml-2 space-y-1.5">
                      {subItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
