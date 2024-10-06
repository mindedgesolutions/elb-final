import { UserAccountDelete, UserLogout } from "@/components";
import {
  FolderPlus,
  Globe,
  House,
  LockKeyhole,
  LogOut,
  NotebookPen,
  UserCog,
  UserMinus,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

const UserSidebar = ({ logout }) => {
  const { currentUser } = useSelector((store) => store.currentUser);
  const { pathname } = useLocation();

  return (
    <div className="fixed top-0 left-0 w-72 h-screen bg-white flex flex-col p-3">
      <Link
        to={`/user/${currentUser?.slug}/dashboard`}
        className="flex flex-row justify-center items-center"
      >
        <h3 className="text-6xl font-semibold text-gray-800 hover:text-gray-600 transition duration-200 mb-12 tracking-widest">
          ELB
        </h3>
      </Link>
      <div className="flex flex-col space-y-1">
        <NavLink
          to={`/`}
          className={`flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200`}
        >
          <Globe size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            go to website
          </span>
        </NavLink>
        <NavLink
          to={`/user/${currentUser?.slug}/dashboard`}
          className={`flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200 ${
            pathname.includes("dashboard") ? "bg-stone-200" : null
          }`}
        >
          <House size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            dashboard
          </span>
        </NavLink>
        <NavLink
          to={`/user/${currentUser?.slug}/posts/add`}
          className={`flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200 ${
            pathname.endsWith("posts/add") ? "bg-stone-200" : null
          }`}
        >
          <FolderPlus size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            post ad
          </span>
        </NavLink>
        <NavLink
          to={`/user/${currentUser?.slug}/posts`}
          className={`flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200 ${
            pathname.endsWith("posts") ? "bg-stone-200" : null
          }`}
        >
          <NotebookPen size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            manage posts
          </span>
        </NavLink>
        <NavLink
          to={`/user/${currentUser?.slug}/settings`}
          className={`flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200 ${
            pathname.endsWith("settings") ? "bg-stone-200" : null
          }`}
        >
          <UserCog size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            profile settings
          </span>
        </NavLink>
        <NavLink
          to={`/user/${currentUser?.slug}/change-password`}
          className={`flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200 ${
            pathname.endsWith("change-password") ? "bg-stone-200" : null
          }`}
        >
          <LockKeyhole size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            change password
          </span>
        </NavLink>
        <UserAccountDelete />
        <UserLogout />
      </div>
    </div>
  );
};
export default UserSidebar;
