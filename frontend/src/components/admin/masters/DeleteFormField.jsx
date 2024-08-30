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
import { setListUsers } from "@/features/usersSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

const DeleteFormField = () => {
  const dispatch = useDispatch();

  const deleteUser = async () => {
    try {
      await customFetch.delete(`/users/users/${id}`);
      toast({
        title: "Deactivated",
        description: "User deactivated successfully",
      });

      const response = await customFetch.get(`/users/users`);
      dispatch(setListUsers(response.data.data.rows));
    } catch (error) {
      console.log(error);
      splitErrors(error?.response?.data?.msg);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm">
          <Trash2 size={18} className="text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will deactivate{" "}
            <span className="text-red-500 font-semibold">{name}</span> and the
            user can no longer add / edit a post on our website.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400"
            onClick={deleteUser}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteFormField;
