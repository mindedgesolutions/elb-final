import { UserProfileContainer } from "@/components";

const UserTopnav = () => {
  return (
    <div className="p-2 bg-stone-100 flex flex-row justify-end items-center">
      <div className="mr-8">
        <UserProfileContainer />
      </div>
    </div>
  );
};
export default UserTopnav;
