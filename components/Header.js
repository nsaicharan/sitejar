import Link from 'next/link';

function Header() {
  return (
    <header>
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl">Webmark</a>
        </Link>

        <nav>
          <Link href="/add">
            <a className="py-2 px-4 rounded bg-green-500 text-white">
              Add Link
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
