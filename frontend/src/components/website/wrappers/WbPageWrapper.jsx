const WbPageWrapper = ({ children, className }) => {
  return (
    <div className={`py-3 sm:px-4 md:px-12 sm:mt-5 md:mt-10 ${className}`}>
      {children}
    </div>
  );
};
export default WbPageWrapper;
