import {
  AddFormField,
  AdminPageLayout,
  AdminPagination,
  DeleteFormField,
  SearchFormFields,
  TableRowSkeleton,
} from "@/components";
import {
  setListCategories,
  setParentCategories,
} from "@/features/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import customFetch from "@/utils/customFetch";
import { activeBadge, serialNo } from "@/utils/functions";
import { Pencil, ThumbsUp, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import splitErrors from "@/utils/splitErrors";
import { toast } from "@/components/ui/use-toast";

const AdminFormFields = () => {
  document.title = `Form Fields | ${import.meta.env.VITE_APP_TITLE}`;
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState({
    totalPages: 0,
    currentPage: 0,
    totalRecords: 0,
  });
  const [editId, setEditId] = useState(null);
  const { parentCategories } = useSelector((store) => store.categories);
  const { counter } = useSelector((store) => store.common);

  const listFormFields = [];

  // Fetch data and parents start ------
  const fetchData = async () => {
    setIsLoading(true);
    try {
    } catch (error) {}
  };
  // Fetch data and parents end ------

  // useEffect(() => {
  //   fetchData();
  // }, [counter, page, queryString.get("s"), queryString.get("t")]);

  // Activate category ------
  const activateCategory = async (id) => {
    setIsLoading(true);
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-8 -mb-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">List of Form Fields</h1>
          <h3 className="text-sm font-normal text-muted-foreground">{`Note: Note: You do not need to add fields for "Parent" categories e.g. Bikes, Electronics & Appliances, Fashion, Furniture Models etc.`}</h3>
        </div>

        <AddFormField />
      </div>
      <AdminPageLayout>
        <SearchFormFields />
        <div className="flex sm:flex-col-reverse md:flex-row sm:gap-4 md:gap-8">
          <div className="w-full">
            <section>
              {isLoading ? (
                <TableRowSkeleton count={10} />
              ) : (
                <>
                  <Table>
                    <TableCaption className="capitalize"></TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sl. No.</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Sub-category</TableHead>
                        <TableHead>Form Label</TableHead>
                        <TableHead>Field Type</TableHead>
                        <TableHead>Required?</TableHead>
                        <TableHead>Options</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listFormFields.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            No data found
                          </TableCell>
                        </TableRow>
                      ) : (
                        listFormFields.map((category, index) => {
                          return (
                            <TableRow key={nanoid()} className="group">
                              <TableCell>{serialNo(page) + index}.</TableCell>
                              <TableCell className="capitalize">
                                {category.parent_id
                                  ? category.pcategory
                                  : "---"}
                              </TableCell>
                              <TableCell className="capitalize">
                                {category.category}
                              </TableCell>
                              <TableCell>
                                {activeBadge(category.is_active)}
                              </TableCell>
                              <TableCell className="flex items-center">
                                {category.is_active ? (
                                  <>
                                    <Button
                                      type="button"
                                      variant="link"
                                      size="sm"
                                      onClick={() => setEditId(category.id)}
                                    >
                                      <Pencil
                                        size={18}
                                        className="text-green-500 group-hover:text-green-400"
                                      />
                                    </Button>
                                    <DeleteFormField
                                      id={category.id}
                                      category={category.category}
                                    />
                                  </>
                                ) : (
                                  <Button
                                    type="button"
                                    variant="link"
                                    size="sm"
                                    className="text-yellow-500"
                                    onClick={() =>
                                      activateCategory(category.id)
                                    }
                                  >
                                    <ThumbsUp size={18} />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                  {!editId && (
                    <AdminPagination
                      currentPage={meta.currentPage}
                      totalPages={meta.totalPages}
                    />
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </AdminPageLayout>
    </>
  );
};
export default AdminFormFields;

// Loader function starts ------
