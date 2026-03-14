import type { Language } from './config';
import { Dictionary } from './dictionary';

const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  lt: async () => ({
    public: (await import('./dictionaries/lt/public.json')).default,
    // admin: (await import('./dictionaries/lt/admin.json')).default,
    // api: (await import('./dictionaries/lt/api.json')).default,
    // forms: (await import('./dictionaries/lt/forms.json')).default,
  }),
  en: async () => ({
    public: (await import('./dictionaries/en/public.json')).default,
    // admin: (await import('./dictionaries/en/admin.json')).default,
    // api: (await import('./dictionaries/en/api.json')).default,
    // forms: (await import('./dictionaries/en/forms.json')).default,
  }),
  ru: async () => ({
    public: (await import('./dictionaries/ru/public.json')).default,
    // admin: (await import('./dictionaries/ru/admin.json')).default,
    // api: (await import('./dictionaries/ru/api.json')).default,
    // forms: (await import('./dictionaries/ru/forms.json')).default,
  }),
};

export async function getDictionary(lang: Language): Promise<Dictionary> {
  return dictionaries[lang]();
}
