const Header = () => {
  return (
    <header className="flex relative flex-col items-start w-full border-b border-gray-200 bg-white bg-opacity-90 shadow-sm">
      <div className="flex gap-2 items-center p-2">
        <img
          src="/assets/logo_gdg.png"
          alt="SustAIn Logo"
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[44px]"
        />
        <div className="flex flex-col justify-center self-stretch my-auto w-full">
          <h1 className="text-xl font-bold text-gray-800">SustAIn</h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Know your Impact, Make a Difference
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
