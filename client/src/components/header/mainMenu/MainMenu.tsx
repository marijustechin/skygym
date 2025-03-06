import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { MdClose, MdMenu } from 'react-icons/md';
import { MainMenuLinks } from './MainMenuLinks';

export const TopMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = MainMenuLinks();

  return (
    <nav className="bg-slate-800 text-slate-200 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Desktop Menu */}
        {links.map((link) => (
          <div key={link.title} className="hidden md:flex gap-6 items-center">
            <NavLink
              className={({ isActive }) => `border py-1 px-2 uppercase 
              ${
                isActive
                  ? 'border-slate-400 rounded-lg shadow-md shadow-slate-700 bg-slate-900'
                  : 'border-slate-500 rounded-lg hover:border-slate-700'
              }
            `}
              to={link.href}
            >
              {link.title}
            </NavLink>
          </div>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-slate-900 p-4 rounded-lg">
          <Link
            to="/about"
            className="hover:text-sky-400"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/classes"
            className="hover:text-sky-400"
            onClick={() => setIsOpen(false)}
          >
            Classes
          </Link>
          <Link
            to="/contact"
            className="hover:text-sky-400"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};
