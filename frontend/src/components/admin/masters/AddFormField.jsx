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
import { fieldTypes } from "@/utils/data";
import splitErrors from "@/utils/splitErrors";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FieldOptionTable from "./FieldOptionTable";
import { updateCounter } from "@/features/commonSlice";
import { unsetFieldOptions } from "@/features/formFieldSlice";
import { ScrollBar } from "@/components/ui/scroll-area";

const AddFormField = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { allCategories } = useSelector((store) => store.categories);
  const parentCategories = allCategories.filter((i) => !i.parent_id);
  const [form, setForm] = useState({
    catId: "",
    subcatId: "",
    formLabel: "",
    fieldType: "",
    isRequired: true,
  });
  const [childCategories, setChildCategories] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "catId") {
      const children = allCategories
        .filter((i) => i.parent_id === Number(e.target.value))
        .sort((a, b) => a.category.localeCompare(b.category));
      setChildCategories(children);
    }
  };

  const { options } = useSelector((store) => store.formFields);

  // Form submit starts ------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, isRequired: data.isRequired === "on" ? true : false };
    if (data.fieldType === "radio" && options.length === 0) {
      toast({ description: "At least one option is required" });
    }
    data = { ...data, options: [...options] };
    try {
      await customFetch.post(`/masters/form-fields`, data);
      toast({
        title: "Added",
        description: "Form field added successfully!",
      });

      dispatch(updateCounter());

      resetForm();
      setIsOpen(false);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      splitErrors(error?.response?.data?.msg);
    }
  };
  // Form submit ends ------

  const resetForm = () => {
    setForm({
      ...form,
      catId: "",
      subcatId: "",
      formLabel: "",
      fieldType: "",
      isRequired: true,
    });
    setChildCategories([]);
    dispatch(unsetFieldOptions());
  };

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

      <DialogContent className={"overflow-y-scroll max-h-screen"}>
        <DialogHeader>
          <DialogTitle className="flex justify-start capitalize">
            Add new form field
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`catId`} className="capitalize">
                Parent category <span className="text-red-500">*</span>
              </Label>
              <select
                name="catId"
                id="catId"
                className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                value={form.catId}
                onChange={handleChange}
              >
                <option value="">Select parent</option>
                {parentCategories.map((cat) => {
                  return (
                    <option key={nanoid()} value={cat.id}>
                      {cat.category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`subcatId`} className="capitalize">
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                name="subcatId"
                id="subcatId"
                className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                value={form.subcatId}
                onChange={handleChange}
              >
                <option value="">Select sub-category</option>
                {childCategories?.map((cat) => {
                  return (
                    <option key={nanoid()} value={cat.id}>
                      {cat.category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`formLabel`} className="capitalize">
                Form field label <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="formLabel"
                name="formLabel"
                placeholder="Dude! There has to be a label"
                value={form.formLabel}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`fieldType`} className="capitalize">
                Field type <span className="text-red-500">*</span>
              </Label>
              <select
                name="fieldType"
                id="fieldType"
                className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                value={form.fieldType}
                onChange={handleChange}
              >
                <option value="">Select field type</option>
                {fieldTypes?.map((type) => {
                  return (
                    <option key={nanoid()} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>

            {form.fieldType === "radio" && <FieldOptionTable />}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isRequired"
                name="isRequired"
                checked={form.isRequired}
                onClick={() =>
                  setForm({ ...form, isRequired: !form.isRequired })
                }
              />
              <label
                htmlFor="isRequired"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is required?
              </label>
            </div>
          </div>
          <DialogFooter className={`flex gap-2`}>
            <Button type="reset" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <SubmitBtn label={`Add Field`} isSubmitting={isSubmitting} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddFormField;
