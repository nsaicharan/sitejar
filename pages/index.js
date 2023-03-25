import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <section className="m-auto max-w-3xl lg:max-w-full lg:flex lg:items-center lg:gap-7 xl:gap-10">
      <div className="mb-11 lg:mb-0 lg:w-2/5 lg:order-1">
        <Image
          className="mx-auto max-w-sm w-full lg:max-w-full"
          src="/browsing.svg"
          width="569"
          height="478"
          priority
          alt=""
        />
      </div>

      <div className="lg:flex-1">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-slate-900">
          Found a useful site that you might need later, but don&apos;t want to
          clutter your browser bookmarks?
        </h1>
        <p className="mt-7 text-xl">
          Enter Sitejar. Save all the interesting links you come across while
          browsing and find them later when you actually need it.
        </p>
        <p className="mt-9">
          <Link
            href="/add"
            className="my-1 inline-block py-2 px-4 rounded text-white bg-indigo-600 outline-none focus:ring focus:ring-indigo-200"
          >
            Start saving now
          </Link>{' '}
          or drag this{' '}
          <a
            className="my-1 inline-block py-[7px] px-3 rounded border border-dashed border-current bg-indigo-50 text-indigo-600"
            href="javascript:void(window.location.href='https://sitejar.vercel.app/add?url='+document.URL+'&title='+document.title)"
          >
            Sitejar
          </a>{' '}
          bookmarklet to your bookmarks bar and click it whenever you want to
          save something.
        </p>
      </div>
    </section>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: '/view',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
