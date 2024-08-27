import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import avatar from "@/assets/website/img/dashboard/default-user.png";
import { Separator } from "@/components/ui/separator";
import { wbProfileLinks } from "@/utils/links";
import { nanoid } from "nanoid";

const TopNavProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutWebsite = async () => {};

  return (
    <div className="dashboard-header-btns flex items-center gap-3">
      <div className="dropdown d-none d-md-block">
        <div className="dropdown-menu"></div>
      </div>
      <div className="dropdown relative">
        <button
          className="w-10 h-10 bg-white rounded-full"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={avatar} className="rounded-circle" alt="" />
        </button>
        <ul className="dropdown-menu p-2 absolute">
          <li className="font-medium capitalize mb-2 ml-2">
            {/* {`${currentUser.first_name} ${currentUser.last_name}`.toUpperCase()} */}
            Souvik Nag
          </li>
          <Separator className="mb-2" />
          {wbProfileLinks.map((link) => {
            return (
              <li key={nanoid()}>
                <Link
                  className="dashboard-profile-item flex gap-2 text-sm items-center p-2 bg-gray-50 hover:bg-gray-200 rounded-lg mb-2 capitalize cursor-pointer"
                  to={link.href}
                >
                  <link.icon size={16} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default TopNavProfileDropdown;
