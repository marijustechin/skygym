import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema } from '../../schemas/LoginSchema';
import { Link } from 'react-router';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto my-4"
    >
      <h1 className="text-slate-200 text-2xl text-center">
        🔑 Prašome prisijungti
      </h1>
      <div className="flex flex-col gap-2  border border-slate-500 rounded-xl p-2">
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
          Pirmas kartas?{' '}
          <Link
            className="text-slate-300 underline underline-offset-6 hover:text-slate-200"
            to={'/registracija'}
          >
            Prašome užsiregistruoti
          </Link>
        </p>
      </div>
    </form>
  );
};
