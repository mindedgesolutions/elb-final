import { AdminPageLayout, PageHeader } from "@/components";
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
import { Eye, Pencil, Trash2 } from "lucide-react";

const AdminUsers = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center p-8 -mb-8">
        <h1 className="text-2xl font-semibold mb-2">List of users</h1>
        <Button type="button" size="sm" className="px-4">
          Add new
        </Button>
      </div>
      <AdminPageLayout>
        <section>
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
                <TableCell className="flex items-center gap-x-2">
                  <Button variant="link" size="sm">
                    <Eye size={18} />
                  </Button>
                  <Button variant="link" size="sm">
                    <Pencil size={18} />
                  </Button>
                  <Button variant="link" size="sm">
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell>9830098300</TableCell>
                <TableCell>
                  <Badge className="bg-green-300">Active</Badge>
                </TableCell>
                <TableCell>Sept 01, 2023 10:55 AM</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Button variant={"link"} size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Pencil size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell>9830098300</TableCell>
                <TableCell>
                  <Badge className="bg-red-300">Active</Badge>
                </TableCell>
                <TableCell>Sept 01, 2023 10:55 AM</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Button variant={"link"} size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Pencil size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell>9830098300</TableCell>
                <TableCell>
                  <Badge className="bg-orange-300">Active</Badge>
                </TableCell>
                <TableCell>Sept 01, 2023 10:55 AM</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Button variant={"link"} size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Pencil size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell>9830098300</TableCell>
                <TableCell>
                  <Badge className="bg-blue-300">Active</Badge>
                </TableCell>
                <TableCell>Sept 01, 2023 10:55 AM</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Button variant={"link"} size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Pencil size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>test@test.com</TableCell>
                <TableCell>9830098300</TableCell>
                <TableCell>
                  <Badge className="bg-slate-300">Active</Badge>
                </TableCell>
                <TableCell>Sept 01, 2023 10:55 AM</TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Button variant={"link"} size="icon">
                    <Eye size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Pencil size={18} />
                  </Button>
                  <Button variant={"link"} size="icon">
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
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
