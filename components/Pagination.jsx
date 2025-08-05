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
    <div className="mt-12 flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-slate-700 hover:border-purple-500"
      >
        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>

      {page > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-700/50 transition-all duration-300 border border-slate-700 hover:border-purple-500"
          >
            1
          </button>
          {page > 4 && <span className="px-2 py-2 text-gray-400">...</span>}
        </>
      )}

      {getPageNumbers().map((pg) => (
        <button
          key={pg}
          onClick={() => onPageChange(pg)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 border ${
            pg === page
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold border-purple-500 shadow-lg"
              : "bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-700/50 border-slate-700 hover:border-purple-500"
          }`}
        >
          {pg}
        </button>
      ))}

      {page < totalPages - 2 && (
        <>
          {page < totalPages - 3 && (
            <span className="px-2 py-2 text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-700/50 transition-all duration-300 border border-slate-700 hover:border-purple-500"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-sm text-white hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-slate-700 hover:border-purple-500"
      >
        Next
        <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
