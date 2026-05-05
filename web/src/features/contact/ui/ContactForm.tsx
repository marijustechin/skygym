'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import type { FormsDictionary } from '@/shared/config/i18n/dictionary';
import {
  createContactSchema,
  type ContactFormValues,
} from '../model/contact-schema';
import { FormShell } from '@/shared/ui/form-shell';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Language } from '@/shared/config/i18n/config';
import { submitContact } from '../api/submit-contact';
import { SkyGymButton } from '@/shared/ui/skygym-button';
import { Send } from 'lucide-react';

type ContactFormProps = {
  langStrings: FormsDictionary;
  lang: Language;
};

export const ContactForm = ({ langStrings, lang }: ContactFormProps) => {
  const schema = useMemo(() => createContactSchema(langStrings), [langStrings]);

  const [submitted, setSubmitted] = useState(false);

  const { common, contact, api } = langStrings;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form;

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const { name, email, message } = values;

      const res = await submitContact({
        name,
        email,
        message,
        lang,
      });

      if (res.code === 'CONTACT_FORM_SUBMITTED') {
        setSubmitted(true);
        form.reset();
        return;
      }

      console.warn('Unexpected success response code:', res.code);
    } catch {
      // TODO: handle error once real API is wired
      console.warn(api?.UNKNOWN_ERROR ?? 'Something went wrong.');
    }
  };

  return (
    <FormShell headerLabel={contact.title} className="max-w-md">
      {submitted ? (
        <p className="text-center text-slate-300">
          {api?.CONTACT_FORM_SUBMITTED}
        </p>
      ) : (
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

          <SkyGymButton
            icon={<Send />}
            buttonText={contact.submit_button}
            buttonClass="w-full rounded-md bg-red-600 hover:bg-red-700 text-slate-50 font-semibold py-2 my-4"
          />
        </form>
      )}
    </FormShell>
  );
};
