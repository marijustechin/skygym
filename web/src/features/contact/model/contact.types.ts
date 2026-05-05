import { Language } from '@/shared/config/i18n/config';

export type TContactPayload = {
  name: string;
  email: string;
  message: string;
  lang: Language;
};
