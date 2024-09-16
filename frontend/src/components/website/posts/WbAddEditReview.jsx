import { SubmitBtn } from "@/components";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { Star } from "lucide-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

const WbAddEditReview = ({ openModal, setOpenModal }) => {
  const { product } = useLoaderData();
  const postId = product.master.rows[0].id;
  const sellerId = product.master.rows[0].seller_id;
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleClose = () => {
    setOpenModal(false);
    setRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, rating: rating, sellerId: sellerId };
    try {
      await customFetch.post(`/posts/add-review/${postId}`, data);
      setIsLoading(false);
      toast({
        title: "Review added",
        description: "Your review await admin approval",
      });
      setOpenModal(false);
      setRating(0);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <Modal show={openModal} centered onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h3 className="text-lg font-medium text-gray-800">
            Add a review for this product
          </h3>
        </Modal.Title>
      </Modal.Header>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row row-cards">
            <div className="mb-3 col-md-12 mt-0 pt-0">
              <Label>Give the product a rating</Label>
              <section className="flex gap-1">
                {Array.from({ length: 5 }, (_, index) => {
                  const value = index + 1;
                  const fill = value <= rating ? "fill-yellow-400" : null;

                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setRating(value)}
                    >
                      <Star size={24} className={`text-yellow-400 ${fill}`} />
                    </button>
                  );
                })}
              </section>
            </div>
            <div className="mb-3 col-md-12 mt-0 pt-0">
              <Label>Leave your review here</Label>
              <textarea
                name="review"
                id="review"
                className="flex min-h-[80px] w-full rounded-sm border-1 border-input bg-background px-2 py-2 text-sm ring-offset-background"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
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
export default WbAddEditReview;
