import { toast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";

const splitErrors = (errors) => {
  const errMsg = (
    <ul>
      {errors?.split(",").map((msg) => {
        return <li key={nanoid()}>{msg}</li>;
      })}
    </ul>
  );

  return toast({ description: errMsg });
};

export default splitErrors;
