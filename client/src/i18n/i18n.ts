import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ltLang from './locales/lt/lt.json';
import enLang from './locales/en/en.json';
import ruLang from './locales/ru/ru.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  lt: {
    translation: ltLang,
  },
  en: {
    translation: enLang,
  },
  ru: {
    translation: ruLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'lt',
    debug: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
