import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const WbSubCategories = ({ parent, pslug }) => {
  const [moreBtn, showMoreBtn] = useState(false);
  const { allCategories } = useSelector((store) => store.categories);
  const categories = allCategories.filter((i) => i.parent_id === parent);
  const showCategories =
    categories.length > 3 ? categories.slice(0, 3) : categories;

  return (
    <div className="flex flex-col items-start">
      {(moreBtn ? categories : showCategories).map((cat) => {
        return (
          <Link key={cat.id} to={`/cat/${pslug}/${cat.slug}`}>
            <div className="group flex flex-col justify-start text-xs font-light hover:font-medium hover:text-purple-800 cursor-pointer my-1">
              {cat.category}
            </div>
          </Link>
        );
      })}
      {categories.length > 3 ? (
        !moreBtn ? (
          <button
            type="button"
            className="mt-1 text-[11px] text-red-500 hover:font-medium capitalize"
            onClick={() => showMoreBtn(true)}
          >
            Show more ...
          </button>
        ) : (
          <button
            type="button"
            className="mt-1 text-[11px] text-red-500 hover:font-medium capitalize"
            onClick={() => showMoreBtn(false)}
          >
            Show less ...
          </button>
        )
      ) : null}
    </div>
  );
};
export default WbSubCategories;
