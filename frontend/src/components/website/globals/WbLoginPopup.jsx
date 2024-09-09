import { SubmitBtn } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const WbLoginPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Modal show={false} centered onHide={handleClose}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <div className="text-6xl font-bold py-4">ELB</div>
            <p className="text-sm font-normal tracking-wide text-red-500 pb-2">
              Oops! Looks like you've to log in
            </p>
            <Separator />
            <div className="row row-cards py-4">
              <div className="mb-3 col-md-12 mt-0 pt-0">
                <Label>Username</Label>
                <Input />
              </div>
              <div className="mb-3 col-md-12 mt-0 pt-0">
                <Label>Password</Label>
                <Input />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <SubmitBtn
            label="add review"
            className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-orange-500 px-4 py-3 text-[15px] tracking-wide capitalize`}
            isLoading={isLoading}
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default WbLoginPopup;
