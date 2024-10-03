import {
  AddFormField,
  AdminPageLayout,
  AdminPagination,
  AdminSmallerTitle,
  DeleteFormField,
  EditFieldOption,
  SearchFormFields,
  TableRowSkeleton,
} from "@/components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
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
import {
  activeBadge,
  fieldTypeBadge,
  requiredBadge,
  serialNo,
} from "@/utils/functions";
import { Pencil, ThumbsUp } from "lucide-react";
import { nanoid } from "nanoid";
import splitErrors from "@/utils/splitErrors";
import { setListFormFields } from "@/features/formFieldSlice";
import { Badge } from "@/components/ui/badge";

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
  const { listFormFields } = useSelector((store) => store.formFields);
  const { allCategories } = useSelector((store) => store.categories);
  const { counter } = useSelector((store) => store.common);

  // Fetch data and parents start ------
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/masters/form-fields`, {
        params: {
          page: page,
          parent: queryString.get("t") || "",
        },
      });
      dispatch(setListFormFields(response.data.data.rows));

      setMeta({
        ...meta,
        totalPages: response.data.meta.totalPages,
        currentPage: response.data.meta.currentPage,
        totalRecords: response.data.meta.totalRecords,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
    }
  };
  // Fetch data and parents end ------

  useEffect(() => {
    fetchData();
  }, [counter, page, queryString.get("t")]);

  // Activate category ------
  const activateCategory = async (id) => {
    setIsLoading(true);
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full flex md:flex-row sm:justify-center md:justify-between sm:items-center md:items-center sm:p-4 md:p-8 sm:space-y-4 sm:-mb-4 md:-mb-10">
        <div className="flex flex-col sm:basis-4/6">
          <h1 className="text-2xl font-semibold md:mb-2 sm:mb-4">
            List of Form Fields
          </h1>
          <h3 className="text-sm font-normal text-muted-foreground sm:text-justify sm:tracking-normal">{`Note: You do not need to add fields for "Parent" categories e.g. Bikes, Electronics & Appliances, Fashion, Furniture Models etc.`}</h3>
        </div>

        <div className="sm:basis-2/6 flex justify-end">
          <AddFormField />
        </div>
      </div>
      <AdminPageLayout>
        <SearchFormFields />
        <div className="flex sm:flex-col-reverse md:flex-row sm:gap-4 md:gap-8">
          <div className="w-full">
            <section>
              {isLoading ? (
                <TableRowSkeleton count={9} />
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
                        listFormFields.map((field, index) => {
                          const child = allCategories?.find(
                            (i) => i.id === field.cat_id
                          );

                          const parent = allCategories?.find(
                            (i) => i.id === child.parent_id
                          );

                          return (
                            <TableRow key={nanoid()} className="group">
                              <TableCell>{serialNo(page) + index}.</TableCell>
                              <TableCell className="capitalize">
                                <Badge className="bg-pink-400 group-hover:bg-pink-500">
                                  {parent?.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="capitalize">
                                <Badge className="bg-slate-400 group-hover:bg-slate-500">
                                  {child?.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="capitalize">
                                <AdminSmallerTitle title={field.field_label} />
                              </TableCell>
                              <TableCell>
                                {fieldTypeBadge(field.field_type)}
                              </TableCell>
                              <TableCell>
                                {requiredBadge(field.is_required)}
                              </TableCell>
                              <TableCell>
                                {field.field_type === "radio" && (
                                  <EditFieldOption
                                    options={field.field_options}
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                {activeBadge(field.is_required)}
                              </TableCell>
                              <TableCell className="flex items-center">
                                {field.is_active ? (
                                  <>
                                    <Button
                                      type="button"
                                      variant="link"
                                      size="icon"
                                    >
                                      <Link
                                        to={`/admin/form-fields/edit/${field.id}`}
                                      >
                                        <Pencil
                                          size={18}
                                          className="text-green-500 group-hover:text-green-400"
                                        />
                                      </Link>
                                    </Button>
                                    <DeleteFormField
                                      id={field.id}
                                      field={field.field}
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
                  {!editId && meta.totalPages > 1 && (
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
