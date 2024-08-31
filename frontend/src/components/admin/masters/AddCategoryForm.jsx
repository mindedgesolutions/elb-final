import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { nanoid } from "nanoid";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SubmitBtn } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import splitErrors from "@/utils/splitErrors";
import customFetch from "@/utils/customFetch";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { updateCounter } from "@/features/commonSlice";
import {
  setAllCategories,
  setParentCategories,
} from "@/features/categorySlice";

const AddCategoryForm = ({ editId, setEditId }) => {
  const dispatch = useDispatch();
  const { parentCategories, listCategories } = useSelector(
    (store) => store.categories
  );
  const category = editId && listCategories.find((cat) => cat.id === editId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    isParent: false,
    parentId: "",
  });
  const [inputCategory, setInputCategory] = useState("");

  // Form reset starts ------
  const resetForm = () => {
    setForm({ ...form, isParent: false, parentId: "" });
    setInputCategory("");
    setEditId(null);
  };
  // Form reset ends ------

  // Handle form submit starts ------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      isParent: data.isParent === "on" ? true : false,
      parentId: !data.isParent ? data.parentId : null,
    };

    const url = editId
      ? `/masters/categories/${editId}`
      : `/masters/categories`;
    const process = editId ? customFetch.patch : customFetch.post;
    const title = editId ? `Updated` : `Added`;
    const description = editId
      ? `Category updated successfully`
      : `Category added`;
    try {
      await process(url, data);
      resetForm();
      dispatch(updateCounter());

      if (data.isParent === "on") {
        const pcat = await customFetch.get(`/masters/parent-categories`);
        dispatch(setParentCategories(pcat.data.data.rows));
      }

      const categories = await customFetch.get(`/website/categories`);
      dispatch(setAllCategories(categories.data.data.rows));

      toast({ title, description });
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      splitErrors(error?.response?.data?.msg);
    }
  };
  // Handle form submit ends ------

  useEffect(() => {
    if (category) {
      setForm({
        ...form,
        isParent: category.parent_id ? false : true,
        parentId: Number(category.parent_id),
      });
      setInputCategory(category.category);
    }
  }, [category]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold leading-none tracking-tight capitalize">
          Add new category
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isParent"
                name="isParent"
                checked={form.isParent}
                onClick={() => setForm({ ...form, isParent: !form.isParent })}
              />
              <label
                htmlFor="isParent"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Is parent category?
              </label>
            </div>
            {!form.isParent && (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`parentId`} className="capitalize">
                    Parent category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="parentId"
                    id="parentId"
                    value={form.parentId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        parentId: Number(e.target.value),
                      })
                    }
                    className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  >
                    <option value="">Select parent</option>
                    {parentCategories.map((pcat) => {
                      return (
                        <option key={nanoid()} value={pcat.id}>
                          {pcat.category}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`category`} className="capitalize">
                Category name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="category"
                name="category"
                placeholder="Enter category"
                value={inputCategory}
                onChange={(e) => setInputCategory(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between mt-4">
          <Button type="reset" variant="outline" onClick={resetForm}>
            Cancel
          </Button>
          <SubmitBtn label="Submit" isSubmitting={isSubmitting} />
        </CardFooter>
      </form>
    </Card>
  );
};
export default AddCategoryForm;
