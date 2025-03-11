const Header = () => {
  return (
    <header className="flex relative flex-col items-start w-full border-b border-black bg-white bg-opacity-60">
      <div className="flex gap-1.5 items-center p-1.5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8c99e03427a3da8508577654a8a294af81b5ed16d48a6160a745c6b4efa2902?placeholderIfAbsent=true"
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
