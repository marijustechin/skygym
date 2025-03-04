import { selectUser } from '../../../store/features/user/authSlice';
import { useAppSelector } from '../../../store/store';
import { LogoutButton } from '../../LogoutButton';
import { LoginButton } from './LoginButton';

export const UserMenu = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex gap-2">
      {user.role === 'USER' ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};
