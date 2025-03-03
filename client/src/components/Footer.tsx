import { Link } from 'react-router';
import logo from '/assets/logo.png';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="sg-container flex gap-2 items-end border-t border-slate-600 py-2 text-sm text-slate-400">
      <img className="h-8" src={logo} alt="SkyGym logo" />
      <span>
        &copy; {year} m. SkyGym -{' '}
        <Link className="hover:underline hover:text-slate-300" to={'/'}>
          Sporto klubas Vilniuje
        </Link>
        . Visos teisės ginamos.
      </span>
    </footer>
  );
};
