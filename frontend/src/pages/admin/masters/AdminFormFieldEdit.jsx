import {
  AdminBreadcrum,
  AdminPageLayout,
  PageHeader,
  SubmitBtn,
} from "@/components";
import FieldOptionTable from "@/components/admin/masters/FieldOptionTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { startingOptions } from "@/features/formFieldSlice";
import customFetch from "@/utils/customFetch";
import { fieldTypes } from "@/utils/data";
import splitErrors from "@/utils/splitErrors";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

const AdminFormFieldEdit = () => {
  const field = useLoaderData();
  document.title = `${field.field_label} | Form Fields | ${
    import.meta.env.VITE_APP_TITLE
  }`;

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { options } = useSelector((store) => store.formFields);
  const { allCategories } = useSelector((store) => store.categories);
  const parentCategories = allCategories.filter((i) => i.parent_id === null);
  const starting = [];
  field.field_options.map((i) => {
    starting.push(i.value);
  });

  const [childCategories, setChildCategories] = useState([]);
  const [form, setForm] = useState({
    catId: "",
    subcatId: "",
    formLabel: "",
    fieldType: "",
    isRequired: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      const response = await customFetch.put(
        `/masters/form-fields/${Number(field.id)}`,
        data
      );
      toast({
        title: "Saved",
        description: "Form field updated successfully!",
      });
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      splitErrors(error?.response?.data?.msg);
      return;
    }
  };

  useEffect(() => {
    const parentId = allCategories.find((i) => i.id === field.cat_id).parent_id;
    setChildCategories(allCategories.filter((i) => i.parent_id === parentId));

    setForm({
      ...form,
      catId: parentId,
      subcatId: field.cat_id,
      formLabel: field.field_label,
      fieldType: field.field_type,
      isRequired: field.is_required ? "on" : null,
    });

    dispatch(startingOptions(starting));
  }, []);

  return (
    <>
      <PageHeader main={field.field_label} />
      <AdminBreadcrum
        parentLabel={`form fields`}
        parentHref={`/admin/form-fields`}
        childLabel={field.field_label}
      />

      <AdminPageLayout>
        <div className="grid grid-cols-2 -mt-4">
          <div className="col-span-1 border-1 rounded-md p-3">
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
                    className="capitalize"
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
              <div className={`flex gap-4 justify-end`}>
                <Button type="button" variant="ghost">
                  <Link to={`/admin/form-fields`}>Back</Link>
                </Button>
                <SubmitBtn label={`save`} isSubmitting={isSubmitting} />
              </div>
            </form>
          </div>
        </div>
      </AdminPageLayout>
    </>
  );
};
export default AdminFormFieldEdit;

// Loader function starts ------
export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await customFetch.get(`/masters/form-fields/${id}`);
    return response.data.data.rows[0];
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return null;
  }
};
