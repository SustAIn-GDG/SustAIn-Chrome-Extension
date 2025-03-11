const Header = () => {
  return (
    <header className="flex relative flex-col items-start w-full border-b border-black bg-white bg-opacity-60">
      <div className="flex gap-1.5 items-center p-1.5">
        <img
          src="/assets/logo_gdg.png"
          alt="SustAIn Logo"
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[40px]"
        />
        <div className="flex flex-col justify-center self-stretch my-auto w-[160px]">
          <h1 className="text-xl font-bold">SustAIn</h1>
          <p className="text-xs">Know your Impact, Make a Difference</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
