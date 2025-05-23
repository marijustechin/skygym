import { Outlet, useNavigate } from 'react-router';
import { useAppSelector } from '../store/store';
import { selectUser } from '../store/features/user/authSlice';
import { useEffect } from 'react';

export const AdminLayout = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'ADMIN') navigate('/prisijungimas');
  }, [user, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};
