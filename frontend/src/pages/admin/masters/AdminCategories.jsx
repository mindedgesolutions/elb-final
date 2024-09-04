import {
  AddCategoryForm,
  AdminPageLayout,
  AdminPagination,
  AdminSmallerTitle,
  DeleteCategory,
  PageHeader,
  SearchCategory,
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

const AdminCategories = () => {
  document.title = `List of Categories | ${import.meta.env.VITE_APP_TITLE}`;
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
  const { listCategories, parentCategories } = useSelector(
    (store) => store.categories
  );
  const { counter } = useSelector((store) => store.common);

  // Fetch data and parents start ------
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/masters/categories`, {
        params: {
          page: page || "",
          search: queryString.get("s") || "",
          parent: queryString.get("t") || "",
        },
      });
      dispatch(setListCategories(response.data.data.rows));
      setMeta({
        ...meta,
        totalPages: response.data.meta.totalPages,
        currentPage: response.data.meta.currentPage,
        totalRecords: response.data.meta.totalRecords,
      });

      const pcat = await customFetch.get(`/masters/parent-categories`);
      dispatch(setParentCategories(pcat.data.data.rows));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  // Fetch data and parents end ------

  useEffect(() => {
    fetchData();
  }, [counter, page, queryString.get("s"), queryString.get("t")]);

  // Activate category ------
  const activateCategory = async (id) => {
    setIsLoading(true);
    try {
      await customFetch.patch(`/masters/categories/activate/${id}`);
      toast({
        title: `Activated`,
        description: `Category activated successful`,
      });

      const response = await customFetch.get(`/masters/categories`, {
        params: {
          page: page || "",
          search: queryString.get("s") || "",
          parent: queryString.get("t") || "",
        },
      });
      dispatch(setListCategories(response.data.data.rows));

      const pcat = await customFetch.get(`/masters/parent-categories`);
      dispatch(setParentCategories(pcat.data.data.rows));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
    }
  };

  return (
    <>
      <PageHeader main={`List of categories`} />
      <AdminPageLayout>
        <SearchCategory />
        <div className="flex sm:flex-col-reverse md:flex-row sm:gap-4 md:gap-8">
          <div className="w-full md:basis-2/3">
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
                        <TableHead>Parent</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {listCategories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center">
                            No data found
                          </TableCell>
                        </TableRow>
                      ) : (
                        listCategories.map((category, index) => {
                          return (
                            <TableRow key={nanoid()} className="group">
                              <TableCell>{serialNo(page) + index}.</TableCell>
                              <TableCell className="capitalize">
                                {category.parent_id ? (
                                  <AdminSmallerTitle
                                    title={category.pcategory}
                                  />
                                ) : (
                                  "---"
                                )}
                              </TableCell>
                              <TableCell className="capitalize">
                                <AdminSmallerTitle title={category.category} />
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
                                    <DeleteCategory
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
          <div className="w-full md:basis-1/3 mt-4">
            <AddCategoryForm editId={editId} setEditId={setEditId} />
          </div>
        </div>
      </AdminPageLayout>
    </>
  );
};
export default AdminCategories;
