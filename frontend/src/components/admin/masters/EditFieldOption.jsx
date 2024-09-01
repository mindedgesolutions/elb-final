import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { nanoid } from "nanoid";

const EditFieldOption = ({ options }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{options.length}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 px-4">
        <div className="grid gap-4">
          <ul className="px-3">
            {options.map((i) => {
              return (
                <li key={nanoid()} className="list-disc px-1">
                  <p className="text-sm text-muted-foreground">{i.value}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default EditFieldOption;
