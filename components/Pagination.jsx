// components/Pagination.jsx
import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxVisible = 5;
    const pages = [];

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {page > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            1
          </button>
          {page > 4 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {getPageNumbers().map((pg) => (
        <button
          key={pg}
          onClick={() => onPageChange(pg)}
          className={`px-3 py-1 rounded ${
            pg === page
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {pg}
        </button>
      ))}

      {page < totalPages - 2 && (
        <>
          {page < totalPages - 3 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
