const MetricCard = ({
  icon,
  value,
  description,
  gradientBackground = "bg-gradient-to-br from-blue-100 to-blue-200",
}) => {
  return (
    <article className="flex gap-2 items-center px-3 w-full">
      <div className={`rounded-xl ${gradientBackground} p-3 shadow-sm`}>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt=""
            className="object-contain shrink-0 my-auto w-16 h-16 rounded-none"
            aria-hidden="true"
          />
        ) : (
          <div className="shrink-0 my-auto w-16 h-16 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      <div className="self-stretch pt-3 pb-px my-auto min-h-[64px] w-[160px]">
        <h3 className="text-base font-bold">{value}</h3>
        <p className="mt-1 text-sm">{description}</p>
      </div>
    </article>
  );
};

export default MetricCard;
