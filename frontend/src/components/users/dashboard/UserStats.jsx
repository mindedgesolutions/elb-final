import icon1 from "@/assets/users/icon-1.png";
import icon3 from "@/assets/users/icon-3.png";
import icon4 from "@/assets/users/icon-4.png";
import { PiCurrencyInrBold } from "react-icons/pi";

const UserStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="col-span-1 bg-white p-3 rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-1 ml-2">
            <div className="flex flex-row justify-start items-center">
              <PiCurrencyInrBold size={32} />
              <h3 className="text-5xl font-extrabold">0</h3>
            </div>
            <p className="text-lg text-gray-600 tracking-wide">My purchases</p>
          </div>
          <div className="bg-green-900 p-3 rounded-lg">
            <img src={icon1} alt={import.meta.env.VITE_APP_TITLE} />
          </div>
        </div>
      </div>
      <div className="col-span-1 bg-white p-3 rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-1 ml-2">
            <div className="flex flex-row justify-start items-center">
              <h3 className="text-5xl font-extrabold">27</h3>
            </div>
            <p className="text-lg text-gray-600 tracking-wide">My posts</p>
          </div>
          <div className="bg-green-900 p-3 rounded-lg">
            <img src={icon3} alt={import.meta.env.VITE_APP_TITLE} />
          </div>
        </div>
      </div>
      <div className="col-span-1 bg-white p-3 rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-1 ml-2">
            <div className="flex flex-row justify-start items-center">
              <h3 className="text-5xl font-extrabold">00</h3>
            </div>
            <p className="text-lg text-gray-600 tracking-wide">Total sold</p>
          </div>
          <div className="bg-green-900 p-3 rounded-lg">
            <img src={icon4} alt={import.meta.env.VITE_APP_TITLE} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserStats;
