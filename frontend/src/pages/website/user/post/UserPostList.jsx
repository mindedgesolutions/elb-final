import {
  UserContentWrapper,
  UserPaginationContainer,
  UserPostsFilter,
  UserPostViewModal,
} from "@/components";
import { toast } from "@/components/ui/use-toast";
import UserPageHeader from "@/components/users/globals/UserPageHeader";
import customFetch from "@/utils/customFetch";
import { Link, redirect, useLoaderData, useLocation } from "react-router-dom";
import productImg from "@/assets/website/img/job/camera.jpg";
import { encParam, postStatusBadge, serialNo } from "@/utils/functions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight, Eye, Pencil } from "lucide-react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setEditPost, showPostDetailsModal } from "@/features/postSlice";

const UserPostList = () => {
  document.title = `List of Posts | ${import.meta.env.VITE_APP_TITLE}`;
  const { currentUser } = useSelector((store) => store.currentUser);
  const dispatch = useDispatch();
  const { posts, meta } = useLoaderData();
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");

  return (
    <UserContentWrapper>
      <UserPageHeader text={`list of posts`} />
      <UserPostsFilter />
      <div className="w-full flex flex-row">
        <table className="w-full dashboard-table">
          <thead className="pb-3">
            <tr>
              <th scope="col">Sl. No.</th>
              <th scope="col" className="ps-4">
                Post title
              </th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Posted On</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center font-medium tracking-widest"
                >
                  NO DATA FOUND
                </td>
              </tr>
            ) : (
              posts.map((post, index) => {
                const { title, price, is_sold, is_blocked, updated_at } = post;
                const titleLabel =
                  title.length > 40 ? title.substr(0, 40) + ` ...` : title;

                const { badge, label } = postStatusBadge({
                  is_sold,
                  is_blocked,
                });
                // post.images[0].image_path
                const coverImg = post.images.find(
                  (img) => img.is_cover === true
                );
                const postImg =
                  coverImg?.image_path || post.images[0].image_path;

                return (
                  <tr key={post.id}>
                    <td>{serialNo(page) + index}.</td>
                    <td>
                      <div className="d-flex gap-3 align-items-center project-name">
                        <div className="order-img">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/${postImg}`}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-start items-start space-y-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <h3 className="font-semibold">{titleLabel}</h3>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className="flex flex-row justify-start items-center font-extralight text-sm mt-2 gap-1">
                            <p>{post.cat}</p>
                            <ChevronRight size={12} />
                            <p>{post.subcat}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-dark-200">{price}</td>
                    <td>
                      <span className={`status-badge ${badge}`}>{label}</span>
                    </td>
                    <td className="text-dark-200">
                      {dayjs(new Date(updated_at)).format(`MMM D, YYYY`)}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <Link
                          to={`/user/${currentUser.slug}/posts/${encParam(
                            post.id.toString()
                          )}/edit`}
                          className="dashboard-action-btn"
                        >
                          <Pencil className="text-muted" size={20} />
                        </Link>
                        <button
                          className="dashboard-action-btn"
                          onClick={() => {
                            dispatch(showPostDetailsModal());
                            dispatch(setEditPost(post?.id));
                          }}
                        >
                          <Eye className="text-muted" size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <UserPostViewModal />

      {meta.totalRecords > 10 && (
        <UserPaginationContainer
          totalPages={meta.totalPages}
          currentPage={meta.currentPage}
        />
      )}
    </UserContentWrapper>
  );
};
export default UserPostList;

// Loader function starts ------
export const loader =
  (store) =>
  async ({ request }) => {
    const { currentUser } = store.getState().currentUser;
    const search = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    let id = "";
    if (!currentUser.id) {
      const user = await customFetch.get(`/auth/current-user`);
      id = user.data.data.rows[0].id;
    } else {
      id = currentUser.id;
    }

    try {
      const response = await customFetch.get(`/users/${id}/posts`, {
        params: {
          page: search.page || "",
          status: search.s || "",
        },
      });
      const posts = response.data.data.rows;
      const meta = response.data.meta;
      return { posts, meta };
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong!" });
      console.log(error);
      return redirect(`/`);
    }
  };
