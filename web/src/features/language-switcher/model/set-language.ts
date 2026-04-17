import {
  LANGUAGE_STORAGE_KEY,
  type Language,
} from '@/shared/config/i18n/config';

export async function setLanguage(language: Language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
