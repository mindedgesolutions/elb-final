import { toast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";

const splitErrors = (errors) => {
  const errMsg = (
    <ul className="pl-2 list-disc">
      {errors?.split(",").map((msg) => {
        return (
          <li key={nanoid()} className="my-1">
            {msg}
          </li>
        );
      })}
    </ul>
  );

  return toast({ description: errMsg });
};

export default splitErrors;
