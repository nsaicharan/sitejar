import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from './Spinner';

function Header() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();

  async function handleAuth() {
    if (user) {
      signOut({ redirect: false });
      router.push('/');
    } else {
      signIn('google');
    }
  }

  return (
    <header className="py-3 shadow-sm border-b border-slate-900/10">
      <nav className="max-w-7xl mx-auto px-5 flex justify-between items-center">
        <Link href="/" className="text-2xl text-slate-900">
          Sitejar
        </Link>

        <div className="flex gap-4 md:gap-5">
          {user && router.pathname !== '/add' && (
            <Link
              href="/add"
              className="py-2 px-3 rounded text-sm text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200 md:px-4 md:text-base"
            >
              Add <span className="sr-only md:not-sr-only">a bookmark</span>
            </Link>
          )}

          <button
            className="flex py-2 px-3 rounded text-sm text-indigo-600 border border-indigo-600 outline-none focus:ring focus:ring-indigo-200 md:px-4 md:text-base"
            onClick={handleAuth}
          >
            {status === 'loading' ? <Spinner /> : user ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
