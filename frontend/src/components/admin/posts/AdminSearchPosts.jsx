import { SearchBtnLayout, SearchContainerLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminSearchPosts = () => {
  return (
    <SearchContainerLayout>
      <Input
        type="text"
        className="w-full md:w-[230px] rounded-md"
        name="s"
        placeholder="Search by post title, seller name"
      />
      <select
        name="c"
        id="c"
        className="flex h-10 w-full md:w-[230px] items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      >
        <option value="">Select category</option>
      </select>
      <SearchBtnLayout>
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-400"
        >
          Search
        </Button>
        <Button type="button" variant="outline">
          Reset
        </Button>
      </SearchBtnLayout>
    </SearchContainerLayout>
  );
};
export default AdminSearchPosts;
