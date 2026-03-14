import { Language } from './i18n/config';

export const routes = {
  home: '',
  pricelist: 'kainorastis',
  rules: 'taisykles',
  contacts: 'kontaktai',
} as const;

export type RouteKey = keyof typeof routes;

export const getRoutePath = (language: Language, key: RouteKey): string => {
  const segment = routes[key];

  if (key === 'home') {
    return `/${language}`;
  }

  return `/${language}/${segment}`;
};
