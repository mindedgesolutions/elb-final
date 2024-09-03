import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { updateCounter } from "@/features/commonSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { BadgeIndianRupee } from "lucide-react";
import { useDispatch } from "react-redux";

const ToggleSold = ({ id, title, current }) => {
  const dispatch = useDispatch();
  let textClass;
  switch (current) {
    case true:
      textClass = `text-green-500 hover:text-green-400`;
      break;

    default:
      textClass = `text-gray-300 hover:text-gray-200`;
      break;
  }

  const toggle = async () => {
    try {
      const response = await customFetch.patch(`/posts/toggle-sold/${id}`);
      const status = response.data.status;
      dispatch(updateCounter());
      toast({
        title: "Done!",
        description:
          status === true
            ? "Product is marked as sold"
            : "Product is marked as available!",
      });
    } catch (error) {
      console.log(error);
      splitErrors(error?.response?.data?.msg);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm">
          <BadgeIndianRupee className={textClass} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-black font-semibold">{title}</span>{" "}
            {current === true
              ? ` will be marked as available`
              : ` will be marked as sold`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-yellow-500 hover:bg-yellow-400"
            onClick={toggle}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ToggleSold;
