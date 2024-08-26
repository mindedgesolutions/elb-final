import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { nanoid } from "nanoid";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPagination = ({ totalPages, currentPage }) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButtons = ({ pageNum, activeClass }) => {
    return (
      <PaginationItem key={nanoid()}>
        <PaginationLink onClick={() => handlePageChange(pageNum)} isActive>
          {pageNum}
        </PaginationLink>
      </PaginationItem>
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
        <PaginationItem key={nanoid()}>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
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
        <PaginationItem key={nanoid()}>
          <PaginationLink>...</PaginationLink>
        </PaginationItem>
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
    <div className="w-full mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                let prevPage = currentPage - 1;
                if (prevPage < 1) prevPage = 1;
                handlePageChange(prevPage);
              }}
            />
          </PaginationItem>
          {renderPageButtons()}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                let prevPage = currentPage + 1;
                if (prevPage >= totalPages) prevPage = totalPages;
                handlePageChange(prevPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default AdminPagination;
