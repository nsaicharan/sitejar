import { signInWithGoogle, auth } from './../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Spinner from './../components/Spinner';
import Link from 'next/link';
import { useBookmarks } from '../contexts/BookmarksContext';
import { useState } from 'react';

function Add() {
  const [user, loading] = useAuthState(auth);
  const [saving, setSaving] = useState(false);
  const { existingCategories, addBookmark } = useBookmarks();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    const { url, title, category, notes } = Object.fromEntries(
      new FormData(e.target)
    );
    await addBookmark({ url, title, category, notes });

    router.push('/');
  }

  if (!loading && !user) {
    signInWithGoogle();
    return;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="mb-8 text-2xl text-slate-900 font-bold">
        Add new bookmark
      </h1>

      {loading && <p>Please wait...</p>}

      {user && (
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit}
          autoFocus
        >
          <label>
            <span className="text-gray-700">URL</span>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="https://example.com"
              name="url"
            />
          </label>

          <label>
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="title"
            />
          </label>

          <label>
            <span className="text-gray-700">Category</span>
            <div className="relative">
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="category"
                autoComplete="off"
                list="categoriesList"
              />
              <span className="absolute top-0.5 bottom-0.5 right-0.5 w-10 bg-white"></span>
            </div>
          </label>
          <datalist id="categoriesList">
            {Object.keys(existingCategories).map((category) => (
              <option key={category} value={category} />
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

          <div className="mt-1.5 flex gap-5">
            <button className="py-[9px] px-4 rounded bg-indigo-600 text-white text-center shadow-sm outline-none focus:ring focus:ring-indigo-200">
              {saving ? <Spinner /> : 'Save it'}
            </button>

            <Link
              href="/"
              className="py-2 px-4 rounded text-center text-indigo-600 border border-indigo-600 outline-none focus:ring focus:ring-indigo-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default Add;
