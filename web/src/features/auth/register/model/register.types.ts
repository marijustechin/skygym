import { Language } from '@/shared/config/i18n/config';

export type TRegisterPayload = {
  firstName: string;
  email: string;
  password: string;
  lang: Language;
};
