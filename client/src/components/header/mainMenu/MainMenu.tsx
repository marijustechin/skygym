import { NavLink } from 'react-router';
import { mainMenuLinks } from './mainMenuLinks';

// className={({ isActive }) =>
//   isActive
//     ? 'border border-slate-600 py-1 px-2 rounded-lg bg-slate-800'
//     : 'hover:text-slate-100 border border-slate-900 hover:border-slate-600 rounded-lg py-1 px-2'
// }

export const MainMenu = () => {
  return (
    <nav className="flex gap-2 uppercase">
      {mainMenuLinks.map((link) => (
        <div key={link.title}>
          <NavLink
            className={({ isActive }) => `border py-1 px-2 
              ${
                isActive
                  ? 'border-rose-400 rounded-lg'
                  : 'border-slate-500 rounded-lg hover:border-slate-700'
              }
            `}
            to={link.href}
          >
            {link.title}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};
