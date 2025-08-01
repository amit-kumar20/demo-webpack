import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-[#2d8600] text-white rounded disabled:bg-gray-300 hover:bg-[#236b00] transition-colors"
      >
        Previous
      </button>
      <span className="text-[#4b286d] text-sm sm:text-base font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-[#2d8600] text-white rounded disabled:bg-gray-300 hover:bg-[#236b00] transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
