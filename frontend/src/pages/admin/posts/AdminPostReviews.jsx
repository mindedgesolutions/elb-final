import {
  AdminDeleteReview,
  AdminPageLayout,
  AdminPagination,
  AdminSearchReview,
  AdminSmallerTitle,
  PageHeader,
  TableRowSkeleton,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import customFetch from "@/utils/customFetch";
import { reviewBadge, serialNo } from "@/utils/functions";
import splitErrors from "@/utils/splitErrors";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { updateCounter } from "@/features/commonSlice";

const AdminPostReviews = () => {
  document.title = `List of All Reviews | ${import.meta.env.VITE_APP_TITLE}`;
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");
  const { counter } = useSelector((store) => store.common);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/posts/reviews`, {
        params: {
          page: page || "",
          search: queryString.get("s") || "",
          type: queryString.get("t") || "",
        },
      });
      setReviews(response.data.data.rows);
      setMeta(response.data.meta);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [counter, page, queryString.get("s"), queryString.get("t")]);

  const toggleReview = async ({ id, type }) => {
    setIsLoading(true);
    try {
      await customFetch.patch(`/posts/reviews/${id}`, { type: type });
      dispatch(updateCounter());

      const title = type === 1 ? "Unpublished" : "Published";
      const message =
        type === 1 ? "Review is unpublished" : "Review is published";
      toast({ title: title, description: message });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

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
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline">
                                {review.message.substring(0, 10) + ` ...`}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[350px] p-3 text-sm text-justify">
                              <div className="grid gap-1">{review.message}</div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>
                          {dayjs(new Date(review.created_at)).format(
                            "ddd, MMM D, YYYY h:mm A"
                          )}
                        </TableCell>
                        <TableCell>{reviewBadge(review.is_publish)}</TableCell>
                        <TableCell>
                          <span className="flex items-center">
                            {review.is_publish === 1 ? (
                              <>
                                <Button
                                  variant="outline"
                                  className={`w-10 h-10 p-1 text-green-400 hover:text-green-400`}
                                  onClick={() =>
                                    toggleReview({ id: review.id, type: 2 })
                                  }
                                >
                                  PUB
                                </Button>
                                <AdminDeleteReview id={review.id} />
                              </>
                            ) : review.is_publish === 2 ? (
                              <>
                                <Button
                                  variant="outline"
                                  className={`w-10 h-10 p-1 text-gray-400 hover:text-gray-400`}
                                  onClick={() =>
                                    toggleReview({ id: review.id, type: 1 })
                                  }
                                >
                                  UN
                                </Button>
                                <AdminDeleteReview id={review.id} />
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="outline"
                                  className={`w-10 h-10 p-1 text-green-400 hover:text-green-400`}
                                  onClick={() =>
                                    toggleReview({ id: review.id, type: 2 })
                                  }
                                >
                                  PUB
                                </Button>
                                <Button
                                  variant="outline"
                                  className={`w-10 h-10 p-1 text-gray-400 hover:text-gray-400`}
                                  onClick={() =>
                                    toggleReview({ id: review.id, type: 1 })
                                  }
                                >
                                  UN
                                </Button>
                              </>
                            )}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {meta.totalPages > 1 && (
              <AdminPagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
              />
            )}
          </>
        )}
      </AdminPageLayout>
    </>
  );
};
export default AdminPostReviews;
