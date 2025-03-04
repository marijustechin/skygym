import { Outlet, useNavigate } from 'react-router';
import { Header } from '../components/header/Header';
import { Footer } from '../components/Footer';
import { useAppSelector } from '../store/store';
import { selectUser } from '../store/features/user/authSlice';
import { useEffect } from 'react';

export const UserLayout = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'USER') navigate('/prisijungimas');
  }, [user, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
