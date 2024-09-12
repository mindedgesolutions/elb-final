const WbPageWrapper = ({ children, className }) => {
  return (
    <div
      className={`md:max-w-[1600px] mx-auto py-3 sm:px-4 md:px-12 sm:mt-5 md:mt-10 ${className}`}
    >
      {children}
    </div>
  );
};
export default WbPageWrapper;
