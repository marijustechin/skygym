'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import type { FormsDictionary } from '@/shared/config/i18n/dictionary';
import {
  createRegisterSchema,
  type RegisterFormValues,
} from '../model/register-schema';
import { FormShell } from '@/shared/ui/form-shell';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Language } from '@/shared/config/i18n/config';
import { registerUser } from '../api/register-user';
import { getApiErrorCode } from '@/shared/api/get-api-error-code';
import { getApiMessage } from '@/shared/api/get-api-message';
import { useRouter } from 'next/navigation';

type RegisterFormProps = {
  langStrings: FormsDictionary;
  lang: Language;
};

export const RegisterForm = ({ langStrings, lang }: RegisterFormProps) => {
  const schema = useMemo(
    () => createRegisterSchema(langStrings),
    [langStrings],
  );

  const router = useRouter();

  const { common, registration, api } = langStrings;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const { firstName, email, password } = values;

      const res = await registerUser({
        firstName,
        email,
        password,
        lang,
      });

      if (res.code === 'USER_REGISTRATION_SUCCESSFUL') {
        sessionStorage.setItem('registrationSuccess', '1');
        router.push(`/${lang}/registracija/pasto-patvirtinimas`);

        return;
      }

      console.warn('Unexpected success response code:', res.code);
    } catch (error) {
      const code = getApiErrorCode(error);
      if (code === 'MISSING_RESPONSE_CODE') {
        console.warn('API response missing code!');
      } else {
        console.log(getApiMessage(code, api));
      }
    }
  };

  const footer = (
    <p className="text-sm text-muted-foreground">
      {common.login_question}{' '}
      <Link
        href={`/${lang}/prisijungti`}
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {common.login_link}
      </Link>
    </p>
  );

  return (
    <FormShell headerLabel={registration.title} footer={footer}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Field data-invalid={!!errors.firstName}>
          <FieldLabel htmlFor="firstName">{common.input_name_label}</FieldLabel>
          <Input
            className="form-input"
            id="firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register('firstName')}
          />
          {errors.firstName && <FieldError errors={[errors.firstName]} />}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{common.input_email_label}</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">
            {common.input_password_label}
          </FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">
            {common.input_confirm_password_label}
          </FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? common.please_wait_message
            : registration.submit_button}
        </Button>
      </form>
    </FormShell>
  );
};
