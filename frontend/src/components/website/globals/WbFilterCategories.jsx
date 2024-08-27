import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { wbSearchCategories } from "@/utils/links";
import {
  closeCategoryModal,
  setSearchCategory,
} from "@/features/wbSearchSlice";

const WbFilterCategories = ({ sategoryLabel, setCategoryLabel }) => {
  const dispatch = useDispatch();
  const { categoryModal, searchCategory } = useSelector(
    (store) => store.wbSearch
  );

  const handleClose = () => {
    dispatch(closeCategoryModal());
  };

  const setCat = (id) => {
    dispatch(setSearchCategory(id));
    dispatch(closeCategoryModal());
  };

  return (
    <Modal show={categoryModal} size="lg" centered onHide={handleClose}>
      <Modal.Body>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {wbSearchCategories.map((i) => {
            return (
              <div
                className="group border border-gray-300 rounded-lg h-32 p-3 flex flex-col justify-center items-center cursor-pointer"
                key={nanoid()}
                onClick={() => {
                  setCat(i.id);
                  setCategoryLabel(i.category);
                }}
              >
                <i.icon
                  className={`font-thin w-6 h-6 mb-4 group-hover:text-purple-500 ${
                    searchCategory === i.id ? "text-purple-500" : null
                  }`}
                />
                <p
                  className={`text-center text-xs font-extralight group-hover:text-purple-500 ${
                    searchCategory === i.id ? "text-purple-500" : null
                  }`}
                >
                  {i.category}
                </p>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default WbFilterCategories;
