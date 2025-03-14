import React, { useEffect, useState } from "react";

const TablePaginationButtons = ({ table }) => {
  const [currentRange, setCurrentRange] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState();
  const totalPageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;
  const maxButtons = 5; // Display 5 buttons at a time

  // Calculate the range of page numbers to show
  const getPageNumbers = () => {
    const startPage = currentRange * maxButtons;
    const endPage = Math.min(startPage + maxButtons, totalPageCount);

    const pageNumbers = [];
    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (pageIndex) => {
    table.setPageIndex(pageIndex);
  };

  const handleNextRange = () => {
    setCurrentRange(currentRange + 1);
  };

  const handlePrevRange = () => {
    setCurrentRange(Math.max(currentRange - 1, 0));
  };

  const handleNextPage = () => {
    if (currentPage + 1 >= (currentRange + 1) * maxButtons) {
      setCurrentRange(currentRange + 1);
    }
    table.nextPage();
  };
  
  const handlePrevPage = () => {
    if (currentPage - 1 < currentRange * maxButtons) {
      setCurrentRange(Math.max(currentRange - 1, 0));
    }
    table.previousPage();
  };
  

  return (
    <div className="flex items-center gap-2 ">
      <button
        className="border border-gray-200 font-bold text-14 h-8 w-8 flex justify-center items-center"
        onClick={handlePrevPage}
        disabled={!table.getCanPreviousPage()}
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.86015 9.39328L1.14015 5.66661C1.01598 5.5417 0.946289 5.37274 0.946289 5.19661C0.946289 5.02049 1.01598 4.85152 1.14015 4.72661L4.86015 0.999945C4.9534 0.905925 5.07253 0.841805 5.20236 0.815759C5.3322 0.789712 5.46684 0.80292 5.58914 0.853698C5.71143 0.904475 5.81584 0.990523 5.88904 1.10087C5.96224 1.21122 6.00092 1.34086 6.00015 1.47328V8.91994C6.00092 9.05236 5.96224 9.18201 5.88904 9.29235C5.81584 9.4027 5.71143 9.48875 5.58914 9.53953C5.46684 9.5903 5.3322 9.60351 5.20236 9.57747C5.07253 9.55142 4.9534 9.4873 4.86015 9.39328Z"
            fill="black"
          />
        </svg>
      </button>
      {/* Previous button range */}
      {currentRange > 0 && (
        <button
          className="border border-gray-200 font-bold text-14 h-8 w-8 flex justify-center items-center text-text-light-gray"
          onClick={handlePrevRange}
        >
          ...
        </button>
      )}

      {/* Page number buttons */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`border border-gray-200 font-bold text-14 h-8 w-8 flex justify-center items-center ${
            pageNumber === currentPage
              ? "bg-black text-yellow-200"
              : "text-text-light-gray"
          }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}

      {/* Ellipsis or Next button range */}
      {currentRange * maxButtons + maxButtons < totalPageCount && (
        <button
          className="border border-gray-200 font-bold text-14 h-8 w-8 flex justify-center items-center text-text-light-gray"
          onClick={handleNextRange}
        >
          ...
        </button>
      )}
      <button
        className="border border-gray-200 font-bold text-14 h-8 w-8 flex justify-center items-center"
        onClick={handleNextPage}
        disabled={!table.getCanNextPage()}
      >
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.12779e-05 8.91994V1.47328C-0.000758787 1.34086 0.0379226 1.21122 0.111123 1.10087C0.184324 0.990523 0.288728 0.904475 0.411024 0.853698C0.53332 0.80292 0.667968 0.789712 0.7978 0.815759C0.927632 0.841805 1.04677 0.905925 1.14001 0.999945L4.86002 4.72661C4.98419 4.85152 5.05388 5.02049 5.05388 5.19661C5.05388 5.37274 4.98419 5.5417 4.86002 5.66661L1.14001 9.39328C1.04677 9.4873 0.927632 9.55142 0.7978 9.57747C0.667968 9.60351 0.53332 9.5903 0.411024 9.53953C0.288728 9.48875 0.184324 9.4027 0.111123 9.29235C0.0379226 9.18201 -0.000758787 9.05236 1.12779e-05 8.91994Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
};

export default TablePaginationButtons;
