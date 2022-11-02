import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { signInWithGoogle } from './../utils/firebase';
import { useRouter } from 'next/router';
import Spinner from './Spinner';

function Header() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  async function handleAuth() {
    if (user) {
      await router.push('/');
      auth.signOut();
    } else {
      signInWithGoogle();
    }
  }

  return (
    <header className="py-3 shadow-sm border-b border-slate-900/10">
      <nav className="max-w-7xl mx-auto px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl text-slate-900">Webmark</a>
        </Link>

        <div className="flex gap-5">
          {user && router.pathname !== '/add' && (
            <Link href="/add">
              <a className="inline-block py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200">
                Add a bookmark
              </a>
            </Link>
          )}

          <button
            className="py-2 px-4 rounded text-indigo-600 border border-indigo-600 outline-none focus:ring focus:ring-indigo-200"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? <Spinner /> : user ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
