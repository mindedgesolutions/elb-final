import {
  UserFooter,
  UserPageWrapper,
  UserSidebar,
  UserTopnav,
} from "@/components";
import { toast } from "@/components/ui/use-toast";
import { setAllCategories } from "@/features/categorySlice";
import { setCurrentUser, setLoginStatus } from "@/features/currentUserSlice";
import { setAllLocations } from "@/features/locationSlice";
import customFetch from "@/utils/customFetch";
import { Outlet, redirect } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <UserSidebar />
      <UserPageWrapper>
        <UserTopnav />
        <Outlet />
        <UserFooter />
      </UserPageWrapper>
    </div>
  );
};
export default UserLayout;

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
    toast({
      title: `Error!!`,
      description: `Something went wrong! Please login again`,
    });
    console.log(error);
    return redirect(`/`);
  }
};
