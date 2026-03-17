import { type FormsDictionary } from '@/shared/config/i18n/dictionary';
import { z } from 'zod';

export const createRegisterSchema = (langStrings: FormsDictionary) => {
  const { validation } = langStrings;

  return z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, { error: validation.first_name_required })
        .min(2, { error: validation.first_name_min })
        .max(30, { error: validation.first_name_max })
        .regex(/^[\p{L}]+(?:['-][\p{L}]+)*$/u, {
          error: validation.first_name_invalid,
        }),

      email: z
        .string()
        .trim()
        .min(1, { error: validation.email_required })
        .email({ error: validation.email_invalid }),

      password: z
        .string()
        .trim()
        .min(1, { error: validation.password_required })
        .min(6, { error: validation.password_min_length })
        .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
          error: validation.password_invalid,
        }),

      confirmPassword: z
        .string()
        .trim()
        .min(1, { error: validation.confirm_password_required }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: validation.passwords_do_not_match,
    });
};

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
