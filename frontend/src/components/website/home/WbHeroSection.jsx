const WbHeroSection = () => {
  return (
    <section className="hero-one sm:h-[500px] md:h-[450px]">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-6 mt-n5">
            <div>
              <h1 className="hero-one-title fw-bold section-title animate__animated animate__fadeInLeft">
                Empowering Possibilities :
                <span className="highlighted-text"> Lend </span>
                with Trust,
                <span className="highlighted-text"> Borrow </span>
                with Ease!
              </h1>
              <div className="mt-60 d-flex flex-column flex-sm-row flex-wrap gap-4 align-items-center"></div>
            </div>
          </div>
          <div className="col-md-12 col-xl-5 mt-5 mt-xl-0">
            <div className=""></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WbHeroSection;
