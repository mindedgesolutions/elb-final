import { sortBy } from "@/utils/data";
import { nanoid } from "nanoid";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const WbPostSorting = () => {
  const { meta } = useLoaderData();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);

  const handleChange = (val) => {
    searchParams.set("sort", val);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex sm:flex-col md:flex-row sm:justify-start md:justify-between sm:items-start md:items-center mb-4 py-2 sm:gap-4 md:gap-0">
      <p>Total {meta?.totalRecords} products found</p>
      <div className="flex sm:w-full md:basis-1/4 gap-3">
        <div className="w-full">
          <select
            name="cat"
            id="cat"
            className="h-10 w-full rounded-sm border-[1px] p-2 text-sm"
            value={searchParams.get("sort") || ""}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="">- sort products -</option>
            {sortBy.map((i) => {
              return (
                <option key={nanoid()} value={i.value}>
                  {i.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
export default WbPostSorting;
