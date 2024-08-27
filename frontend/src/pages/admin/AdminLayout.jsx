import { AdminFooter, AdminSidebar, AdminTopnav } from "@/components";
import { Outlet } from "react-router-dom";

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
