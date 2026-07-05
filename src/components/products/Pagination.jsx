"use client";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  setFilter,
}) {
  const goTo = (page) => {
    setFilter("page", page, { fetch: true });
  };

  return (
    <div className="flex items-center justify-center gap-3 px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm ">
      {}
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 text-sm hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded disabled:opacity-40"
      >
        Prev
      </button>

      {}
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {}
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 hover:cursor-pointer hover:bg-gray-300 text-sm bg-gray-200 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
