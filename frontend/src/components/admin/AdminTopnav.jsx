import { AdminProfileContainer } from "@/components";
import { ModeToggle } from "../ModeToggle";

const AdminTopnav = ({ logout }) => {
  return (
    <div className="bg-muted py-2 pr-4 sm:pr-12 md:pr-12 lg:pr-12 xl:pr-12 flex justify-end items-center drop-shadow-md">
      <ModeToggle />
      <AdminProfileContainer logout={logout} />
    </div>
  );
};
export default AdminTopnav;
