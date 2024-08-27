import { Outlet } from "react-router-dom";

import "../../assets/website/css/bootstrap.min.css";
import "../../assets/website/css/style.css";
import "../../assets/website/css/abc.css";
import "../../assets/website/css/resposive.css";

import { WbFooter, WbTopnav, WbTopSearch } from "@/components";

const WebsiteLayout = () => {
  return (
    <>
      <WbTopnav />
      <Outlet />
      <WbFooter />
    </>
  );
};
export default WebsiteLayout;
