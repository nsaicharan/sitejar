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
    <header className="container mx-auto px-5">
      <nav className="mt-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl">Webmark</a>
        </Link>

        <button
          className="py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200"
          onClick={handleAuth}
          disabled={loading}
        >
          {loading ? <Spinner /> : user ? 'Sign Out' : 'Sign In'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
