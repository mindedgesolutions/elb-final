const WbSectionWrapper = ({ children, className }) => {
  return (
    <section className={`sm:py-5 md:py-10 sm:mt-5 md:mt-10 ${className}`}>
      <div className="md:w-full sm:px-4 md:px-12">{children}</div>
    </section>
  );
};
export default WbSectionWrapper;
