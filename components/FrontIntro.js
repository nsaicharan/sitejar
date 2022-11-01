import Link from 'next/link';

function FrontIntro() {
  return (
    <div className="max-w-[750px] m-auto pt-6 pb-10">
      <h1 className="text-4xl font-bold text-slate-900">
        Found an useful site that you might need later, but don't want to
        clutter your browser bookmarks?
      </h1>
      <p className="mt-7 text-xl">
        Enter Webmark. Save all the interesting links you come across while
        browsing and find them later when you actually need it.
      </p>
      <p className="mt-9">
        <Link href="/add">
          <a className="my-1 inline-block py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200">
            Start saving now
          </a>
        </Link>{' '}
        or drag this{' '}
        <a
          className="my-1 inline-block py-[7px] px-3 rounded border border-dashed border-indigo-600 bg-indigo-50 text-indigo-600"
          href="javascript:(function(){alert('hi')})()"
        >
          Webmark
        </a>{' '}
        bookmarklet to your bookmarks bar and click it whenever you want to save
        something.
      </p>
    </div>
  );
}

export default FrontIntro;
