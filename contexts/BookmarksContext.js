import { createContext, useContext, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { signInWithCustomToken } from 'firebase/auth';
import { auth, db } from '../utils/firebase';

export const BookmarksContext = createContext();
export const useBookmarks = () => useContext(BookmarksContext);

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [existingCategories, setExistingCategories] = useState({});
  const [fetching, setFetching] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    async function fetchBookmarks() {
      if (!user) return;

      await signInWithCustomToken(auth, user.customToken);

      const collectionRef = collection(db, `users/${user.id}/bookmarks`);
      const q = query(collectionRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookmarksData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const categories = bookmarksData.reduce((accumulator, bookmark) => {
          if (!accumulator[bookmark.category]) {
            accumulator[bookmark.category] = 1;
          } else {
            accumulator[bookmark.category]++;
          }

          return accumulator;
        }, {});

        const sortedCategories = Object.keys(categories)
          .sort()
          .reduce((accumulator, key) => {
            accumulator[key] = categories[key];

            return accumulator;
          }, {});

        setBookmarks(bookmarksData);
        setExistingCategories(sortedCategories);
        setFetching(false);
      });

      return unsubscribe;
    }

    fetchBookmarks();
  }, [user]);

  async function deleteBookmark(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      const docRef = doc(db, `users/${user.id}/bookmarks/${id}`);
      await deleteDoc(docRef);
    }
  }

  async function addBookmark({ url, title, description, category }) {
    const collectionRef = collection(db, `users/${user.id}/bookmarks`);
    let trimmedCategory = category.trim().toLowerCase();
    if (!trimmedCategory || trimmedCategory === 'all')
      trimmedCategory = 'uncategorized';

    await addDoc(collectionRef, {
      url: url.trim(),
      title: title.trim(),
      description: description.trim(),
      category: trimmedCategory,
      createdAt: serverTimestamp(),
    });
  }

  async function updateBookmark({ id, url, title, description, category }) {
    const docRef = doc(db, `users/${user.id}/bookmarks/${id}`);
    let trimmedCategory = category.trim().toLowerCase();
    if (!trimmedCategory || trimmedCategory === 'all')
      trimmedCategory = 'uncategorized';

    await setDoc(
      docRef,
      {
        url: url.trim(),
        title: title.trim(),
        description: description.trim(),
        category: trimmedCategory,
      },
      { merge: true }
    );
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        existingCategories,
        deleteBookmark,
        addBookmark,
        updateBookmark,
        fetching,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
