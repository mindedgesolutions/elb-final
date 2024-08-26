import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { constructPrevOrNext, constructUrl } from "@/utils/functions";
import { useLocation } from "react-router-dom";

const AdminPagination = ({ totalPages, currentPage }) => {
  const { search, pathname } = useLocation();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  if (totalPages < 2) return null;

  const constructButton = ({ pageNumber, isActive }) => {
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key) => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPageButtons = () => {
    let pages = [];
    // First page : page=1
    pages.push(constructButton({ pageNumber: 1, isActive: currentPage === 1 }));

    // Ellipsis
    if (currentPage > 2) {
      pages.push(constructEllipsis("dots-1"));
    }

    // Active page : page=currentPage
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(constructButton({ pageNumber: currentPage, isActive: true }));
    }

    // Ellipsis
    if (currentPage < totalPages - 1) {
      pages.push(constructEllipsis("dots-2"));
    }

    // Last page : page=totalPages
    pages.push(
      constructButton({
        pageNumber: totalPages,
        isActive: currentPage === totalPages,
      })
    );
    return pages;
  };

  const { prevUrl, nextUrl } = constructPrevOrNext({
    curretPage: currentPage,
    totalPages,
    pathname,
    search,
  });

  return (
    <div className="w-full mt-8">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious to={prevUrl} />
            </PaginationItem>
          )}

          {renderPageButtons()}

          {totalPages > currentPage && (
            <PaginationItem>
              <PaginationNext to={nextUrl} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default AdminPagination;
