import { SearchBtnLayout, SearchContainerLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "react-router-dom";

const AdminSearchPosts = () => {
  return (
    <Form>
      <div className="grid grid-cols-4 gap-3 bg-muted p-2 sm:my-8 md:justify-end md:my-0 md:mb-4">
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`s`}>Search by post title, seller name</Label>
          <Input
            type="text"
            className="w-full rounded-md"
            name="s"
            id="s"
            placeholder="Search by post title, seller name"
          />
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`cat`}>Search by category</Label>
          <select
            name="cat"
            id="cat"
            className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="">Select category</option>
          </select>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`scat`}>Search by sub-category</Label>
          <select
            name="scat"
            id="scat"
            className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="">Select sub-category</option>
          </select>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`status`}>Search by status</Label>
          <select
            name="status"
            id="status"
            className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="">Select status</option> {/* Sold / Unsold */}
          </select>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`start`}>Posted between (start & end date)</Label>
          <div className="flex flex-row gap-2">
            <input
              type="date"
              className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="start"
              id="start"
            />
            <input
              type="date"
              className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="end"
              id="end"
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`min_price`}>Price between (start & end price)</Label>
          <div className="flex flex-row gap-2">
            <input
              type="number"
              className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="min_price"
              id="min_price"
            />
            <input
              type="number"
              className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="max_price"
              id="max_price"
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label>&nbsp;</Label>
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
        </div>
      </div>
    </Form>
  );
};
export default AdminSearchPosts;
