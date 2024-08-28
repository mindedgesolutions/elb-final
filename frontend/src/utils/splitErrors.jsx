import { toast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";

const splitErrors = (errors) => {
  const errMsg = (
    <ul className="md:pl-2">
      {errors?.split(",").map((msg) => {
        return (
          <li key={nanoid()} className="my-1 list-disc text-sm">
            {msg}
          </li>
        );
      })}
    </ul>
  );

  return toast({ description: errMsg });
};

export default splitErrors;
