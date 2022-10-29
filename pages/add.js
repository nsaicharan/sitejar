import Header from '../components/Header';
import { useState } from 'react';
import { signInWithGoogle, auth, db } from './../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function Add() {
  const [existingCategories, setExistingCategories] = useState(['abc', '123']);
  const [user, loading] = useAuthState(auth);

  async function handleSubmit(e) {
    e.preventDefault();

    const { url, category, notes } = Object.fromEntries(new FormData(e.target));

    const collectionRef = collection(db, `users/${user.email}/bookmarks`);
    await addDoc(collectionRef, {
      url,
      category,
      notes,
      createdAt: serverTimestamp(),
    });

    return router.push('/');
  }

  if (!loading && !user) {
    signInWithGoogle();
    return;
  }

  return (
    <>
      <Header />

      <div className="max-w-xl px-4 mx-auto mt-12 mb-8">
        <h2 className="mb-8 text-2xl font-bold">Add new bookmark</h2>

        {loading && <p>Please wait...</p>}

        {user && (
          <form
            action="/add"
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit}
          >
            <label>
              <span className="text-gray-700">URL</span>
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="https://example.com"
                name="url"
                required
              />
            </label>

            <label>
              <span className="text-gray-700">Category</span>
              <div className="relative">
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  name="category"
                  list="categoriesList"
                />
                <span className="absolute top-0.5 bottom-0.5 right-0.5 w-10 bg-white"></span>
              </div>
            </label>
            <datalist id="categoriesList">
              {existingCategories.map((category, i) => (
                <option key={i} value={category} />
              ))}
            </datalist>

            <label>
              <span className="text-gray-700">Additional Notes</span>
              <textarea
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                name="notes"
              />
            </label>

            <button className="mt-[6px] py-[9px] px-4 rounded bg-indigo-600 text-white shadow-sm outline-none focus:ring focus:ring-indigo-200">
              Save
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Add;
