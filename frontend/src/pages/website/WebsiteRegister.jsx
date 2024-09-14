import { WbPageBanner, WbPageWrapper } from "@/components";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Eye, Loader2, MoveRight } from "lucide-react";
import { useState } from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";

const WebsiteRegister = () => {
  document.title = `Join the Family | ${import.meta.env.VITE_APP_TITLE}`;
  const [type, setType] = useState("password");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <WbPageBanner />
      <WbPageWrapper>
        <div className="flex flex-col p-4 sm:w-full md:w-[500px] mx-auto mb-10 bg-gray-100 rounded-lg">
          <h3 className="text-3xl font-bold tracking-widest">
            Join the Family
          </h3>
          <Separator
            className={`flex justify-start items-start w-40 my-4 bg-gray-300`}
          />
          <Form method="post" autoComplete="off">
            <div className="flex flex-col">
              <div className="flex flex-row gap-4 mb-2">
                <div className="basis-1/2 flex flex-col space-y-1.5">
                  <div className="flex flex-row gap-1">
                    <Label
                      htmlFor={`firstName`}
                      className="capitalize text-[16px] tracking-wide text-gray-700"
                    >
                      first name
                    </Label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="flex h-10 w-full rounded-md bg-background px-2 py-2 text-sm"
                    autoFocus={true}
                  />
                </div>
                <div className="basis-1/2 flex flex-col space-y-1.5">
                  <div className="flex flex-row gap-1">
                    <Label
                      htmlFor={`lastName`}
                      className="capitalize text-[16px] tracking-wide text-gray-700"
                    >
                      last name
                    </Label>
                    <span className="text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="flex h-10 w-full rounded-md bg-background px-2 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="flex flex-row gap-1">
                  <Label
                    htmlFor={`email`}
                    className="capitalize text-[16px] tracking-wide text-gray-700"
                  >
                    email
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="flex h-10 w-full rounded-md bg-background px-2 py-2 text-sm"
                />
              </div>
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="flex flex-row gap-1">
                  <Label
                    htmlFor={`mobile`}
                    className="capitalize text-[16px] tracking-wide text-gray-700"
                  >
                    mobile
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className="flex h-10 w-full rounded-md bg-background px-2 py-2 text-sm"
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
                <div className="flex flex-row justify-center items-center relative">
                  <input
                    type={type}
                    name="password"
                    id="password"
                    className="flex h-10 w-full rounded-md bg-background px-2 py-2 text-sm"
                  />
                  <button
                    type="button"
                    className="absolute right-2 p-2"
                    onClick={() =>
                      setType(type === "password" ? "text" : "password")
                    }
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 mt-4">
                <button
                  type="submit"
                  className="w-btn-secondary-lg flex gap-[10px] border font-normal border-white px-8 py-3 text-[15px] tracking-wide capitalize"
                >
                  {isSubmitting ? "submitting ..." : "sign up"}
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <MoveRight size={16} className="font-normal" />
                  )}
                </button>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-sm font-normal tracking-wider mt-8 text-gray-700">
                  Forget it! Go back to{" "}
                  <Link
                    to={`/sign-in`}
                    className="text-fuchsia-500 font-medium hover:text-fuchsia-400"
                  >
                    Sign In
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
export default WebsiteRegister;

// Action function starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post(`/auth/register`, data);
    const title = `Welcome ${response.data.data.rows[0].first_name.toUpperCase()} ${response.data.data.rows[0].last_name.toUpperCase()}`;
    toast({
      title: title,
      description: `Welcome to the Family! Happy surfing`,
    });

    return redirect(`/sign-in`);
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
