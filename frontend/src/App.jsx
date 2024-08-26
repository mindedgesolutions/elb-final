import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Elb from "@/pages";

// Actions ------
import { action as loginAction } from "@/pages/admin/auth/AdminLogin";

const router = createBrowserRouter([
  // Website unprotected routes start ------
  {
    path: `/`,
    element: <Elb.WebsiteLayout />,
    children: [
      { index: true, element: <Elb.WebsiteHome /> },
      { path: `sign-in`, element: <Elb.WebsiteLogin /> },
      { path: `sign-up`, element: <Elb.WebsiteRegister /> },
      { path: `:category/:subcategory?`, element: <Elb.WebsiteCategory /> },
      { path: `search`, element: <Elb.WebsiteSearch /> },
      { path: `seller/:slug`, element: <Elb.WebsiteSeller /> },
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
    children: [
      { path: `dashboard`, element: <Elb.AdminDashboard /> },
      { path: `settings`, element: <Elb.AdminMasters /> },
      { path: `form-builder`, element: <Elb.AdminFormBuilder /> },
      { path: `users`, element: <Elb.AdminUsers /> },
      { path: `posts`, element: <Elb.AdminPosts /> },
    ],
  },
  // Admin routes end ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
