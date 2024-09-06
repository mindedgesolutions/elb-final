import { WbRepeatStars } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useSelector } from "react-redux";

const WbPostFilter = () => {
  const stars = Array.from({ length: 5 }, (_, index) => 5 - index);
  const { allCategories } = useSelector((store) => store.categories);
  const parents = allCategories?.filter((i) => i.parent_id === null);
  const [children, setChildren] = useState([]);

  const [form, setForm] = useState({
    cat: "",
    scat: "",
    min: "",
    max: "",
    rating: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "cat") {
      const pid = allCategories?.find((i) => i.slug === e.target.value).id;
      const ch = allCategories
        .filter((i) => i.parent_id === pid)
        .sort((a, b) => a.category.localeCompare(b.category));
      setChildren(ch);
    }
  };

  return (
    <div className="basis-1/4 p-4 rounded-sm">
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label htmlFor={`cat`} className="uppercase text-md text-gray-700">
          categories
        </Label>
        <select
          name="cat"
          id="cat"
          className="flex h-10 w-full items-center justify-between rounded-sm border-[1px] p-2 text-sm"
          value={form.cat}
          onChange={handleChange}
        >
          <option value="">All</option>
          {parents?.map((i) => {
            return (
              <option key={i.id} value={i.slug}>
                {i.category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label htmlFor={`scat`} className="uppercase text-md text-gray-700">
          sub-categories
        </Label>
        <select
          name="scat"
          id="scat"
          className="flex h-10 w-full items-center justify-between rounded-sm border-[1px] p-2 text-sm"
        >
          <option value="">Select a sub-category</option>
          {children?.map((i) => {
            return (
              <option key={i.id} value={i.slug}>
                {i.category}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label htmlFor={`min`} className="uppercase text-md text-gray-700">
          price
        </Label>
        <span className="flex justify-between gap-3">
          <input
            type="number"
            className="basis-1/2 h-10 w-full rounded-sm border-[1px] px-3 py-2"
            name="min"
            id="min"
            placeholder="Min."
          />
          <input
            type="number"
            className="basis-1/2 h-10 w-full rounded-sm border-[1px] px-3 py-2"
            name="max"
            id="max"
            placeholder="Max."
          />
        </span>
      </div>
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label className="uppercase text-md text-gray-700">rating</Label>
        <div className="flex flex-col">
          {stars.map((count) => {
            return (
              <div key={count} className="flex gap-3 mb-2">
                <Checkbox
                  id={`rating_${count}`}
                  name={`rating_${count}`}
                  value={count}
                />
                <label htmlFor={`rating_${count}`} className="flex">
                  <WbRepeatStars count={count} />
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default WbPostFilter;
