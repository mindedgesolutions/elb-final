import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { unsetCurrentUser } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { ChartNoAxesCombined, LockKeyhole, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const WbNavProfileContainer = ({ name }) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          variant="primary"
          size="icon"
          className={`p-2 rounded-full outline-none focus:border-transparent bg-gradient-to-r from-[#e250e5] from-5.32% to-[#4b50e6] to-94.32%`}
        >
          <User className="text-white h-[1.3rem] w-[1.3rem]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 mt-4">
        <DropdownMenuLabel className={`uppercase font-medium`}>
          {name || null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ChartNoAxesCombined className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LockKeyhole className="mr-2 h-4 w-4" />
            <span>Change password</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className={`cursor-pointer`}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WbNavProfileContainer;
