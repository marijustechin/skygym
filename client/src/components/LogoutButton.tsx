import { logoutUser } from '../store/features/user/authSlice';
import { useAppDispatch } from '../store/store';

export const LogoutButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(logoutUser())}
      className="cursor-pointer border border-blue-500 rounded-lg px-2 py-1 bg-sky-600 hover:bg-sky-700"
    >
      Atsijungti
    </button>
  );
};
