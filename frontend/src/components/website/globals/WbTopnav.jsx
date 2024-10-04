import logo from "@/assets/website/img/logo/logo-white.svg";
import { WbTopSearch } from "@/components";
import { AlignJustify, User } from "lucide-react";
import { Link } from "react-router-dom";
import WbModeToggle from "./WbModeToggle";
import { useSelector } from "react-redux";
import WbNavProfileContainer from "./WbNavProfileContainer";

const WbTopnav = () => {
  const { currentUser } = useSelector((store) => store.currentUser);
  const name = currentUser
    ? currentUser?.first_name + " " + currentUser.last_name
    : null;

  return (
    <>
      <header className="flex flex-row sm:hidden md:block fixed top-0 left-0 header-primary py-2">
        <div className="md:w-[1600px] mx-auto sm:px-4 md:px-12 flex justify-between items-center">
          <Link to={`/`}>
            <img
              src={logo}
              alt={import.meta.env.VITE_APP_TITLE}
              className="h-16"
            />
          </Link>
          <WbTopSearch />
          <div className="flex flex-row gap-4 justify-center items-center">
            {currentUser?.first_name ? (
              <>
                <Link
                  to={`/user/${currentUser?.slug}/dashboard`}
                  className="w-btn-secondary-lg border font-medium border-white px-4 py-[11px] text-md w-32 rounded-full capitalize tracking-wider"
                >
                  post ad
                </Link>
                <WbNavProfileContainer name={name} />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="w-btn-secondary-lg border font-medium border-white px-4 py-[11px] text-md w-32 rounded-full"
              >
                <User size={18} className="font-medium" />
                Login
              </Link>
            )}
            <WbModeToggle />
          </div>
        </div>
      </header>
      {/* Mobile header starts ------ */}
      <header className="flex flex-col sm:block md:hidden fixed top-0 left-0 header-primary py-[10px]">
        <div className="flex flex-row justify-between items-center px-3">
          <AlignJustify className="text-white" />
          <Link to={`/`}>
            <img
              src={logo}
              alt={import.meta.env.VITE_APP_TITLE}
              className="h-8"
            />
          </Link>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Link
              to="/sign-in"
              className="w-btn-secondary-lg border text-sm font-medium border-white px-3 py-[6px] text-md rounded-full"
            >
              Login
            </Link>
          </div>
        </div>
      </header>
      {/* Mobile header ends ------ */}
    </>
  );
};
export default WbTopnav;
