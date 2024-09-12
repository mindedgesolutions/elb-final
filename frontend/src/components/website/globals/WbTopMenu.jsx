import { WbCategoryModal } from "@/components";
import { Button } from "@/components/ui/button";
import { wbSearchCategories } from "@/utils/links";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const WbTopMenu = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-none d-xl-block secondary-nav-wrapper mt-3">
      <div className="container">
        <div className="position-relative">
          <nav className="secondary-nav-container position-absolute w-100 start-0 z-3">
            <ul className="secondary-nav d-flex justify-content-between align-items-center">
              <Link to={`/products/all`} className="text-decoration-none">
                <li>All</li>
              </Link>
              {wbSearchCategories?.map((cat) => {
                return (
                  <Link
                    key={cat.id}
                    to={`/products/all?cat=${cat.slug}`}
                    className="text-decoration-none"
                  >
                    <li>{cat.category}</li>
                  </Link>
                );
              })}
              <li>
                <Button
                  type="button"
                  variant="link"
                  className="group w-10 h-10 p-0 rounded-full text-white border border-white transition duration-150 hover:bg-white"
                  onClick={handleOpenModal}
                >
                  <EllipsisVertical className="group-hover:text-purple-800" />
                </Button>
                <WbCategoryModal
                  show={showModal}
                  handleClose={handleCloseModal}
                  title="All Categories"
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default WbTopMenu;
