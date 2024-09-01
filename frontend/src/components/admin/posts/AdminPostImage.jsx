import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleHelp, SquareCheckBig, Trash2 } from "lucide-react";

const AdminPostImage = () => {
  return (
    <>
      <div className="col-span-2 p-3 bg-muted text-accent-foreground font-medium capitalize mt-3">
        Photos
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="col-span-1">
          <div className="flex flex-col space-y-1.5">
            <Label className="mb-0">
              <div className="flex gap-2 items-center">
                <span>
                  Upload some stunning photos{" "}
                  <span className="text-red-500">*</span>
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <CircleHelp className="w-4 h-4 cursor-pointer text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <p className="flex flex-col text-sm text-muted-foreground gap-1">
                          <span>Minimum 2 photos are required</span>
                          <span>Maximum 8 photos can be uploaded</span>
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Label>
            <Input id="photos" name="photos" type="file" multiple />
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 8 }, (_, index) => {
              return (
                <div key={index} className="w-32 h-32 border-1 relative">
                  <Trash2 className="absolute top-2 right-2 text-red-500 cursor-pointer" />
                  <SquareCheckBig className="absolute top-2 left-2 text-muted-foreground cursor-pointer hover:text-yellow-400" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="sm:hidden md:block col-span-1"></div>
      </div>
    </>
  );
};
export default AdminPostImage;
