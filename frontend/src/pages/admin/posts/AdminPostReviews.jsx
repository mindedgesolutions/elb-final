import {
  AdminPageLayout,
  AdminPagination,
  AdminSearchReview,
  AdminSmallerTitle,
  PageHeader,
  TableRowSkeleton,
  ToggleFeatured,
  ToggleSold,
  WbRepeatStars,
} from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import customFetch from "@/utils/customFetch";
import { activeBadge, serialNo } from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AdminPostReviews = () => {
  document.title = `List of All Reviews | ${import.meta.env.VITE_APP_TITLE}`;
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");
  const { counter } = useSelector((store) => store.common);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/posts/reviews`);
      setReviews(response.data.data.rows);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [counter, queryString.get("s"), queryString.get("t")]);

  return (
    <>
      <PageHeader main={`List of all reviews`} />
      <AdminPageLayout>
        <AdminSearchReview />
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
                  <TableHead>Review By</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Review At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  reviews.map((review, index) => {
                    const reviewer = review.first_name + " " + review.last_name;

                    return (
                      <TableRow key={nanoid()} className="group">
                        <TableCell>{serialNo(page) + index}.</TableCell>
                        <TableCell className="normal-case">
                          <h3 className="text-md font-semibold tracking-tight p-2">
                            <AdminSmallerTitle title={review.title} />
                          </h3>
                        </TableCell>
                        <TableCell>
                          <AdminSmallerTitle title={reviewer} />
                        </TableCell>
                        <TableCell>
                          <span className="flex gap-1">
                            <WbRepeatStars count={review.rating} />
                          </span>
                        </TableCell>
                        <TableCell>
                          <AdminSmallerTitle title={review.message} />
                        </TableCell>
                        {/* <TableCell>{activeBadge(post.is_active)}</TableCell>
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
                        </TableCell> */}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {/* <AdminPagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
            /> */}
          </>
        )}
      </AdminPageLayout>
    </>
  );
};
export default AdminPostReviews;
