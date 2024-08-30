import { SearchBtnLayout, SearchContainerLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SearchFormFields = () => {
  const navigate = useNavigate();
  const { allCategories } = useSelector((store) => store.categories);
  const children = allCategories
    .filter((i) => i.parent_id !== null)
    .sort((a, b) => a.category.localeCompare(b.category));

  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const [searchInput, setSearchInput] = useState({
    select: Number(queryString.get("t")) || "",
  });

  const resetSearch = () => {
    setSearchInput({ ...searchInput, select: "" });
    navigate(`/admin/form-fields`);
  };

  return (
    <SearchContainerLayout>
      <select
        name="t"
        id="t"
        className="flex h-10 w-full md:w-[230px] items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        value={searchInput.select}
        onChange={(e) =>
          setSearchInput({ ...searchInput, select: Number(e.target.value) })
        }
      >
        <option value="">Select category</option>
        {children.map((cat) => {
          return (
            <option key={nanoid()} value={cat.id}>
              {cat.category}
            </option>
          );
        })}
      </select>
      <SearchBtnLayout>
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-400"
        >
          Search
        </Button>
        <Button type="button" variant="outline" onClick={resetSearch}>
          Reset
        </Button>
      </SearchBtnLayout>
    </SearchContainerLayout>
  );
};
export default SearchFormFields;
