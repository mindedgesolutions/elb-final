import { SubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { setListUsers } from "@/features/usersSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditUser = ({ id }) => {
  const { listUsers } = useSelector((store) => store.users);
  const user = id && listUsers.find((i) => i.id === id);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    isAdmin: false,
  });

  // Form submit starts ------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, isAdmin: data.isAdmin === "on" ? true : false };
    try {
      await customFetch.patch(`/users/users/${id}`, data);
      toast({
        title: "Updated",
        description: "User updated successfully!",
      });

      const response = await customFetch.get(`/users/users`);
      dispatch(setListUsers(response.data.data.rows));

      setIsOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      splitErrors(error?.response?.data?.msg);
      console.log(error);
    }
  };
  // Form submit ends ------

  useEffect(() => {
    user &&
      setForm({
        ...form,
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        isAdmin: user.rid === 1 ? true : false,
      });
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Pencil
            size={18}
            className="text-green-500 group-hover:text-green-400"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start capitalize">{`${user.first_name} ${user.last_name}`}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`firstName`} className="capitalize">
                First name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id={`firstName`}
                name={`firstName`}
                placeholder={`Your first name`}
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`lastName`} className="capitalize">
                Last name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id={`lastName`}
                name={`lastName`}
                placeholder={`Your last name`}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`email`} className="capitalize">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id={`email`}
                name={`email`}
                placeholder={`Your email`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`mobile`} className="capitalize">
                Mobile no. <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id={`mobile`}
                name={`mobile`}
                placeholder={`Your mobile no.`}
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAdmin"
                name="isAdmin"
                checked={form.isAdmin}
                onClick={() => setForm({ ...form, isAdmin: !form.isAdmin })}
              />
              <label
                htmlFor="isAdmin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is Admin?
              </label>
            </div>
          </div>
          <DialogFooter className={`flex gap-2`}>
            <SubmitBtn label={`save changes`} isSubmitting={isSubmitting} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default EditUser;
