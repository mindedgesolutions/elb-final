import { FormInput, SubmitBtn } from "@/components";
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
    isAdmin: "",
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
        isAdmin: user.rid === 1 ? true : false || "",
      });
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="link"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{`${user.first_name} ${user.last_name}`}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <FormInput
              type={"text"}
              label={"First name"}
              name={"firstName"}
              placeholder={"Your first name"}
              required={true}
              value={form.firstName}
            />
            <FormInput
              type={"text"}
              label={"Last name"}
              name={"lastName"}
              placeholder={"Your last name"}
              required={true}
              value={form.lastName}
            />
            <FormInput
              type={"text"}
              label={"Email"}
              name={"email"}
              placeholder={"Your email"}
              required={true}
              value={form.email}
            />
            <FormInput
              type={"text"}
              label={"Mobile no."}
              name={"mobile"}
              placeholder={"Your mobile no."}
              required={true}
              value={form.mobile}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="isAdmin" name="isAdmin" checked={form.isAdmin} />
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
