const WbSectionWrapper = ({ children, className }) => {
  return (
    <section
      className={`md:w-full py-3 sm:px-4 md:px-12 sm:mt-5 md:mt-10 ${className}`}
    >
      {children}
    </section>
  );
};
export default WbSectionWrapper;
