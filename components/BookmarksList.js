import Link from 'next/link';
import { useBookmarks } from '../contexts/BookmarksContext';
import Spinner from './Spinner';

function BookmarksList({ filteredBookmarks, bookmarksPerPage, currentPage }) {
  const { bookmarks, deleteBookmark, fetching } = useBookmarks();
  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  const currentBookmarks = filteredBookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );

  if (fetching) {
    return (
      <div className="mt-10 pl-2 text-indigo-600">
        <Spinner />
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <>
        <p className="mt-10 mb-4">You haven&apos;t saved any bookmarks yet.</p>

        <Link
          href="/add"
          className="inline-block py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200"
        >
          Add your first bookmark
        </Link>
      </>
    );
  }

  if (filteredBookmarks.length > 0) {
    return (
      <ul className="mt-10 space-y-3" role="list">
        {currentBookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="py-3 px-4 border rounded md:flex md:items-center"
            data-id={bookmark.id}
          >
            <div className="flex-1 pr-4">
              <Link
                href={bookmark.url}
                className="text-blue-500 underline break-all"
              >
                {bookmark.title || bookmark.url}
              </Link>

              {bookmark.notes && (
                <p
                  className="mt-1.5"
                  dangerouslySetInnerHTML={{
                    __html: bookmark.notes.replaceAll('\n', '<br>'),
                  }}
                ></p>
              )}

              <div className="mt-2.5">
                <span className="inline-block px-2 py-1 rounded text-xs bg-slate-200">
                  {bookmark.category}
                </span>
              </div>
            </div>

            <div className="mt-3 md:mt-0 flex gap-3">
              <Link
                href={`/edit/${bookmark.id}`}
                className="inline-block p-2 rounded text-indigo-600 bg-indigo-200"
                title="Edit"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>

              <button
                className="p-2 rounded text-red-600 bg-red-200"
                onClick={() => deleteBookmark(bookmark.id)}
                title="Delete"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p className="mt-10 ml-1 text-red-500">No search results found</p>;
  }
}

export default BookmarksList;
