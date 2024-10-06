import {
  UserContentWrapper,
  UserLatestPosts,
  UserLatestPurchases,
  UserStats,
} from "@/components";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { currentUser } = useSelector((store) => store.currentUser);
  document.title = `${currentUser.first_name}'s Dashboard | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  return (
    <UserContentWrapper>
      <div className="p-2 w-full flex flex-row justify-between items-center mb-3">
        <h3 className="text-2xl font-bold tracking-widest capitalize">
          Welcome, {currentUser.first_name} {currentUser.last_name}
        </h3>
        <button
          type="button"
          className="w-btn-secondary-lg border font-medium border-white px-4 py-[11px] text-md w-32 rounded-full capitalize tracking-wider"
        >
          post ad
        </button>
      </div>
      <div className="flex flex-col w-full">
        <UserStats />

        {/* For user stats graphical representation starts ------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
          <div className="col-span-1 p-2 h-72 bg-purple-100 rounded-xl"></div>
          <div className="col-span-1 p-2 h-72 bg-purple-100 rounded-xl"></div>
        </div>
        {/* For user stats graphical representation ends ------ */}

        <UserLatestPosts />
        <UserLatestPurchases />
      </div>
    </UserContentWrapper>
  );
};
export default UserDashboard;
