import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Pamiršote įvesti el.pašto adresą' })
    .email({ message: 'Neteisingas el. pašto adreso formatas' }),
  password: z.string().min(1, { message: 'Pamiršote įvesti slaptažodį' }),
});
