import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dataLength: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
  dataLength = 0,
  startIndex = 0,
  endIndex = 0,
  itemsPerPage,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }
    let i: number;
    for (i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  return (
    <div className="mt-4 flex items-center bg-white justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center gap-2 flex-wrap max-sm:items-center max-sm:justify-center max-sm:flex-col-reverse text-center justify-between">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{startIndex ? startIndex : ""}</span> to{" "}
          <span className="font-medium">{endIndex ? endIndex : ""}</span> of{" "}
          <span className="font-medium">{dataLength ? dataLength : ""}</span>{" "}
          results
        </p>
        <nav
          className={`isolate  -space-x-px rounded-md shadow-sm ${
            itemsPerPage !== undefined && itemsPerPage <= dataLength
              ? "inline-flex"
              : "hidden"
          }`}
          aria-label="Pagination"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <FaAngleLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
              >
                ...
              </span>
            ) : (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(Number(pageNumber))}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === pageNumber
                    ? "z-10 bg-primary text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <FaAngleRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
