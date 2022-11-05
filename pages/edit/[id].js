import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth } from '../../utils/firebase';
import { db } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from '../../components/Spinner';
import { signInWithGoogle } from './../../utils/firebase';

function Edit() {
  const [existingCategories, setExistingCategories] = useState(['abc', '123']);
  const router = useRouter();
  const { url, notes, category, id } = router.query;
  const [data, setData] = useState({ url, category, notes });
  const [isSaving, setIsSaving] = useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!url && user) {
      const docRef = doc(db, `users/${user.email}/bookmarks/${id}`);

      getDoc(docRef).then((result) => {
        const { url, notes, category } = result.data();
        setData({ url, category, notes });
      });
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    const docRef = doc(db, `users/${user.email}/bookmarks/${id}`);
    await setDoc(docRef, data, { merge: true });

    router.push('/');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  if (!loading && !user) {
    signInWithGoogle();
    return;
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h1 className="mb-8 text-2xl text-slate-900 font-bold">Edit bookmark</h1>

      <form
        action="#"
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
            value={data.url}
            onChange={handleChange}
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
              value={data.category}
              onChange={handleChange}
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
            value={data.notes}
            onChange={handleChange}
          />
        </label>

        <button className="mt-[6px] py-[9px] px-4 rounded bg-indigo-600 text-white text-center shadow-sm outline-none focus:ring focus:ring-indigo-200">
          {isSaving ? <Spinner /> : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default Edit;
