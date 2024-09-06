import { Outlet } from "react-router-dom";

import "../../assets/website/css/bootstrap.min.css";
import "../../assets/website/css/style.css";
import "../../assets/website/css/abc.css";
import "../../assets/website/css/resposive.css";

import { WbFooter, WbTopMenu, WbTopnav } from "@/components";
import splitErrors from "@/utils/splitErrors";
import customFetch from "@/utils/customFetch";
import { setAllCategories } from "@/features/categorySlice";

const WebsiteLayout = () => {
  return (
    <div className="bg-muted">
      <WbTopnav />
      <WbTopMenu />
      <Outlet />
      <WbFooter />
    </div>
  );
};
export default WebsiteLayout;

// Loader function starts ------
export const loader = (store) => async () => {
  const { allCategories } = store.getState().categories;
  try {
    if (allCategories.length === 0) {
      const categories = await customFetch.get(`/website/categories`);
      store.dispatch(setAllCategories(categories.data.data.rows));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return null;
  }
};
