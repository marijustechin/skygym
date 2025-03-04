import { Link } from 'react-router';

export const LoginButton = () => {
  return (
    <Link
      to={'/prisijungimas'}
      className="cursor-pointer border border-blue-500 rounded-lg px-2 py-1 bg-sky-600 hover:bg-sky-700"
    >
      Prisijunk
    </Link>
  );
};
