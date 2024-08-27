import loginBg from "@/assets/login-bg.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.svg";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { FormInput, SubmitBtn } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import splitErrors from "@/utils/splitErrors";
import customFetch from "@/utils/customFetch";
import { toast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  document.title = `Admin Sign In | ${import.meta.env.VITE_APP_TITLE}`;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center grid-flow-col">
      <div className="col-span-1 p-4 lg:p-8 flex flex-col justify-center gap-8">
        <img src={logo} alt={import.meta.env.VITE_APP_TITLE} className="h-7" />
        <Card className="w-full bg-muted">
          <CardHeader>
            <CardTitle className="text-xl text-center capitalize">
              Admin login
            </CardTitle>
          </CardHeader>
          <Form method="post">
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormInput
                  label={"username"}
                  name={"username"}
                  placeholder={"Your username"}
                  required={true}
                  type={"text"}
                />
                <div className="flex flex-col space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Link
                      to={`/forgot-password`}
                      className="text-green-600 text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" name="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="reset" variant="outline">
                Cancel
              </Button>
              <SubmitBtn
                label="Login"
                className={`bg-green-500 hover:bg-green-400`}
                isSubmitting={isSubmitting}
              />
            </CardFooter>
          </Form>
        </Card>
      </div>
      <div className="col-span-2 hidden lg:block">
        <img
          src={loginBg}
          alt={import.meta.env.VITE_APP_TITLE}
          className="h-screen object-cover"
        />
      </div>
    </div>
  );
};
export default AdminLogin;

// Action function starts ------
export const action = async ({ request }) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  data = { ...data, remember: data.remember === "on" ? true : false };
  try {
    const response = await customFetch.post(`/auth/login`, data);
    const firstName = response.data.data.first_name;

    toast({ title: `Welcome ${firstName}`, description: "Login successful" });
    return redirect(`/admin/dashboard`);
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return null;
  }
};
