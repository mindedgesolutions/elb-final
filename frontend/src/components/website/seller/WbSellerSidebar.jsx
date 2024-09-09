import profileImg from "@/assets/profile.jpg";
import { Star } from "lucide-react";

const WbSellerSidebar = ({ profile }) => {
  return (
    <div className="w-full p-4 flex flex-col justify-center items-center border-2 border-gray-200 rounded-md transition duration-500 hover:shadow-2xl">
      <div className="w-40 h-40 flex justify-center items-center rounded-full overflow-hidden">
        <img
          src={profileImg}
          alt={import.meta.env.VITE_APP_TITLE}
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-extrabold uppercase tracking-wide pt-10 pb-2 text-gray-800">
        {profile.first_name} {profile.last_name}
      </h3>
      <div className="flex gap-1 justify-center items-center font-medium text-gray-700 pb-4">
        <Star size={20} className="fill-yellow-400 text-yellow-400" />
        <p>4.9</p>
        <p>(299 reviews)</p>
      </div>
      <div className="p-2 bg-gray-200 w-full"></div>
    </div>
  );
};
export default WbSellerSidebar;
