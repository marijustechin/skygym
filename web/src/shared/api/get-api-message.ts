import type { FormsDictionary } from '../config/i18n/dictionary';

export const getApiMessage = (
  code: keyof FormsDictionary['api'] | string,
  messages: FormsDictionary['api'],
): string => {
  const message = messages[code as keyof FormsDictionary['api']];
  return message || messages['UNKNOWN_ERROR'];
};
