const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex flex-col items-start w-full border-b border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="flex gap-1.5 items-center p-2.5">
        <img
          src="/assets/logo_gdg.png"
          alt="SustAIn Logo"
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[42px]"
          aria-label="SustAIn Logo"
        />
        <div className="flex flex-col justify-center self-stretch my-auto">
          <h1 className="text-lg font-bold text-gray-800 tracking-tight">
            SustAIn
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Know your Impact, Make a Difference
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
