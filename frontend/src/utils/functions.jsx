import { Badge } from "@/components/ui/badge";

export const activeBadge = (status) => {
  switch (status) {
    case true:
      return (
        <Badge className="bg-green-400 group-hover:bg-green-500">Active</Badge>
      );

    case false:
      return (
        <Badge className="bg-red-400 group-hover:bg-red-500">Active</Badge>
      );
  }
};

export const adminBadge = (isAdmin) => {
  switch (isAdmin) {
    case 1:
      return (
        <Badge className="bg-pink-400 group-hover:bg-pink-500">Admin</Badge>
      );
    case 2:
      return (
        <Badge className="bg-slate-400 group-hover:bg-slate-500">User</Badge>
      );
  }
};

export const serialNo = (page) => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * 10 + 1;
  return srno;
};
