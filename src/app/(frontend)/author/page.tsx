import { AuthorCardSkeleton } from '@/components/features/Skeletons';
import AuthorCard from '@/components/shared/AuthorCard';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_AUTHORS_QUERY } from '@/sanity/lib/sanityQueries';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export const metadata: Metadata = {
  title: 'Authors',
};

const generatePageRange = (currentPage: number, totalPage: number) => {
  const delta = 2;
  const range = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPage - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) range.unshift('...');
  if (currentPage + delta < totalPage - 1) range.push('...');

  range.unshift(1);
  if (totalPage > 1) range.push(totalPage);

  return range;
};

const AuthorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const pageSize = 4;
  const currentPage = parseInt(page || '1', 10);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const { data } = await sanityFetch({
    query: ALL_AUTHORS_QUERY,
    params: {
      startIndex,
      endIndex,
    },
  });

  if (!data) notFound();

  const authors = data.authors;
  const totalAuthors = data.total;
  const totalPage = Math.ceil(totalAuthors / pageSize);
  const range = generatePageRange(currentPage, totalPage);

  return (
    <Bounded isPadded>
      <PageTitle className="text-center">
        All authors behind our Journals
      </PageTitle>

      <div className="grid grid-cols-2 gap-5">
        {authors.map((a) => (
          <Suspense key={a.slug} fallback={<AuthorCardSkeleton />}>
            <AuthorCard {...a} />
          </Suspense>
        ))}
      </div>

      <div className="flex gap-x-3 justify-center items-center">
        <Button variant="faq" asChild>
          <Link
            href={{
              pathname: '/author',
              query: {
                page: currentPage === 1 ? currentPage : currentPage - 1,
              },
            }}
            className={clsx(
              'flex items-center gap-x-1',
              currentPage === 1
                ? 'pointer-events-none border-brand-black/10 text-brand-black/10'
                : 'pointer-events-auto border-brand-black text-brand-black',
            )}
          >
            <span>
              <MdKeyboardArrowLeft />
            </span>
            <span>Prev</span>
          </Link>
        </Button>

        {range.map((page) => (
          <div key={page}>
            {page === '...' ? (
              <span>...</span>
            ) : (
              <Button asChild variant="faq">
                <Link
                  href={{
                    pathname: 'author',
                    query: {
                      page,
                    },
                  }}
                >
                  {page}
                </Link>
              </Button>
            )}
          </div>
        ))}

        <Button variant="faq" asChild>
          <Link
            href={{
              pathname: '/author',
              query: {
                page: currentPage === totalPage ? currentPage : currentPage + 1,
              },
            }}
            className={clsx(
              'flex items-center gap-x-1',
              currentPage === totalPage
                ? 'pointer-events-none border-brand-black/10 text-brand-black/10'
                : 'pointer-events-auto border-brand-black text-brand-black',
            )}
          >
            <span>Next</span>
            <span>
              <MdKeyboardArrowRight />
            </span>
          </Link>
        </Button>
      </div>
    </Bounded>
  );
};

export default AuthorPage;
