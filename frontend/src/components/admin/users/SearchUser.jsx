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

const SearchUser = () => {
  return (
    <div className="flex justify-start md:justify-end flex-row items-center gap-3 mb-4">
      <Input
        type="text"
        className="w-full md:w-[230px] rounded-md"
        name="s"
        placeholder="Search by name / email / mobile"
      />
      <Select>
        <SelectTrigger className="w-full md:w-[230px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline">Search</Button>
    </div>
  );
};
export default SearchUser;
