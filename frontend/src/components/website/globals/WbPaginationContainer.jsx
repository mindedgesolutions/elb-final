import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const WbPaginationContainer = () => {
  const { search, pathname } = useLocation();
  const { meta } = useLoaderData();
  const { totalPages, currentPage } = meta;
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButtons = ({ pageNum, activeClass }) => {
    return (
      <li
        key={pageNum}
        className={`custom-page-item page-item ${activeClass && "active"}`}
      >
        <button
          type="button"
          onClick={() => handlePageChange(pageNum)}
          className="custom-page-link page-link outline-none"
        >
          {pageNum}
        </button>
      </li>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // First page --
    pageButtons.push(
      addPageButtons({ pageNum: 1, activeClass: currentPage === 1 })
    );
    // Dots 1 --
    if (currentPage > 3) {
      pageButtons.push(
        <li key="dots-1" className={`custom-page-item page-item`}>
          <button type="button" className="custom-page-link page-link">
            ...
          </button>
        </li>
      );
    }
    // One before current page --
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButtons({
          pageNum: currentPage - 1,
          activeClass: false,
        })
      );
    }
    // Current page --
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButtons({
          pageNum: currentPage,
          activeClass: true,
        })
      );
    }
    // One after current page --
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButtons({
          pageNum: currentPage + 1,
          activeClass: false,
        })
      );
    }
    // Dots 2 --
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <li key="dots-2" className={`custom-page-item page-item`}>
          <button type="button" className="custom-page-link page-link">
            ...
          </button>
        </li>
      );
    }
    pageButtons.push(
      addPageButtons({
        pageNum: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    return pageButtons;
  };

  return (
    <div className="flex justify-content-center items-center mt-3">
      <nav aria-label="Page navigation example">
        <ul className="custom-pagination pagination">
          <li className="custom-page-item page-item">
            <button
              type="button"
              className="custom-page-link page-link"
              onClick={() => {
                let prevPage = currentPage - 1;
                if (prevPage < 1) prevPage = 1;
                handlePageChange(prevPage);
              }}
            >
              <ChevronLeft />
            </button>
          </li>

          {renderPageButtons()}

          <li className="custom-page-item page-item">
            <button
              type="button"
              className="custom-page-link custom-page-item page-link"
              onClick={() => {
                let prevPage = currentPage + 1;
                if (prevPage >= totalPages) prevPage = totalPages;
                handlePageChange(prevPage);
              }}
            >
              <ChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default WbPaginationContainer;
