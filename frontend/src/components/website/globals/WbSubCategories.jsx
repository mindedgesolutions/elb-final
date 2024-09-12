import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WbSubCategories = ({ parent, pslug, handleClose }) => {
  const [moreBtn, showMoreBtn] = useState(false);
  const { allCategories } = useSelector((store) => store.categories);
  const categories = allCategories.filter((i) => i.parent_id === parent);
  const showCategories =
    categories.length > 3 ? categories.slice(0, 3) : categories;

  return (
    <div className="flex flex-col items-start">
      {(moreBtn ? categories : showCategories).map((cat) => {
        return (
          <Link
            key={cat.id}
            className="w-[230px]"
            to={`/products/all?cat=${pslug}&scat=${cat.slug}`}
            onClick={handleClose}
          >
            <div className="group flex flex-col p-[6px] rounded-lg justify-start text-sm font-normal hover:font-medium hover:text-purple-800 hover:bg-gray-100 cursor-pointer">
              {cat.category}
            </div>
          </Link>
        );
      })}
      {/* Show more button starts */}
      {categories.length > 3 ? (
        !moreBtn ? (
          <button
            type="button"
            className="mt-2 text-sm text-red-500 hover:font-medium capitalize"
            onClick={() => showMoreBtn(true)}
          >
            Show more ...
          </button>
        ) : (
          <button
            type="button"
            className="mt-1 text-sm text-red-500 hover:font-medium capitalize"
            onClick={() => showMoreBtn(false)}
          >
            Show less ...
          </button>
        )
      ) : null}
      {/* Show more button ends */}
    </div>
  );
};
export default WbSubCategories;
