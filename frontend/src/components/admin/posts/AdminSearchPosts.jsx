import { SearchBtnLayout } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postStatus } from "@/utils/data";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";

const AdminSearchPosts = () => {
  const navigate = useNavigate();
  const startDate = new Date("09-01-2024");
  const endDate = new Date();
  const { allCategories } = useSelector((store) => store.categories);
  const parents = allCategories?.filter((i) => i.parent_id === null);
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState({
    s: "",
    cat: "",
    scat: "",
    status: "",
    start: startDate,
    end: endDate,
    max: "",
    min: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "cat") {
      const ch = allCategories
        .filter((i) => i.parent_id === Number(e.target.value))
        .sort((a, b) => a.category.localeCompare(b.category));
      setChildren(ch);
    }
  };

  const resetForm = () => {
    setForm({
      ...form,
      s: "",
      cat: "",
      scat: "",
      status: "",
      start: startDate,
      end: endDate,
      max: "",
      min: "",
    });
    navigate(`/admin/posts`);
  };

  return (
    <Form>
      <div className="grid grid-cols-4 gap-3 bg-muted p-2 sm:my-8 md:justify-end md:my-0 md:mb-4">
        <div className="col-span-1 flex flex-col space-y-1.5 p-1">
          <Label htmlFor={`s`}>Search by post title, seller name</Label>
          <Input
            type="text"
            className="w-full rounded-md"
            name="s"
            id="s"
            value={form.s}
            onChange={handleChange}
            placeholder="Search by post title, seller name"
          />
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5 p-1">
          <Label htmlFor={`cat`}>Search by category</Label>
          <select
            name="cat"
            id="cat"
            value={form.cat}
            onChange={handleChange}
            className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="">Select category</option>
            {parents?.map((parent) => {
              return (
                <option key={parent.id} value={parent.id}>
                  {parent.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5 p-1">
          <Label htmlFor={`scat`}>Search by sub-category</Label>
          <select
            name="scat"
            id="scat"
            value={form.scat}
            onChange={handleChange}
            className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="">Select sub-category</option>
            {children?.map((child) => {
              return (
                <option key={child.id} value={child.id}>
                  {child.category}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5 p-1">
          <Label htmlFor={`status`}>Search by status</Label>
          <select
            name="status"
            id="status"
            value={form.status}
            onChange={handleChange}
            className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option value="">Select status</option>
            {postStatus.map((status) => {
              return (
                <option key={status.value} id={status.label}>
                  {status.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={`start`}>Posted between (start & end date)</Label>
            <div className="flex flex-row gap-2">
              <DatePicker
                className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="start"
                name="start"
                dateFormat={`dd-MM-yyyy`}
                selected={form.start}
                minDate={new Date(form.start)}
                maxDate={form.end}
                onChange={(date) => setForm({ ...form, start: date })}
              />
              <DatePicker
                className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="end"
                name="end"
                dateFormat={`dd-MM-yyyy`}
                selected={form.end}
                minDate={new Date(form.start)}
                maxDate={new Date(endDate)}
                onChange={(date) => setForm({ ...form, end: date })}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col space-y-1.5">
          <Label htmlFor={`min`}>Price between (start & end price)</Label>
          <div className="flex flex-row gap-2">
            <input
              type="number"
              className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="min"
              id="min"
              placeholder="Min."
              value={form.min}
              onChange={handleChange}
            />
            <input
              type="number"
              className="basis-1/2 h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              name="max"
              id="max"
              placeholder="Max."
              value={form.max}
              onChange={handleChange}
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
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </SearchBtnLayout>
        </div>
      </div>
    </Form>
  );
};
export default AdminSearchPosts;
