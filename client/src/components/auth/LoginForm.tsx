import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginSchema } from '../../schemas/LoginSchema';
import { Link, useNavigate } from 'react-router';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import { loginUser, selectUser } from '../../store/features/user/authSlice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { status, error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = (formData) => {
    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };

  // redux klaidas sinchronizuojam su formos klaidomis
  useEffect(() => {
    if (error) {
      setError('root', { message: error });
    }
  }, [error, setError]);

  // jei viskas ok, redirectinam
  useEffect(() => {
    if (status === 'succeeded') {
      // ar useris, ar adminas
      if (user.role === 'ADMIN') {
        navigate('/suvestine');
        return;
      }

      if (user.role === 'USER') {
        navigate('/mano-paskyra');
        return;
      }
    }
  }, [status, user, navigate]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xs mx-auto my-4"
    >
      <h1 className="text-slate-200 text-2xl text-center">
        🔑 {t('form_title_login')}
      </h1>
      <div className="flex flex-col gap-2  border border-slate-500 rounded-xl p-2">
        <div className="flex flex-col">
          <input
            id="email"
            className="form-input autofill:transition-colors autofill:duration-[999999999s]"
            type="text"
            autoComplete="on"
            placeholder={t('form_placeholder_email')}
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
            placeholder={t('form_placeholder_password')}
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
            className="text-blue-300 underline underline-offset-6 hover:text-blue-100"
            to={'/registracija'}
          >
            Prašome užsiregistruoti
          </Link>
        </p>
      </div>
    </form>
  );
};
