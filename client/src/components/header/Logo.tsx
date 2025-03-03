import logo from '/assets/logo.png';
export const Logo = () => {
  return (
    <div className="flex items-center">
      <img className="h-14" src={logo} alt="SkyGym logo" />
      <div className="flex flex-col">
        <span className="text-2xl text-blue-400 font-semibold -m-1">Sky</span>
        <span className="text-3xl text-rose-700 font-semibold -m-1">Gym</span>
      </div>
    </div>
  );
};
