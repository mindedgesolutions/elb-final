import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";

const UserPaginationContainer = ({ totalPages, currentPage }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButtons = ({ pageNum, activeClass }) => {
    return (
      <li
        key={nanoid()}
        className={`custom-page-item page-item ${activeClass && "active"}`}
      >
        <button
          type="button"
          onClick={() => handlePageChange(pageNum)}
          className={`custom-page-link page-link`}
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
        <li key="dots-1" className="custom-page-item page-item">
          <button type="button" className="custom-page-link page-link">
            ...
          </button>
        </li>
      );
    }
    // One before current page --
    if (currentPage !== 1 && currentPage !== 2) {
      currentPage &&
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
        <li key="dots-2" className="custom-page-item page-item">
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
    <div className="w-full flex flex-row justify-end items-center mt-4">
      <nav aria-label="Page navigation example">
        <ul className="custom-pagination pagination">
          <li className="custom-page-item page-item flex justify-center items-center">
            <button
              type="button"
              className="focus:outline-transparent"
              onClick={() => {
                let prevPage = currentPage - 1;
                if (prevPage < 1) prevPage = 1;
                handlePageChange(prevPage);
              }}
            >
              Previous
            </button>
          </li>

          {renderPageButtons()}

          <li className="custom-page-item page-item flex justify-center items-center">
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => {
                let prevPage = currentPage + 1;
                if (prevPage >= totalPages) prevPage = totalPages;
                handlePageChange(prevPage);
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default UserPaginationContainer;
