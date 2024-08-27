import { sidebarLinks } from "@/utils/links";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../theme-provider";

const AdminSidebar = () => {
  const { theme } = useTheme();
  const textClass = theme === "dark" ? "text-gray-800" : "text-white";
  const [activeLink, setActiveLink] = useState(textClass);

  useEffect(() => {
    setActiveLink(textClass);
  }, [theme]);

  return (
    <div className="h-screen flex-col p-3 hidden md:block md:col-span-3 lg:block lg:col-span-2 xl:block xl:col-span-2 bg-muted">
      <div className="text-6xl font-medium flex justify-center">ELB</div>
      <div className="mt-12">
        {sidebarLinks.map((link) => {
          return (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => {
                return `flex items-center my-1 p-2 rounded-lg text-muted-foreground hover:text-muted hover:bg-accent-foreground ${
                  isActive ? `${activeLink} bg-accent-foreground` : null
                }`;
              }}
            >
              <link.icon size={18} className="mr-3" />
              <span className="text-sm">{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default AdminSidebar;
