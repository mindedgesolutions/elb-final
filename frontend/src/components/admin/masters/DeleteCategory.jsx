import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  setListCategories,
  setParentCategories,
} from "@/features/categorySlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

const DeleteCategory = ({ id, category }) => {
  const dispatch = useDispatch();

  const deleteCategory = async () => {
    try {
      await customFetch.delete(`/masters/categories/${id}`);
      toast({
        title: "Deactivated",
        description: "Category deactivated successfully",
      });

      const response = await customFetch.get(`/masters/categories`);
      dispatch(setListCategories(response.data.data.rows));

      const pcat = await customFetch.get(`/masters/parent-categories`);
      dispatch(setParentCategories(pcat.data.data.rows));
    } catch (error) {
      console.log(error);
      splitErrors(error?.response?.data?.msg);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" size="sm">
          <Trash2 size={18} className="text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will deactivate{" "}
            <span className="text-red-500 font-semibold">{category}</span> and
            all sub-categories, if there is any
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400"
            onClick={deleteCategory}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteCategory;
