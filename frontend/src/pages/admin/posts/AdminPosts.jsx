import {
  AdminPageLayout,
  AdminPagination,
  AdminSearchPosts,
  AdminSmallerTitle,
  DeleteUser,
  PageHeader,
  TableRowSkeleton,
  ToggleFeatured,
  ToggleSold,
} from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useEffect, useState } from "react";
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
import { activeBadge, serialNo } from "@/utils/functions";
import dayjs from "dayjs";
import { Eye, Pencil, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const AdminPosts = () => {
  document.title = `List of All Posts | ${import.meta.env.VITE_APP_TITLE}`;

  const { counter } = useSelector((store) => store.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");
  const [isLoading, setIsLoading] = useState(false);
  const [listPosts, setListPosts] = useState([]);
  const [meta, setMeta] = useState({
    totalPages: 0,
    currentPage: 0,
    totalRecords: 0,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/posts/admin`, {
        params: {
          page: page || "",
          search: queryString.get("s") || "",
          category: queryString.get("cat") || "",
          subCategory: queryString.get("scat") || "",
          status: queryString.get("status") || "",
          startDate: queryString.get("start") || "",
          endDate: queryString.get("end") || "",
          maxPrice: queryString.get("max") || "",
          minPrice: queryString.get("min") || "",
        },
      });
      setListPosts(response.data.data.rows);

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
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    counter,
    page,
    queryString.get("s"),
    queryString.get("cat"),
    queryString.get("scat"),
    queryString.get("status"),
    queryString.get("start"),
    queryString.get("end"),
    queryString.get("max"),
    queryString.get("min"),
  ]);

  return (
    <>
      <PageHeader main={`List of all posts`} />
      <AdminPageLayout>
        <AdminSearchPosts />
        {isLoading ? (
          <TableRowSkeleton count={10} />
        ) : (
          <>
            <Table>
              <TableCaption className="capitalize"></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Sl. No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Is Active</TableHead>
                  <TableHead>Featured?</TableHead>
                  <TableHead>Sold?</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  listPosts.map((post, index) => {
                    const sellerName = post.first_name + " " + post.last_name;

                    return (
                      <TableRow key={post.slug} className="group">
                        <TableCell>{serialNo(page) + index}.</TableCell>
                        <TableCell className="normal-case">
                          <div className="flex flex-col">
                            <h3 className="text-md font-semibold tracking-tight p-2">
                              <AdminSmallerTitle title={post.title} />
                            </h3>
                            <p className="text-sm lowercase font-extralight">
                              - <AdminSmallerTitle title={sellerName} />
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <AdminSmallerTitle title={post.subcat} />
                        </TableCell>
                        <TableCell>{post.price}</TableCell>
                        <TableCell>{activeBadge(post.is_active)}</TableCell>
                        <TableCell>
                          <ToggleFeatured
                            id={post.id}
                            title={post.title}
                            current={post.is_feature}
                            isSold={post.is_sold}
                          />
                        </TableCell>
                        <TableCell>
                          <ToggleSold
                            id={post.id}
                            title={post.title}
                            current={post.is_sold}
                          />
                        </TableCell>
                        <TableCell>
                          {dayjs(new Date(post.created_at)).format(
                            "ddd, MMM D, YYYY h:mm A"
                          )}
                        </TableCell>
                        <TableCell className="flex items-center">
                          {post.is_active ? (
                            <>
                              <Button variant="link" size="sm">
                                <Eye
                                  size={18}
                                  className="text-green-500 group-hover:text-green-400"
                                />
                              </Button>
                              {!post.is_sold && (
                                <>
                                  <Button variant="link" size="sm">
                                    <Pencil
                                      size={18}
                                      className="text-green-500 group-hover:text-green-400"
                                    />
                                  </Button>
                                  <DeleteUser id={post.id} name={post.title} />
                                </>
                              )}
                            </>
                          ) : (
                            <Button
                              type="button"
                              variant="link"
                              size="sm"
                              className="text-yellow-500"
                              onClick={() => activateUser(user.id)}
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
            <AdminPagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
            />
          </>
        )}
      </AdminPageLayout>
    </>
  );
};
export default AdminPosts;
