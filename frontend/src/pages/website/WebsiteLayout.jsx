import { Outlet } from "react-router-dom";

import "../../assets/website/css/bootstrap.min.css";
import "../../assets/website/css/style.css";
import "../../assets/website/css/abc.css";
import "../../assets/website/css/resposive.css";

import { WbFooter, WbLoginPopup, WbTopMenu, WbTopnav } from "@/components";
import splitErrors from "@/utils/splitErrors";
import customFetch from "@/utils/customFetch";
import { setAllCategories } from "@/features/categorySlice";
import { setCurrentUser, setLoginStatus } from "@/features/currentUserSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { setAllLocations } from "@/features/locationSlice";

const WebsiteLayout = () => {
  const useScreenWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };
  const screenWidth = useScreenWidth();

  return (
    <div>
      {screenWidth >= 768 ? (
        <ScrollArea className="md:overflow-y-auto md:h-screen">
          <WbTopnav />
          <WbTopMenu />
          <Outlet />
          <WbFooter />
        </ScrollArea>
      ) : (
        <>
          <WbTopnav />
          <WbTopMenu />
          <Outlet />
          <WbFooter />
        </>
      )}
      <WbLoginPopup />
    </div>
  );
};
export default WebsiteLayout;

// Loader function starts ------
export const loader = (store) => async () => {
  const { allCategories } = store.getState().categories;
  const { currentUser } = store.getState().currentUser;
  const { allLocations } = store.getState().locations;

  try {
    if (allCategories.length === 0) {
      const categories = await customFetch.get(`/website/categories`);
      store.dispatch(setAllCategories(categories.data.data.rows));
    }

    const status = await customFetch.get(`/auth/login-status`);
    store.dispatch(setLoginStatus(status.data.status));

    if (status.data.status && !currentUser?.first_name) {
      const user = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(user.data.data.rows[0]));
    }

    if (allLocations.length === 0) {
      const locations = await customFetch.get(`/website/locations`);
      store.dispatch(setAllLocations(locations.data.data.rows));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    console.log(error);
    return null;
  }
};
