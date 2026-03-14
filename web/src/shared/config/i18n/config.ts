export const supportedLanguages = ['lt', 'en', 'ru'] as const;
export type Language = (typeof supportedLanguages)[number];
export const defaultLanguage: Language = 'lt';

export const LANGUAGE_COOKIE_NAME = 'NEXT_LOCALE';
