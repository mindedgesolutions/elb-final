import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { WbSubCategories } from "@/components";
import { Separator } from "@/components/ui/separator";
import { wbSearchCategories } from "@/utils/links";

const WbCategoryModal = ({ show, handleClose }) => {
  const { allCategories } = useSelector((store) => store.categories);

  return (
    <Modal show={show} size="xl" onHide={handleClose}>
      <div className="modal-content">
        <div className="modal-header px-5 py-4 d-flex justify-content-between items-placeholder border-bottom">
          <div>
            <h3 className="text-dark-300 fw-bold text-24">All Categories</h3>
          </div>
          <div>
            <button type="button" onClick={handleClose}>
              <X />
            </button>
          </div>
        </div>
        <div className="modal-body px-5 py-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
                {allCategories
                  .filter((i) => i.parent_id === null)
                  .map((pcat) => {
                    const icon = wbSearchCategories.find(
                      (i) => i.slug === pcat.slug
                    );

                    return (
                      <div key={pcat.id} className="flex flex-col pb-4">
                        <Link
                          to={`/products/all?cat=${pcat.slug}`}
                          className="group flex flex-col pb-2 justify-start text-sm font-medium tracking-normal cursor-pointer"
                          onClick={handleClose}
                        >
                          <span className="flex items-center gap-1">
                            {icon && <icon.icon size={18} />}
                            {pcat.category}
                          </span>
                        </Link>
                        <Separator className="max-w-20 mb-1" />
                        {/* For child menu / sub-menu */}
                        <WbSubCategories
                          parent={pcat.id}
                          pslug={pcat.slug}
                          handleClose={handleClose}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default WbCategoryModal;
