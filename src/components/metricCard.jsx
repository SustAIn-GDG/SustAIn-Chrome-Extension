const MetricCard = ({
  icon,
  value,
  description,
  gradientBackground = "bg-gradient-to-br from-blue-100 to-blue-200",
}) => {
  return (
    <article className="flex gap-3 items-center px-4 w-full transition-all duration-200 hover:translate-x-1">
      <div className={`rounded-2xl ${gradientBackground} p-3.5 shadow-md`}>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt=""
            className="object-contain shrink-0 my-auto w-14 h-14 rounded-none"
            aria-hidden="true"
          />
        ) : (
          <div className="shrink-0 my-auto w-14 h-14 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="self-stretch pt-2 pb-1 my-auto min-h-[64px] w-[170px]">
        <h3 className="text-lg font-bold tracking-tight">{value}</h3>
        <p className="mt-1.5 text-sm leading-snug text-gray-800">
          {description}
        </p>
      </div>
    </article>
  );
};

export default MetricCard;
