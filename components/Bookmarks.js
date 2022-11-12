import Link from 'next/link';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from './../utils/firebase';
import { useState, useEffect } from 'react';

function Bookmarks({ user }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  async function getBookmarks() {
    const collectionRef = collection(db, `users/${user.email}/bookmarks`);
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookmarks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFetching(false);
    });
    return unsubscribe;
  }

  useEffect(() => {
    getBookmarks();
  }, []);

  function handleDelete(e) {
    if (window.confirm('Are you sure you want to delete?')) {
      const id = e.target.closest('li').dataset.id;
      const docRef = doc(db, `users/${user.email}/bookmarks/${id}`);
      deleteDoc(docRef);
    }
  }

  function handleChange(e) {
    setSearchTerm(e.target.value.trim().replace(/\s+/g, ' ').toLowerCase());
  }

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.url.toLowerCase().includes(searchTerm) ||
      b.notes.toLowerCase().includes(searchTerm)
  );

  function renderBookmarks() {
    if (fetching) return;

    if (bookmarks.length > 0) {
      return (
        <ul className="mt-7 space-y-3" role="list">
          {filteredBookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="flex flex-col items-start py-3 px-4 shadow space-y-2"
              data-id={bookmark.id}
            >
              <Link href={bookmark.url} className="text-blue-500 underline">
                {bookmark.url}
              </Link>

              {bookmark.notes && <p>{bookmark.notes}</p>}

              <div className="text-sm">[{bookmark.category}]</div>

              <div className="flex gap-3">
                <button
                  className="px-1.5 rounded text-sm text-red-600 bg-red-200"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <Link
                  href={{
                    pathname: `/edit/${bookmark.id}`,
                    query: bookmark,
                  }}
                  as={`/edit/${bookmark.id}`}
                  className="px-1.5 rounded text-sm text-indigo-600 bg-indigo-200"
                >
                  Edit
                </Link>
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
    <section className="w-full max-w-2xl mx-auto self-stretch">
      <h1 className="text-2xl text-slate-900 font-bold">Your bookmarks</h1>

      <input
        type="search"
        className="mt-6 w-full rounded-md border-gray-300 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name="url"
        placeholder="Search..."
        aria-label="Search"
        onChange={handleChange}
      />

      {renderBookmarks()}
    </section>
  );
}

export default Bookmarks;
