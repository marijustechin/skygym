import { type FormsDictionary } from '@/shared/config/i18n/dictionary';
import { z } from 'zod';

export const createContactSchema = (langStrings: FormsDictionary) => {
  const { validation } = langStrings;

  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { error: validation.first_name_required })
      .min(2, { error: validation.first_name_min_length })
      .max(100, { error: validation.first_name_max_length }),

    email: z
      .string()
      .trim()
      .min(1, { error: validation.email_required })
      .max(254, { error: validation.email_max_length })
      .email({ error: validation.email_invalid }),

    message: z
      .string()
      .trim()
      .min(1, { error: validation.message_required })
      .min(10, { error: validation.message_min_length })
      .max(1000, { error: validation.message_max_length }),
  });
};

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
