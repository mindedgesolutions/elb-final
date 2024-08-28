import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { WbFilterCategories, WbFilterLocation } from "@/components";
import { openCategoryModal, openLocationModal } from "@/features/wbSearchSlice";

const WbTopSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [locationLabel, setLocationLabel] = useState(
    searchParams.get("loc") || "Location"
  );
  const [categoryLabel, setCategoryLabel] = useState(
    searchParams.get("cat") || "Category"
  );
  const [enteredSearch, setEnteredSearch] = useState(
    searchParams.get("search") || ""
  );

  const handleSubmit = () => {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="hero-form-wrapper bg-white d-flex position-relative">
          <div>
            <button
              type="button"
              className="form-select shadow-none border-right-grey"
              name="loc"
              onClick={() => dispatch(openLocationModal())}
            >
              {locationLabel}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="form-select shadow-none categorysearch"
              name="cat"
              onClick={() => dispatch(openCategoryModal())}
            >
              {categoryLabel}
            </button>
          </div>
          <div>
            <input
              type="text"
              name="search"
              className="form-control shadow-none"
              placeholder="Search for any service..."
            />
            <button type="submit" className="hero-form-btn position-absolute">
              <Search />
              Search
            </button>
          </div>
        </div>
      </form>
      <WbFilterLocation
        setLocationLabel={setLocationLabel}
        locationLabel={locationLabel}
      />
      <WbFilterCategories
        setCategoryLabel={setCategoryLabel}
        categoryLabel={categoryLabel}
      />
    </>
  );
};
export default WbTopSearch;
