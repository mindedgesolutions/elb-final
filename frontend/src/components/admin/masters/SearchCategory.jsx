import { SearchBtnLayout, SearchContainerLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const SearchCategory = () => {
  const navigate = useNavigate();
  const { parentCategories } = useSelector((store) => store.categories);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const [searchInput, setSearchInput] = useState({
    input: queryString.get("s") || "",
    select: Number(queryString.get("t")) || "",
  });

  const resetSearch = () => {
    setSearchInput({ ...searchInput, input: "", select: "" });
    navigate(`/admin/categories`);
  };

  return (
    <SearchContainerLayout>
      <Input
        type="text"
        className="w-full md:w-[230px] rounded-md"
        name="s"
        placeholder="Search by name / email / mobile"
        value={searchInput.input}
        onChange={(e) =>
          setSearchInput({ ...searchInput, input: e.target.value })
        }
      />
      <select
        name="t"
        id="t"
        value={searchInput.select}
        onChange={(e) =>
          setSearchInput({ ...searchInput, select: Number(e.target.value) })
        }
        className="flex h-10 w-full md:w-[230px] items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      >
        <option value="">Select parent</option>
        {parentCategories.map((cat) => {
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
export default SearchCategory;
