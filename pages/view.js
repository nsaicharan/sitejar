import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useBookmarks } from '../contexts/BookmarksContext';
import Layout from '../components/Layout';
import BookmarksList from '../components/BookmarksList';
import Pagination from '../components/Pagination';

function Bookmarks({ user }) {
  const { bookmarks, existingCategories } = useBookmarks();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarksPerPage] = useState(10);
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
    setCurrentPage(1);
  }

  const filteredBookmarks = bookmarks.filter((b) => {
    const hasTerm =
      b.url.toLowerCase().includes(searchTerm) ||
      b.title.toLowerCase().includes(searchTerm) ||
      b.notes.toLowerCase().includes(searchTerm);

    if (selectedCategory === 'all') {
      return hasTerm;
    }

    return b.category === selectedCategory && hasTerm;
  });

  return (
    <Layout user={user}>
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

        <BookmarksList
          filteredBookmarks={filteredBookmarks}
          bookmarksPerPage={bookmarksPerPage}
          currentPage={currentPage}
        />

        {filteredBookmarks.length > bookmarksPerPage && (
          <Pagination
            totalBookmarks={filteredBookmarks.length}
            bookmarksPerPage={bookmarksPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user.id },
  };
};

export default Bookmarks;
