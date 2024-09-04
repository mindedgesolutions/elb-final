import { Linkedin, Mail, MapPin, MoveRight, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const WbFooter = () => {
  return (
    <footer className="footer-area">
      <div className="bg-dark-300 pt-20">
        <div className="container">
          <div className="footer-widgets py-30">
            <div className="row justify-content-between row-gap-4">
              <div className="col-md-6 col-xl-3">
                <div className="mb-5">
                  <h3 className="footer-widget-title fw-bold mb-4">
                    Get to Know Us
                  </h3>

                  <ul className="footer-info-widget p-0">
                    <li className="d-flex gap-3 align-items-center py-2 footer-info-widget-item">
                      <Phone />
                      +(323) 750-1234
                    </li>
                    <li className="d-flex gap-3 align-items-center py-2 footer-info-widget-item">
                      <Mail size={22} />
                      infoyourortencey@gmail.com
                    </li>
                    <li className="d-flex gap-3 align-items-center py-2 footer-info-widget-item">
                      <MapPin size={26} />
                      374 A Tower, William Road Blvd <br />, Melbourne 2721, IL,
                      USA
                    </li>
                  </ul>
                </div>
                <div></div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div>
                  <h3 className="footer-widget-title fw-bold mb-4">
                    Categories
                  </h3>
                  <nav>
                    <ul className="footer-nav-list list-unstyled">
                      <li className="footer-nav-list-item py-1">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Graphics & Design
                        </Link>
                      </li>
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Digital Marketing
                        </Link>
                      </li>
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Writing & Translation
                        </Link>
                      </li>
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Video & Animation
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div>
                  <h3 className="footer-widget-title fw-bold mb-4">
                    Quick Links
                  </h3>
                  <nav>
                    <ul className="footer-nav-list list-unstyled">
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Terms of Service
                        </Link>
                      </li>
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          Blogs
                        </Link>
                      </li>
                      <li className="footer-nav-list-item py-2">
                        <Link
                          to={`#`}
                          className="footer-nav-link d-flex gap-2 align-items-center text-decoration-none"
                        >
                          <MoveRight size={12} />
                          FAQ's
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-md-6 col-xl-3">
                <div>
                  <h3 className="footer-widget-title fw-bold mb-4">
                    Help & Supports
                  </h3>
                  <nav>
                    <form>
                      <div className="relative# footer-newsletter-form d-flex# align-items-center# justify-content-between# border-0 p-0">
                        <input
                          type="text"
                          className="form-control shadow-none mb-4"
                          placeholder="Enter your email address"
                        />
                        <button className="footer-newsletter-btn">
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright py-4">
        <div className="container">
          <div className="row row-gap-4 justify-content-between">
            <div className="col-auto">
              <div>
                <p className="text-white">
                  Copyright &copy;{new Date().getFullYear()} All rights reserved{" "}
                  <Link to={`/`} className="text-white">
                    Easy Lending Buddy
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-auto">
              <div className="footer-social d-flex align-items-center gap-4">
                <a
                  href="http://"
                  className="footer-social-link"
                  target="_blank"
                >
                  <FaFacebook size={26} />{" "}
                </a>
                <a
                  href="http://"
                  className="footer-social-link"
                  target="_blank"
                >
                  <FaTwitter size={24} />{" "}
                </a>
                <a
                  href="http://"
                  className="footer-social-link"
                  target="_blank"
                >
                  <FaInstagram size={26} />{" "}
                </a>
                <a
                  href="http://"
                  className="footer-social-link"
                  target="_blank"
                >
                  <Linkedin size={26} />{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default WbFooter;
