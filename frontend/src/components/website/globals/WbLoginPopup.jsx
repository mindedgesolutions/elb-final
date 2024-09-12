import { SubmitBtn } from "@/components";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { unsetLoginForm } from "@/features/commonSlice";
import { setLoginStatus } from "@/features/currentUserSlice";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WbLoginPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginForm, history, href } = useSelector((store) => store.common);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Modal show={loginForm} size="sm" centered onHide={handleClose}>
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
                <input
                  type="password"
                  className="flex h-10 w-full rounded-md border-[1px] bg-background px-2 py-2 text-sm"
                  name="password"
                  id="password"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex gap-2">
          <SubmitBtn
            label="login"
            className={`w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-orange-500 px-4 py-3 text-[15px] tracking-wide capitalize`}
            isLoading={isLoading}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default WbLoginPopup;
