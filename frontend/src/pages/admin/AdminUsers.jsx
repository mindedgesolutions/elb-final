import {
  AddUser,
  AdminPageLayout,
  AdminPagination,
  DeleteUser,
  EditUser,
  SearchUser,
} from "@/components";
import TableRowSkeleton from "@/components/globals/TableRowSkeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setListUsers } from "@/features/usersSlice";
import customFetch from "@/utils/customFetch";
import { activeBadge, adminBadge, serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AdminUsers = () => {
  document.title = `List of Users | ${import.meta.env.VITE_APP_TITLE}`;
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState({
    totalPages: 0,
    currentPage: 0,
    totalRecords: 0,
  });
  const { listUsers } = useSelector((store) => store.users);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/users/users`, {
        params: {
          page: page || "",
          search: queryString.get("s") || "",
          type: queryString.get("t") || "",
        },
      });

      setMeta({
        ...meta,
        totalPages: response.data.meta.totalPages,
        currentPage: response.data.meta.currentPage,
        totalRecords: response.data.meta.totalRecords,
      });

      dispatch(setListUsers(response.data.data.rows));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryString.get("page"), queryString.get("s"), queryString.get("t")]);

  return (
    <>
      <div className="w-full flex justify-between items-center p-8 -mb-10">
        <h1 className="text-2xl font-semibold mb-2">List of users</h1>
        <AddUser />
      </div>
      <AdminPageLayout>
        <section>
          <SearchUser />
          {isLoading ? (
            <TableRowSkeleton count={10} />
          ) : (
            <>
              <Table>
                <TableCaption className="capitalize"></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sl. No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Is Admin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    listUsers.map((user, index) => {
                      return (
                        <TableRow key={user.uuid} className="group">
                          <TableCell>{serialNo(page) + index}.</TableCell>
                          <TableCell className="capitalize">{`${user.first_name} ${user.last_name}`}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.mobile}</TableCell>
                          <TableCell>{adminBadge(user.rid)}</TableCell>
                          <TableCell>{activeBadge(user.is_active)}</TableCell>
                          <TableCell>
                            {dayjs(new Date(user.created_at)).format(
                              "ddd, MMM D, YYYY h:mm A"
                            )}
                          </TableCell>
                          <TableCell className="flex items-center">
                            <Button variant="link" size="sm">
                              <Eye size={18} />
                            </Button>
                            <EditUser id={user.id} />
                            <DeleteUser />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
              {meta.totalRecords > 10 && (
                <AdminPagination
                  currentPage={meta.currentPage}
                  totalPages={meta.totalPages}
                />
              )}
            </>
          )}
        </section>
      </AdminPageLayout>
    </>
  );
};
export default AdminUsers;
