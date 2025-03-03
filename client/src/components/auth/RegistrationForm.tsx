import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { RegistrationSchema } from '../../schemas/RegistrationSchema';

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      first_name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof RegistrationSchema>> = (
    formData
  ) => {
    console.log(formData);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto my-4"
    >
      <h1 className="text-slate-200 text-2xl text-center">
        ✍ Prašome užsiregistruoti
      </h1>
      <div className="flex flex-col gap-2  border border-slate-500 rounded-xl p-2">
        <div className="flex flex-col">
          <input
            id="first_name"
            className="form-input"
            type="text"
            autoComplete="on"
            placeholder="Jūsų vardas"
            {...register('first_name')}
          />
          {errors.first_name && (
            <span className="text-sm text-rose-500">
              {errors.first_name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            id="email"
            className="form-input"
            type="text"
            autoComplete="on"
            placeholder="El.pašto adresas"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-sm text-rose-500">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            id="password"
            className="form-input"
            type="password"
            autoComplete="on"
            placeholder="Slaptažodis"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-sm text-rose-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <button className="btn-generic w-full text-slate-100" type="submit">
          Prisijungti
        </button>
      </div>
      <div>
        <p className="text-slate-400 mt-3 text-center">
          Ne pirmas kartas?{' '}
          <Link
            className="text-slate-300 underline underline-offset-6 hover:text-slate-200"
            to={'/prisijungimas'}
          >
            Prašome prisijungti
          </Link>
        </p>
      </div>
    </form>
  );
};
