import { WbRepeatStars } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const WbPostFilter = () => {
  const stars = Array.from({ length: 5 }, (_, index) => 5 - index);

  return (
    <div className="basis-1/4 p-4 rounded-lg border-1">
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label htmlFor={`catId`} className="uppercase text-md text-gray-700">
          categories
        </Label>
        <select
          name="catId"
          id="catId"
          className="flex h-10 w-full items-center justify-between rounded-lg border-[1px] px-3 py-2 text-sm"
        >
          <option value="">All</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label htmlFor={`subcatId`} className="uppercase text-md text-gray-700">
          sub-categories
        </Label>
        <select
          name="subcatId"
          id="subcatId"
          className="flex h-10 w-full items-center justify-between rounded-lg border-[1px] px-3 py-2 text-sm"
        >
          <option value="">All</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1.5 mb-4">
        <Label htmlFor={`min`} className="uppercase text-md text-gray-700">
          price
        </Label>
        <span className="flex justify-between gap-3">
          <input
            type="number"
            className="basis-1/2 h-10 w-full rounded-md border-[1px] px-3 py-2"
            name="min"
            id="min"
            placeholder="Min."
          />
          <input
            type="number"
            className="basis-1/2 h-10 w-full rounded-md border-[1px] px-3 py-2"
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
