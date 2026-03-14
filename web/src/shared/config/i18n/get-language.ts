import { defaultLanguage, supportedLanguages, type Language } from './config';

export const isLanguage = (value: unknown): value is Language => {
  return supportedLanguages.includes(value as Language);
};

export const getLanguage = (value?: string | null): Language => {
  if (value && isLanguage(value)) {
    return value;
  }

  return defaultLanguage;
};
