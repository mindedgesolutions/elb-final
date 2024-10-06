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
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await customFetch.post(`/auth/logout`);
      dispatch(unsetCurrentUser());
      toast({
        title: "Logout successful",
        description: "Thank you for visiting",
      });
      navigate(`/`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return null;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="flex flex-row justify-start items-center gap-3 p-2 rounded-md hover:bg-stone-200"
        >
          <LogOut size={20} className="text-purple-600" />
          <span className="font-medium text-gray-700 tracking-widest capitalize">
            logout
          </span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl tracking-wide">
            Logout?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] tracking-wide">
            Sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[16px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={logout}
            className="bg-green-500 hover:bg-green-400 text-[16px] tracking-wide"
            autoFocus={true}
          >
            Yes, do it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UserLogout;
