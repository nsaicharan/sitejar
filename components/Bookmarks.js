import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useBookmarks } from '../contexts/BookmarksContext';

function Bookmarks() {
  const { bookmarks, existingCategories, deleteBookmark, fetching } =
    useBookmarks();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef();

  const handleKeyPress = useCallback((e) => {
    if (e.key === '/') searchRef.current.focus();
  }, []);
  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => window.removeEventListener('keyup', handleKeyPress);
  }, [handleKeyPress]);

  // if the selectedCategory is no longer present in existingCategories, set SelectedCategory to 'all'
  useEffect(() => {
    if (selectedCategory === 'all') return;

    if (!existingCategories[selectedCategory]) {
      setSelectedCategory('all');
    }
  }, [existingCategories]);

  function handleSearch(e) {
    setSearchTerm(e.target.value.trim().replace(/\s+/g, ' ').toLowerCase());
  }

  const filteredBookmarks = bookmarks.filter((b) => {
    const hasTerm =
      b.url.toLowerCase().includes(searchTerm) ||
      b.notes.toLowerCase().includes(searchTerm);

    if (selectedCategory === 'all') {
      return hasTerm;
    }

    return b.category === selectedCategory && hasTerm;
  });

  function renderBookmarks() {
    if (fetching) return;

    if (bookmarks.length > 0) {
      return (
        <ul className="mt-7 space-y-3" role="list">
          {filteredBookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="py-3 px-4 border rounded md:flex md:items-center "
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
      return (
        <>
          <p className="my-4">You haven't saved any bookmarks yet.</p>

          <Link
            href="/add"
            className="inline-block py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200"
          >
            Add your first bookmark
          </Link>
        </>
      );
    }
  }

  return (
    <section className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl text-slate-900 font-bold">Your bookmarks</h1>

      <div className="mt-6 flex gap-6">
        <div className="flex-1 relative">
          <input
            type="search"
            className="pl-11 w-full rounded-md text-sm md:text-base border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="url"
            placeholder='Search bookmarks (Press "/" to focus)'
            aria-label="Search"
            onChange={handleSearch}
            ref={searchRef}
          />

          <span className="absolute inset-y-0 pl-3.5 flex items-center pointer-events-none">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-5 w-5 fill-slate-500 transition"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </span>
        </div>

        <select
          className="rounded-md border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          title="Category"
          aria-label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">all ({bookmarks.length})</option>
          {Object.keys(existingCategories).map((category) => (
            <option key={category} value={category}>
              {category} ({existingCategories[category]})
            </option>
          ))}
        </select>
      </div>

      {renderBookmarks()}
    </section>
  );
}

export default Bookmarks;
