import {
  AddUser,
  AdminPageLayout,
  DeleteUser,
  EditUser,
  PageHeader,
  SearchUser,
} from "@/components";
import TableRowSkeleton from "@/components/globals/TableRowSkeleton";
import { Badge } from "@/components/ui/badge";
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
import { Eye } from "lucide-react";

const AdminUsers = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center p-8 -mb-8">
        <h1 className="text-2xl font-semibold mb-2">List of users</h1>
        <AddUser />
      </div>
      <AdminPageLayout>
        <section>
          {/* <TableRowSkeleton count={3} /> */}
          <SearchUser />
          <Table>
            <TableCaption className="capitalize">
              total products : 10
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Sl. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell>9830098300</TableCell>
                <TableCell>
                  <Badge className="bg-purple-300">Active</Badge>
                </TableCell>
                <TableCell>Sept 01, 2023 10:55 AM</TableCell>
                <TableCell className="flex items-center">
                  <Button variant="link" size="sm">
                    <Eye size={18} />
                  </Button>
                  <EditUser />
                  <DeleteUser />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </AdminPageLayout>
    </>
  );
};
export default AdminUsers;
