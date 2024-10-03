import { Eye, LinkedinIcon, Loader2, LogIn } from "lucide-react";
import { FaGoogle, FaTwitter } from "react-icons/fa6";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { WbPageBanner, WbPageWrapper } from "@/components";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { Checkbox } from "@/components/ui/checkbox";
import splitErrors from "@/utils/splitErrors";
import customFetch from "@/utils/customFetch";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { setCurrentUser } from "@/features/currentUserSlice";

const socialArray = [
  { icon: LinkedinIcon, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaGoogle, href: "#", size: 24 },
];

const WebsiteLogin = () => {
  document.title = `Sign In | ${import.meta.env.VITE_APP_TITLE}`;
  const [type, setType] = useState("password");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex flex-col p-4 sm:w-full md:w-[500px] mx-auto mb-10 bg-gray-100 rounded-lg">
          <h3 className="text-3xl font-bold tracking-widest">Sign-in</h3>
          <Separator
            className={`flex justify-start items-start w-40 my-4 bg-gray-300`}
          />
          <Form method="post" autoComplete="off">
            <div className="flex flex-col">
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="flex flex-row gap-1">
                  <Label
                    htmlFor={`username`}
                    className="capitalize text-[16px] tracking-wide text-gray-700"
                  >
                    username
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="flex h-10 w-full rounded-sm border-[1px] bg-background p-2 text-sm focus:outline-none"
                  autoFocus={true}
                  placeholder="johndoe@test.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="flex flex-row gap-1">
                  <Label
                    htmlFor={`password`}
                    className="capitalize text-[16px] tracking-wide text-gray-700"
                  >
                    password
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex justify-center items-center relative">
                  <input
                    type={type}
                    name="password"
                    id="password"
                    className="flex h-10 w-full rounded-sm border-[1px] bg-background p-2 text-sm focus:outline-none"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    className="p-2 absolute right-2"
                    onClick={() =>
                      setType(type === "password" ? "text" : "password")
                    }
                  >
                    <Eye size={18} className="text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mt-1">
                <div className="flex gap-2 justify-center items-center">
                  <Checkbox
                    id="remember"
                    name="remember"
                    className={`border-fuchsia-500 data-[state=checked]:bg-fuchsia-500`}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to={`/forgot-password`}
                  className="capitalize text-sm tracking-wider text-fuchsia-500 hover:text-fuchsia-400"
                >
                  Forgot password
                </Link>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 mt-4">
                <button
                  type="submit"
                  className="w-btn-secondary-lg flex gap-[10px] border font-normal border-white px-8 py-3 text-[15px] tracking-wide capitalize"
                >
                  {isSubmitting ? "submitting ..." : "sign in"}
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn size={16} className="font-normal" />
                  )}
                </button>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 my-4">
                <Separator className={`w-40`} />
                <span className="text-xs">OR</span>
                <Separator className={`w-40`} />
              </div>
              <div className="flex flex-row w-52 mx-auto justify-between items-center">
                {socialArray.map((social) => {
                  return (
                    <button
                      type="button"
                      key={nanoid()}
                      className="p-3 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 hover:text-fuchsia-500"
                    >
                      <social.icon size={28} href={social.href} />
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center items-center">
                <p className="text-sm font-normal tracking-wider mt-4 text-gray-700">
                  Not a member?{" "}
                  <Link
                    to={`/sign-up`}
                    className="text-fuchsia-500 font-medium hover:text-fuchsia-400"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WebsiteLogin;

// Action function starts ------
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post(`/auth/login`, data);
      const title = `Welcome ${response.data.data.first_name.toUpperCase()} ${response.data.data.last_name.toUpperCase()}`;

      store.dispatch(setCurrentUser(response.data.data));

      toast({ title: title, description: `Happy surfing!!` });
      return redirect(`/`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

// Loader function starts ------
export const loader = async () => {
  try {
    const status = await customFetch.get(`/auth/login-status`);
    if (status.data.status) {
      return redirect(`/`);
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect(`/`);
  }
};
