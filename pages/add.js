import { useRouter } from 'next/router';
import Spinner from './../components/Spinner';
import Link from 'next/link';
import { useBookmarks } from '../contexts/BookmarksContext';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Layout from './../components/Layout';

function Add({ user }) {
  const { status } = useSession();
  const [saving, setSaving] = useState(false);
  const { existingCategories, addBookmark } = useBookmarks();
  const router = useRouter();
  const { url, title, description } = router.query;

  useEffect(() => {
    if (!user) signIn('google');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    const { url, title, category, description } = Object.fromEntries(
      new FormData(e.target)
    );

    if (!url && !title && !description) {
      setSaving(false);
      alert('Please fill at least one field out of URL, Title, Description.');
      return;
    }

    await addBookmark({ url, title, category, description });
    router.push('/view');
  }

  return (
    <Layout user={user}>
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="mb-8 text-2xl text-slate-900 font-bold">
          Add new bookmark
        </h1>

        {status !== 'loading' && user ? (
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
                defaultValue={url}
              />
            </label>

            <label>
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="title"
                defaultValue={title}
              />
            </label>

            <label>
              <span className="text-gray-700">Description</span>
              <textarea
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                name="description"
                defaultValue={description}
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

            <div className="mt-1.5 flex gap-5">
              <button className="flex py-[9px] px-4 rounded bg-indigo-600 text-white text-center shadow-sm outline-none focus:ring focus:ring-indigo-200">
                {saving ? <Spinner /> : 'Save it'}
              </button>

              <Link
                href="/view"
                className="py-2 px-4 rounded text-center text-indigo-600 border border-indigo-600 outline-none focus:ring focus:ring-indigo-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 pl-2 text-indigo-600">
            <Spinner />
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const user = session ? session.user.id : null;

  return {
    props: { user },
  };
};

export default Add;
