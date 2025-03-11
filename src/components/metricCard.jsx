const MetricCard = ({ icon, value, description }) => {
  return (
    <article className="flex gap-2 items-center px-3 w-full">
      <img
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-[72px] rounded-none aspect-square"
        aria-hidden="true"
      />
      <div className="self-stretch pt-3 pb-px my-auto min-h-[72px] w-[160px]">
        <h3 className="text-base font-bold">{value}</h3>
        <p className="mt-1 text-sm">{description}</p>
      </div>
    </article>
  );
};

export default MetricCard;
