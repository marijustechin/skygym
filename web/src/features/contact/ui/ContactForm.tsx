'use client';

import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import type { FormsDictionary } from '@/shared/config/i18n/dictionary';
import {
  createContactSchema,
  type ContactFormValues,
} from '../model/contact-schema';
import { FormShell } from '@/shared/ui/form-shell';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { submitContact } from '../api/submit-contact';
import { SkyGymButton } from '@/shared/ui/skygym-button';
import { TurnstileWidget } from '@/shared/ui/turnstile-widget';
import { Send } from 'lucide-react';

type ContactFormProps = {
  langStrings: FormsDictionary;
};

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export const ContactForm = ({ langStrings }: ContactFormProps) => {
  const schema = useMemo(() => createContactSchema(langStrings), [langStrings]);

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const { common, contact, api } = langStrings;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset: formReset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileResetKey((k) => k + 1);
    setTurnstileToken(null);
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setServerError(null);

      if (!turnstileToken) {
        setServerError(api?.CAPTCHA_REQUIRED ?? 'Please complete the captcha.');
        return;
      }

      const res = await submitContact({
        name: values.name,
        email: values.email,
        message: values.message,
        captchaToken: turnstileToken,
      });

      if (res.success) {
        setSubmitted(true);
        formReset();
        resetTurnstile();
        return;
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { details?: string[] } } };
      const details = err?.response?.data?.details;
      if (details?.length) {
        setServerError(details.join(' '));
      } else {
        setServerError(api?.UNKNOWN_ERROR ?? 'Something went wrong.');
      }
      resetTurnstile();
    }
  };

  if (submitted) {
    return (
      <FormShell headerLabel={contact.title} className="max-w-md">
        <p className="text-center text-slate-300">
          {api?.CONTACT_FORM_SUBMITTED ?? 'Message sent. Thank you!'}
        </p>
      </FormShell>
    );
  }

  return (
    <FormShell headerLabel={contact.title} className="max-w-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="contact-name">
            {common.input_name_label}
          </FieldLabel>
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && <FieldError errors={[errors.name]} />}
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="contact-email">
            {common.input_email_label}
          </FieldLabel>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && <FieldError errors={[errors.email]} />}
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">
            {common.input_message_label}
          </FieldLabel>
          <Textarea
            id="contact-message"
            rows={5}
            aria-invalid={!!errors.message}
            {...register('message')}
          />
          {errors.message && <FieldError errors={[errors.message]} />}
        </Field>

        <TurnstileWidget
          siteKey={TURNSTILE_SITE_KEY}
          onVerify={handleTurnstileVerify}
          onExpire={handleTurnstileExpire}
          resetKey={turnstileResetKey}
        />

        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}

        <SkyGymButton
          type="submit"
          icon={<Send />}
          buttonText={contact.submit_button}
          buttonClass="w-full rounded-md bg-red-600 hover:bg-red-700 text-slate-50 font-semibold py-2 my-4"
          isLoading={isSubmitting}
        />
      </form>
    </FormShell>
  );
};
