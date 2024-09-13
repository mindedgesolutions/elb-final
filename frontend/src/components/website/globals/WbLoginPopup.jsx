import { SubmitBtn } from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { unsetLoginForm } from "@/features/commonSlice";
import { setLoginStatus } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WbLoginPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginForm, history, href } = useSelector((store) => store.common);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("password");

  const handleClose = () => {
    dispatch(unsetLoginForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post(`/auth/login`, data);
      const firstName = response.data.data.first_name;
      toast({ title: `Welcome ${firstName}`, description: "Login successful" });

      if (history === "seller-page") {
        dispatch(unsetLoginForm());
        navigate(href);
      } else if (history === "wishlist") {
        // call wishlist update API
      }

      dispatch(setLoginStatus(true));
      dispatch(unsetLoginForm());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  const handleRedirect = (href) => {
    dispatch(unsetLoginForm());
    navigate(href);
  };

  const modalClass = "sm:w-full md:w-[350px] sm:p-0 sm:m-0 md:mx-auto";

  return (
    <Modal
      show={loginForm}
      centered
      onHide={handleClose}
      dialogClassName={modalClass}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <div className="text-6xl font-bold py-2">ELB</div>
            <p className="text-sm font-normal tracking-wide text-red-500 pb-2">
              Oops! Looks like you've to log in
            </p>
            <Separator />
            <div className="row row-cards py-4">
              <div className="flex flex-col space-y-2 my-2">
                <Label htmlFor={`username`}>Username</Label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border-[1px] bg-background px-2 py-2 text-sm"
                  name="username"
                  id="username"
                />
              </div>
              <div className="flex flex-col space-y-2 my-2">
                <Label>Password</Label>
                <span className="flex flex-row justify-center items-center">
                  <input
                    type={type}
                    className="flex h-10 w-full rounded-md border-[1px] bg-background px-2 py-2 text-sm relative"
                    name="password"
                    id="password"
                  />
                  <Eye
                    className="text-gray-600 w-9 h-9 px-2 cursor-pointer border-l absolute right-4"
                    onClick={() =>
                      setType(type === "password" ? "text" : "password")
                    }
                  />
                </span>
              </div>
            </div>
          </div>
          <SubmitBtn
            label="login"
            className={`w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-orange-500 px-4 py-3 text-[15px] tracking-wide capitalize`}
            isLoading={isLoading}
          />
          <div className="flex flex-row mt-4 gap-4">
            <Button
              type="button"
              variant="ghost"
              className="basis-1/2 text-sm font-normal text-fuchsia-500 hover:text-fuchsia-600"
              onClick={() => handleRedirect(`/sign-up`)}
            >
              Not a member?
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="basis-1/2 text-sm font-normal text-fuchsia-500 hover:text-fuchsia-600"
              onClick={() => handleRedirect(`/forgot-password`)}
            >
              Forgot password?
            </Button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};
export default WbLoginPopup;
