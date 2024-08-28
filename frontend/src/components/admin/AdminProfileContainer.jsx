import { Lock, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatar from "@/assets/000m.jpg";
import { Link } from "react-router-dom";

const AdminProfileContainer = ({ logout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-2">
        <Button variant="ghost">
          <img src={avatar} alt="user" className="w-8 h-8 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`#`}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link to={`#`}>
            <DropdownMenuItem className="cursor-pointer">
              <Lock className="mr-2 h-4 w-4" />
              <span>Change password</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AdminProfileContainer;
