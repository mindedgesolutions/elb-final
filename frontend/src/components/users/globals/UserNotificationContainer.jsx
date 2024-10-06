import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const UserNotificationContainer = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative flex flex-row justify-center items-center">
          <span className="absolute bottom-5 left-5 w-8 h-8 rounded-full bg-purple-800 text-white text-xs flex justify-center items-center">
            10+
          </span>
          <Bell size={26} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div key={index + 1}>
              <DropdownMenuItem className="flex flex-row justify-start items-center gap-2">
                <div className="notification-bell flex-shrink-0">
                  <Bell className="text-green-400" />
                </div>
                <div>
                  <p className="text-dark-300">New job proposal Jan 23, 2024</p>
                  <span className="text-dark-200 text-14">10 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNotificationContainer;
