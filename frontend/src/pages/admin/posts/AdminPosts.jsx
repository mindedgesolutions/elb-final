import { AdminPageLayout, AdminSearchPosts, PageHeader } from "@/components";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AdminPosts = () => {
  document.title = `List of All Posts | ${import.meta.env.VITE_APP_TITLE}`;

  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get("page");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/posts/admin`, {
        params: {
          page: page || "",
          search: queryString.get("s") || "",
          category: queryString.get("c") || "",
        },
      });
      console.log(response.data.data.rows);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, queryString.get("s"), queryString.get("c")]);

  return (
    <>
      <PageHeader main={`List of all posts`} />
      <AdminPageLayout>
        <AdminSearchPosts />
      </AdminPageLayout>
    </>
  );
};
export default AdminPosts;
