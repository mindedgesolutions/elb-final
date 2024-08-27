import { AdminFooter, AdminSidebar, AdminTopnav } from "@/components";
import { setCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Outlet, redirect } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-12">
      <AdminSidebar />
      <div className="col-span-12 md:col-span-9 lg:col-span-10 xl:col-span-10">
        <AdminTopnav />
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

  try {
    if (!currentUser.first_name) {
      const user = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(user.data.data.rows[0]));
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect(`/admin/login`);
  }
};
