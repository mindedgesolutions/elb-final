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
import { toast } from "@/components/ui/use-toast";
import { unsetCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { UserMinus } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserAccountDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAccount = async () => {
    try {
      // Call API first
      dispatch(unsetCurrentUser());
      toast({
        title: "Logout successful",
        description: "Thank you for visiting",
      });
      navigate(`/`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200"
        >
          <UserMinus size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            account delete
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl tracking-wide">
            Delete account?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] tracking-wide">
            All your posts will be taken down from the website. Sure you want to
            delete your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[16px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 text-[16px] tracking-wide"
            autoFocus={true}
            onClick={deleteAccount}
          >
            Yes, do it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UserAccountDelete;
