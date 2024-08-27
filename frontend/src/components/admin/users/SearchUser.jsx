import { SearchBtnLayout, SearchContainerLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userType } from "@/utils/data";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";

const SearchUser = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const [searchInput, setSearchInput] = useState({
    input: queryString.get("s") || "",
    select: Number(queryString.get("t")) || "",
  });

  const resetSearch = () => {
    setSearchInput({ ...searchInput, input: "", select: "" });
    navigate(`/admin/users`);
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
      <Select
        name="t"
        id="t"
        value={searchInput.select}
        onValueChange={(value) =>
          setSearchInput({ ...searchInput, select: Number(value) })
        }
      >
        <SelectTrigger className="w-full md:w-[230px]">
          <SelectValue placeholder="Select user type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select user type</SelectLabel>
            {userType.map((type) => {
              return (
                <SelectItem key={nanoid()} value={type.typeId}>
                  {type.typeLabel}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
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
export default SearchUser;
