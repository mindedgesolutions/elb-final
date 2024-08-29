import { AdminFooter, AdminSidebar, AdminTopnav } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { setAllCategories } from "@/features/categorySlice";
import { setCurrentUser, unsetCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useDispatch } from "react-redux";
import { Outlet, redirect, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await customFetch.post(`/auth/logout`);
      dispatch(unsetCurrentUser());
      toast({
        title: "Logout successful",
        description: "Thank you for visiting",
      });
      navigate(`/admin/login`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return null;
    }
  };

  return (
    <div className="grid grid-cols-12">
      <AdminSidebar />
      <div className="col-span-12 md:col-span-9 lg:col-span-10 xl:col-span-10">
        <AdminTopnav logout={logout} />
        <Outlet />
        <AdminFooter />
      </div>
    </div>
  );
};
export default AdminLayout;

// Loader function starts ------
export const loader = (store) => async () => {
  const { currentUser } = store.getState().currentUser;
  const { allCategories } = store.getState().categories;

  try {
    if (!currentUser.first_name) {
      const user = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(user.data.data.rows[0]));
    }
    if (allCategories.length === 0) {
      const categories = await customFetch.get(`/website/categories`);
      store.dispatch(setAllCategories(categories.data.data.rows));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect(`/admin/login`);
  }
};
