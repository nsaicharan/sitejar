import ReactPaginate from 'react-paginate';

function Pagination({
  totalBookmarks,
  bookmarksPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalBookmarks / bookmarksPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const lastPage = pageNumbers.at(-1);
  const startResultNum = currentPage * bookmarksPerPage - bookmarksPerPage + 1;
  const endResultNum =
    currentPage === lastPage
      ? currentPage * bookmarksPerPage -
        (currentPage * bookmarksPerPage - totalBookmarks)
      : currentPage * bookmarksPerPage;

  return (
    <div className="mt-10 flex items-center justify-between">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startResultNum}</span>{' '}
          {currentPage === lastPage &&
          totalBookmarks % bookmarksPerPage === 1 ? (
            ''
          ) : (
            <>
              to <span className="font-medium">{endResultNum}</span>{' '}
            </>
          )}
          of <span className="font-medium">{totalBookmarks}</span> bookmarks
        </p>

        <ReactPaginate
          containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
          pageClassName="text-gray-900 hover:bg-gray-50"
          pageLinkClassName="relative inline-flex px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0 focus:z-20"
          activeLinkClassName="bg-indigo-600 text-white [box-shadow:#4f46e5_0_0_0_1px_inset] z-10"
          disabledLinkClassName="cursor-not-allowed"
          previousLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          nextLinkClassName="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          breakLinkClassName="relative inline-flex px-4 py-2 text-sm text-gray-900 font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20"
          breakLabel="..."
          previousLabel={
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          }
          nextLabel={
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          }
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={3}
          onPageChange={(page) => setCurrentPage(page.selected + 1)}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Pagination;
