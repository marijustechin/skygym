import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email_required' })
    .email({ message: 'invalid_email' }),
  password: z.string().min(6, { message: 'password_min_length' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
