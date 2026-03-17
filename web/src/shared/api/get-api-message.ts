import type { FormsDictionary } from '../config/i18n/dictionary';

export const getApiMessage = (
  code: string,
  messages: FormsDictionary['api'],
): string => {
  if (messages[code]) {
    return messages[code];
  } else {
    return messages['UNKNOWN_ERROR'];
  }
};
