import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Elb from "@/pages";
import { store } from "./store";

// Actions ------
import { action as loginAction } from "@/pages/admin/auth/AdminLogin";
import { action as registerAction } from "@/pages/website/WebsiteRegister";
import { action as wbLoginAction } from "@/pages/website/WebsiteLogin";

// Loaders ------
import { loader as adminLayoutLoader } from "@/pages/admin/AdminLayout";
import { loader as websiteLayoutLoader } from "@/pages/website/WebsiteLayout";
import { loader as editFormFieldLoader } from "@/pages/admin/masters/AdminFormFieldEdit";
import { loader as wbHomeLoader } from "@/pages/website/WebsiteHome";
import { loader as productLoader } from "@/pages/website/WebsiteProductsPage";
import { loader as singleProductLoader } from "@/pages/website/WebsiteSingleProductPage";
import { loader as sellerProfileLoader } from "@/pages/website/WebsiteSeller";
import { loader as sellerReviewsLoader } from "@/pages/website/WebsiteSellerReviews";
import { loader as sellerProductsLoader } from "@/pages/website/WebsiteSellerProducts";
import { loader as wbLoginLoader } from "@/pages/website/WebsiteLogin";
import { loader as wbRegisterLoader } from "@/pages/website/WebsiteRegister";
import { loader as userLayoutLoader } from "@/pages/website/user/UserLayout";
import { loader as userPostListLoader } from "@/pages/website/user/post/UserPostList";
import { loader as userPostEdit } from "@/pages/website/user/post/UserPostEdit";

const router = createBrowserRouter([
  // Website unprotected routes start ------
  {
    path: `/`,
    element: <Elb.WebsiteLayout />,
    loader: websiteLayoutLoader(store),
    errorElement: <Elb.WebsiteErrorPage />,
    children: [
      {
        index: true,
        element: <Elb.WebsiteHome />,
        loader: wbHomeLoader,
      },
      {
        path: `sign-in`,
        element: <Elb.WebsiteLogin />,
        action: wbLoginAction(store),
        loader: wbLoginLoader,
      },
      {
        path: `sign-up`,
        element: <Elb.WebsiteRegister />,
        action: registerAction,
        loader: wbRegisterLoader,
      },
      { path: `search`, element: <Elb.WebsiteSearch /> },
      { path: `sellers`, element: <Elb.WebsiteSellers /> },
      {
        path: `seller/:slug`,
        element: <Elb.WebsiteSeller />,
        loader: sellerProfileLoader(store),
      },
      {
        path: `products/all`,
        element: <Elb.WebsiteProductsPage />,
        loader: productLoader,
      },
      {
        path: `products/:slug`,
        element: <Elb.WebsiteSingleProductPage />,
        loader: singleProductLoader(store),
      },
      {
        path: `seller/posts/:slug`,
        element: <Elb.WebsiteSellerProducts />,
        loader: sellerProductsLoader(store),
      },
      {
        path: `seller/reviews/:slug`,
        element: <Elb.WebsiteSellerReviews />,
        loader: sellerReviewsLoader(store),
      },
    ],
  },
  // Website unprotected routes end ------

  // User protected routes start ------
  {
    path: `/user/:slug`,
    element: <Elb.UserLayout />,
    loader: userLayoutLoader(store),
    children: [
      { path: `dashboard`, element: <Elb.UserDashboard /> },
      { path: `settings`, element: <Elb.UserProfileSettings /> },
      { path: `change-password`, element: <Elb.UserChangePassword /> },
      {
        path: `posts`,
        element: <Elb.UserPostList />,
        loader: userPostListLoader(store),
      },
      { path: `posts/add`, element: <Elb.UserPostAdd /> },
      {
        path: `posts/:id/edit`,
        element: <Elb.UserPostEdit />,
        loader: userPostEdit(store),
      },
    ],
  },
  // User protected routes end ------

  // Admin routes start ------
  { path: `/admin/login`, element: <Elb.AdminLogin />, action: loginAction },
  { path: `/admin/forgot-password`, element: <Elb.AdminForgotPassword /> },
  { path: `/admin/reset-password`, element: <Elb.AdminResetPassword /> },
  {
    path: `/admin`,
    element: <Elb.AdminLayout />,
    errorElement: <Elb.AdminError />,
    loader: adminLayoutLoader(store),
    children: [
      { path: `dashboard`, element: <Elb.AdminDashboard /> },
      {
        path: `categories`,
        element: <Elb.AdminCategories />,
      },
      {
        path: `form-fields`,
        element: <Elb.AdminFormFields />,
      },
      {
        path: `form-fields/edit/:id`,
        element: <Elb.AdminFormFieldEdit />,
        loader: editFormFieldLoader,
      },
      { path: `users`, element: <Elb.AdminUsers /> },
      { path: `posts`, element: <Elb.AdminPosts /> },
      { path: `post/new`, element: <Elb.AdminNewPost /> },
      { path: `post/reviews`, element: <Elb.AdminPostReviews /> },
    ],
  },
  // Admin routes end ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
