import { Outlet } from "react-router-dom";

import "@/assets/website/css/bootstrap.min.css";
import "@/assets/website/css/style.css";
import "@/assets/website/css/abc.css";
import "@/assets/website/css/resposive.css";

const WebsiteLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default WebsiteLayout;
