const MetricCard = ({ icon, value, description }) => {
  return (
    <article className="flex gap-3 items-center px-4 w-full">
      <img
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-24 rounded-none aspect-square"
        aria-hidden="true"
      />
      <div className="self-stretch pt-4 pb-px my-auto min-h-24 w-[214px]">
        <h3 className="text-xl font-bold">{value}</h3>
        <p className="mt-1.5 text-base">{description}</p>
      </div>
    </article>
  );
};

export default MetricCard;
