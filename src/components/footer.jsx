const Footer = () => {
  return (
    <footer className="relative mt-2 w-full border-t border-gray-200 bg-white bg-opacity-90">
      <div className="flex justify-between items-center px-4 py-2 w-full">
        <p className="text-xs text-gray-600 flex items-center">
          Made with
          <span className="mx-1 text-red-500">❤️</span>
          by Team SustAIn
        </p>
        <div className="flex items-center text-xs text-gray-600">
          For
          <img
            src="/assets/google.webp"
            alt="Google"
            className="h-4 mx-1 object-contain"
          />
          Solution Challenge
        </div>
      </div>
    </footer>
  );
};

export default Footer;
