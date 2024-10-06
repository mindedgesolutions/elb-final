import customFetch from "@/utils/customFetch";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserPostsFilter = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [counts, setCounts] = useState({});
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const handleChange = (val) => {
    const filterType = val ? `?s=${val}` : ``;
    setActiveFilter(val ? val : "all");
    navigate(`${pathname}${filterType.toString()}`);
  };

  const fetchData = async () => {
    try {
      const response = await customFetch.get(`/users/post-count`);
      setCounts(response.data.data.rows[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setActiveFilter(searchParams.get("s") ? searchParams.get("s") : "all");
    fetchData();
  }, []);

  return (
    <div className="flex flex-row justify-start items-center my-2 gap-3">
      <button
        type="button"
        className={`px-4 py-2 bg-gray-50 rounded-full ${
          activeFilter === "all" ? "bg-purple-900 text-white" : ""
        }`}
        onClick={() => handleChange("all")}
      >
        All ({counts.total_all || 0})
      </button>
      <button
        type="button"
        className={`px-4 py-2 bg-gray-50 rounded-full ${
          activeFilter === "posted" ? "bg-purple-900 text-white" : ""
        }`}
        onClick={() => handleChange("posted")}
      >
        Posted ({counts.total_posted || 0})
      </button>
      <button
        type="button"
        className={`px-4 py-2 bg-gray-50 rounded-full ${
          activeFilter === "sold" ? "bg-purple-900 text-white" : ""
        }`}
        onClick={() => handleChange("sold")}
      >
        Sold ({counts.total_sold || 0})
      </button>
      <button
        type="button"
        className={`px-4 py-2 bg-gray-50 rounded-full ${
          activeFilter === "rejected" ? "bg-purple-900 text-white" : ""
        }`}
        onClick={() => handleChange("rejected")}
      >
        Rejected ({counts.total_block || 0})
      </button>
    </div>
  );
};
export default UserPostsFilter;
