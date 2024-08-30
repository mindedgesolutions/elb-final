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
import { updateCounter } from "@/features/commonSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddUser = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submit starts ------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, isAdmin: data.isAdmin === "on" ? true : false };

    try {
      await customFetch.post(`/users/users`, data);
      toast({
        title: "Added",
        description: "User added successfully!",
      });

      dispatch(updateCounter());

      setIsOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      splitErrors(error.response.data.msg);
    }
  };
  // Form submit ends ------

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="default"
          className="bg-green-500 hover:bg-green-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start">Add new user</DialogTitle>
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
            />
            <FormInput
              type={"text"}
              label={"Last name"}
              name={"lastName"}
              placeholder={"Your last name"}
              required={true}
            />
            <FormInput
              type={"text"}
              label={"Email"}
              name={"email"}
              placeholder={"Your email"}
              required={true}
            />
            <FormInput
              type={"text"}
              label={"Mobile no."}
              name={"mobile"}
              placeholder={"Your mobile no."}
              required={true}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="isAdmin" name="isAdmin" />
              <label
                htmlFor="isAdmin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is Admin?
              </label>
            </div>
          </div>
          <DialogFooter className={`flex gap-2`}>
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <SubmitBtn label={`Add user`} isSubmitting={isSubmitting} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddUser;
