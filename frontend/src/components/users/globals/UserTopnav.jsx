import { UserNotificationContainer } from "@/components";
import { Bell } from "lucide-react";
import { FaRegHeart } from "react-icons/fa6";

const UserTopnav = () => {
  return (
    <div className="p-2 bg-slate-100 flex flex-row justify-end items-center mb-8">
      <div className="flex flex-row justify-center items-center gap-16 mt-4 mr-24">
        <div className="relative flex flex-row justify-center items-center cursor-pointer">
          <span className="absolute bottom-5 left-5 w-8 h-8 rounded-full bg-purple-800 text-white text-xs flex justify-center items-center">
            10+
          </span>
          <FaRegHeart size={26} />
        </div>
        <UserNotificationContainer />
      </div>
    </div>
  );
};
export default UserTopnav;
