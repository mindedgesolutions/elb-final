import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hidePostDetailsModal, setEditPost } from "@/features/postSlice";
import { IoMdCloseCircle } from "react-icons/io";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import customFetch from "@/utils/customFetch";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { currencyFormat } from "@/utils/functions";

const UserPostViewModal = () => {
  const dispatch = useDispatch();
  const { postDetailsModal, editId } = useSelector((store) => store.posts);
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    dispatch(hidePostDetailsModal());
    dispatch(setEditPost());
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/users/posts/view/${editId}`);
      setPostDetails(response.data.data.rows[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  let address = postDetails?.address ? postDetails?.address : "";
  address += postDetails?.city + ", " + postDetails?.state;
  const postPrice = currencyFormat().format(postDetails.price);

  useEffect(() => {
    editId && fetchData();
  }, [editId]);

  return (
    <Modal show={postDetailsModal} size="xl" onHide={handleClose}>
      <div className="modal-content">
        <div className="modal-body">
          <div className="bg-white rounded-3 p-xl-0">
            <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
              <h4>{postDetails?.title}</h4>
              <button>
                <IoMdCloseCircle
                  className="text-danger"
                  size={30}
                  onClick={handleClose}
                />
              </button>
            </div>
            <div className="pt-4">
              <div className="row g-4">
                <div className="col-xl-8 col-lg-12">
                  <div className="bg-offWhite p-4 rounded-4">
                    <div>
                      <div className="flex flex-col space-y-1 justify-start items-start">
                        <div>
                          <p className="text-dark-200 fw-bold">
                            {postDetails?.title?.toUpperCase()}
                          </p>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center">
                          <ul className="d-flex gap-1 order-category">
                            <li className="text-dark-200">
                              {postDetails?.category}
                            </li>
                            <li className="text-dark-200">
                              <IoChevronForwardSharp />
                            </li>
                            <li className="text-dark-200">
                              {postDetails?.sub_category}
                            </li>
                          </ul>
                          <div>
                            <p className="text-14 text-dark-200">
                              {postDetails?.created_at &&
                                dayjs(Date(postDetails?.created_at)).format(
                                  "ddd, MMM D, YYYY h:mm A"
                                )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-3 mt-4">
                      <ul className="row row-gap-3 p-3 bg-offWhite rounded-3 m-1">
                        <li className="pe-lg-4 p-2">
                          <p className="fs-6 text-dark-200">
                            {postDetails?.description}
                          </p>
                        </li>
                      </ul>

                      <ul className="row row-gap-3 p-3 rounded-3 m-1">
                        <li className="pe-lg-4 pe-2">
                          <p className="fs-6 text-dark-200">Address</p>
                          <h4 className="text-18 fw-semibold text-dark-300">
                            {address}
                          </h4>
                        </li>
                      </ul>
                      {postDetails?.attributes?.[0].attr_id && (
                        <ul className="row row-gap-3 bg-offWhite row-cols-1 row-cols-md-2 row-cols-lg-2 p-3 rounded-3 m-1">
                          {postDetails?.attributes?.map((attr) => {
                            return (
                              <li key={nanoid()} className="pe-lg-4 pe-2">
                                <p className="fs-6 text-dark-200">
                                  {attr.attr_name}
                                </p>
                                <h4 className="text-18 fw-semibold text-dark-300">
                                  {attr.attr_entry || attr.attr_db_label}
                                </h4>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12">
                  <div className="border p-4 rounded-3">
                    <div className="grid grid-cols-4 gap-3 justify-start items-start">
                      {postDetails?.images?.map((img) => {
                        return (
                          <div key={nanoid()} className="rounded-4">
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/${
                                img.image_path
                              }`}
                              className="img-fluid"
                              alt={postDetails.title}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <ul className="mt-4">
                      <li className="d-flex justify-content-between py-3 border-top">
                        <div className="d-flex gap-3">
                          <FaRegAddressCard className="text-green" size={24} />
                          Price
                        </div>
                        <div>
                          <p>{postPrice}</p>
                        </div>
                      </li>
                      <li className="d-flex justify-content-between py-3 border-top">
                        <div className="d-flex gap-3">
                          <LuWallet className="text-green" size={24} />
                          Total reviews
                        </div>
                        <div>
                          <p className="text-dark-200">25</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default UserPostViewModal;
