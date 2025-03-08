import { LoginForm } from '../components/auth/LoginForm';
import track from '/assets/running-track.png';

export const LoginPage = () => {
  return (
    <main className="relative">
      <div>
        <LoginForm />
      </div>
      <div className="absolute top-0 left-0 -translate-x-20">
        <img src={track} alt="Running track" />
      </div>
    </main>
  );
};
