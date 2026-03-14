import { Dictionary } from '@/shared/config/i18n/dictionary';
import { Language } from '@/shared/config/i18n/config';
import { routes, RouteKey, getRoutePath } from '@/shared/config/routes';

export interface NavItem {
  key: RouteKey;
  label: string;
  href: string;
}

export const getHeaderNavigation = (
  language: Language,
  dict: Dictionary['public']['menu_links'],
): NavItem[] => {
  return (Object.keys(routes) as RouteKey[]).map((key) => ({
    key,
    label: dict[key],
    href: getRoutePath(language, key),
  }));
};
