import * as z from 'zod';

export const RegistrationSchema = z.object({
  first_name: z.string().trim().min(1, { message: 'Pamiršote įvesti vardą' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Neteisingas el. pašto adreso formatas' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Slaptaždį turi sudaryti ne mažiau kaip 6 simboliai' }),
});
