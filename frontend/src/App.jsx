import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Elb from "@/pages";
import { store } from "./store";

// Actions ------
import { action as loginAction } from "@/pages/admin/auth/AdminLogin";

// Loaders ------
import { loader as adminLayoutLoader } from "@/pages/admin/AdminLayout";
import { loader as websiteLayoutLoader } from "@/pages/website/WebsiteLayout";
import { loader as editFormFieldLoader } from "@/pages/admin/masters/AdminFormFieldEdit";
import { loader as wbHomeLoader } from "@/pages/website/WebsiteHome";
import { loader as productLoader } from "@/pages/website/WebsiteProductsPage";
import { loader as singleProductLoader } from "@/pages/website/WebsiteSingleProductPage";

const router = createBrowserRouter([
  // Website unprotected routes start ------
  {
    path: `/`,
    element: <Elb.WebsiteLayout />,
    loader: websiteLayoutLoader(store),
    children: [
      { index: true, element: <Elb.WebsiteHome />, loader: wbHomeLoader },
      { path: `sign-in`, element: <Elb.WebsiteLogin /> },
      { path: `sign-up`, element: <Elb.WebsiteRegister /> },
      { path: `cat/:category/:subcategory?`, element: <Elb.WebsiteCategory /> },
      { path: `search`, element: <Elb.WebsiteSearch /> },
      { path: `sellers`, element: <Elb.WebsiteSellers /> },
      { path: `seller/:slug`, element: <Elb.WebsiteSeller /> },
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
    ],
  },
  // Website unprotected routes end ------

  // User protected routes start ------
  {
    path: `/:slug`,
    element: <Elb.UserLayout />,
    children: [
      { path: `dashboard`, element: <Elb.UserDashboard /> },
      { path: `posts`, element: <Elb.UserPostList /> },
      { path: `posts/add`, element: <Elb.UserPostAdd /> },
      { path: `posts/edit/:id`, element: <Elb.UserPostEdit /> },
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
    ],
  },
  // Admin routes end ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
