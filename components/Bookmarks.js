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

  function renderBookmarks() {
    if (fetching) return;

    if (bookmarks.length > 0) {
      return (
        <ul class="my-6 space-y-3" role="list">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="flex flex-col items-start py-3 px-4 shadow space-y-2"
              data-id={bookmark.id}
            >
              <Link href={`${bookmark.url}`}>
                <a className="text-blue-500 underline">{bookmark.url}</a>
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
                <button className="px-1.5 rounded text-sm text-indigo-600 bg-indigo-200">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <>
          <p className="my-4">You currently do not have any saved bookmarks.</p>

          <Link href="/add">
            <a className="inline-block py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200">
              Add a new bookmark
            </a>
          </Link>
        </>
      );
    }
  }

  return (
    <section className="w-full max-w-2xl mx-auto mt-12 mb-8">
      <h1 className="text-2xl text-slate-900 font-bold">Your bookmarks</h1>

      {renderBookmarks()}
    </section>
  );
}

export default Bookmarks;
