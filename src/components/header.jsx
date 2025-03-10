export default function Header() {
  return (
    <div className="text-black">
      <div className="container mx-auto py-4 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full shadow-md">
              <img
                src="/assets/logo_gdg.png"
                alt="SustAIn"
                className="h-16 w-16"
                height={64}
                width={64}
              />
            </div>
            <div className="">
              <h1 className="text-4xl font-bold tracking-tight">SustAIn</h1>
              <p className="text-gray-900 font-medium mt-1 text-left text-sm">
                Know Your Impact, Make a Difference.
              </p>
              <div className="mt-1">
                <p className="text-gray-800 font-medium flex items-center">
                  Built for
                  <img
                    src="/assets/google.webp"
                    alt="Google"
                    className="h-5 w-5 mx-1"
                    height={20}
                    width={20}
                  />
                  Solutions Challenge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
