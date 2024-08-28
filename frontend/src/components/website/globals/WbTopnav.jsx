import {
  TopNavProfileDropdown,
  WbThemeSwitch,
  WbTopSearch,
} from "@/components";
import logo from "@/assets/website/img/logo/logo-white.svg";
import { Link } from "react-router-dom";
import { IndianRupee, User } from "lucide-react";

const WbTopnav = () => {
  return (
    <header className="header-primary">
      <div className="container">
        <nav className="navbar navbar-expand-xl justify-content-between headertop">
          <Link to={`/`}>
            <img src={logo} alt="" />
          </Link>
          <WbTopSearch />
          <div className="navbar-right d-flex align-items-center gap-4">
            <div className="align-items-center d-none d-lg-flex">
              <Link
                to="/sign-in"
                className="w-btn-secondary-lg border font-medium border-white px-6 py-3 text-md w-32"
              >
                <User size={18} className="font-medium" />
                Login
              </Link>
              <Link to={`#`}>
                <button
                  type="button"
                  className="w-btn-secondary-lg border font-medium border-white px-6 py-3 text-md"
                >
                  <IndianRupee size={16} className="font-medium" />
                  Post Ad
                </button>
              </Link>
            </div>
            <TopNavProfileDropdown />

            <WbThemeSwitch />

            <button
              className="navbar-toggler d-block d-xl-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default WbTopnav;
