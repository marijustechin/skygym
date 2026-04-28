import { type FormsDictionary } from '@/shared/config/i18n/dictionary';
import { z } from 'zod';

export const createLoginSchema = (langStrings: FormsDictionary) => {
  const { validation } = langStrings;

  return z.object({
    email: z
      .string()
      .trim()
      .min(1, { error: validation.email_required })
      .max(254, { error: validation.email_max_length })
      .email({ error: validation.email_invalid }),

    password: z
      .string()
      .min(1, { error: validation.password_required })
      .min(8, { error: validation.password_min_length })
      .max(72, { error: validation.password_max_length })
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        error: validation.password_invalid,
      }),
  });
};

export type RegisterFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
