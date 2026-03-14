import { Language } from '@/shared/config/i18n/config';
import { RouteKey, routes } from '@/shared/config/routes';

export const getRoutePath = (
  language: Language,
  routeKey: RouteKey,
): string => {
  const segment = routes[routeKey];

  if (routeKey === 'home') {
    return `/${language}`;
  }

  return `/${language}/${segment}`;
};
