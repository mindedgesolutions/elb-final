const WbRatingStatusbar = ({ stars, review, totalReview }) => {
  const width = Math.round((review / totalReview) * 100);

  return (
    <div className="flex justify-start items-center gap-2 sm:mt-4 md:mt-0">
      <span className="text-sm font-medium text-gray-800">{stars} Star</span>
      <div className="bg-gray-200 relative sm:h-3 md:h-4 sm:w-[250px] md:basis-4/5 rounded-2xl">
        <div
          className={`bg-green-500 absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-white`}
          style={{ width: `${Number(width)}%` }}
        >
          {width > 0 && width + `%`}
        </div>
      </div>
      <span className="text-sm font-medium text-gray-800">({review})</span>
    </div>
  );
};
export default WbRatingStatusbar;
