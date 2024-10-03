import profileImg from "@/assets/profile.jpg";
import { WbCustomBtn } from "@/components";
import dayjs from "dayjs";
import { Star } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

const WbSellerSidebar = ({ rating, overall }) => {
  const { profile, totalPosts } = useLoaderData();
  const [showMore, setShowMore] = useState(false);
  const { sellerProfile } = useSelector((store) => store.users);

  const toggleMore = () => {
    setShowMore(!showMore);
  };

  let bioLabel = "";
  if (showMore) {
    bioLabel =
      profile.bio ||
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur, libero iste, quas accusamus vitae dolor, quidem vel exercitationem ipsam animi consequatur. Qui, reiciendis libero. Culpa non deserunt sed eum pariatur doloremque porro quisquam nesciunt molestiae dicta cumque dolor quos accusamus debitis laudantium odit, omnis iste incidunt quo. Iusto ut facere repellendus et?";
  } else {
    bioLabel = profile.bio
      ? profile.bio.length > 100
        ? profile.bio.substring(0, 100) + ` ...`
        : profile.bio
      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptas consequatur quos iure dolore atque minima ab minus veritatis voluptates quo temporibus accusantium";
  }

  return (
    <>
      <div className="w-full p-4 flex flex-col justify-center items-center border-[1px] border-gray-200 rounded-md transition duration-500 hover:shadow-2xl">
        <Link to={`/seller/${profile.slug}`}>
          <div className="w-40 h-40 flex justify-center items-center rounded-full overflow-hidden">
            <img
              src={profileImg}
              alt={import.meta.env.VITE_APP_TITLE}
              className="object-cover"
            />
          </div>
        </Link>
        <h3 className="text-xl font-extrabold uppercase tracking-wide pt-10 pb-2 text-gray-800">
          {profile.first_name} {profile.last_name}
        </h3>
        <div className="flex gap-1 justify-center items-center font-medium text-gray-700 pb-4 text-sm">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <p>{overall}</p>
          <p>
            ({rating[5]} review{rating[5] > 1 ? "s" : null})
          </p>
        </div>
        <div className="bg-gray-100 w-full flex justify-between items-center py-3 rounded-lg">
          <div className="basis-1/2 flex flex-col justify-center items-center px-3 border-e-[1px] border-gray-300 text-sm text-gray-600 font-medium leading-5">
            <p>Location</p>
            <p>{profile.city || `NA`}</p>
          </div>
          <div className="basis-1/2 flex flex-col justify-center items-center px-3 text-sm text-gray-600 font-medium leading-5">
            <p>Posts</p>
            <p>{totalPosts || sellerProfile.profile.totalPosts}</p>
          </div>
        </div>
        <div className="flex flex-col w-full mt-4 text-sm leading-6 px-4">
          <div className="flex justify-between items-center gap-2">
            <span className="">Location: </span>
            <span className="font-medium">
              {profile.city ? profile.city + `, ` + profile.country : `NA`}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="">Member since: </span>
            <span className="font-medium">
              {dayjs(new Date(profile.um_created_at)).format("MMMM D, YYYY")}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="">Gender: </span>
            <span className="font-medium">
              {profile.gender
                ? profile.gender === "m"
                  ? "Male"
                  : "Female"
                : "NA"}
            </span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="">Language: </span>
            <span className="font-medium">English, Hindi</span>
          </div>
          <div className="mt-8">
            <WbCustomBtn title={`contact me`} />
          </div>
        </div>
      </div>

      <div className="w-full p-4 flex flex-col justify-center items-center border-[1px] border-gray-200 rounded-md mt-4">
        <div className="flex flex-row w-full justify-start items-start pb-3">
          <h3 className="capitalize text-lg font-semibold">more about me</h3>
        </div>
        <div className="text-sm text-justify tracking-tight">
          {bioLabel}
          <span
            className="font-medium text-fuchsia-500 hover:text-fuchsia-600 cursor-pointer ml-1"
            onClick={toggleMore}
          >
            {showMore ? `Show Less ...` : `Show More ...`}
          </span>
        </div>
      </div>
    </>
  );
};
export default WbSellerSidebar;
