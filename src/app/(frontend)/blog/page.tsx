import BlogCard from '@/components/features/BlogCard';
import { BlogCardSkeleton } from '@/components/features/Skeletons';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ALL_BLOG_CATEGORIES_QUERY,
  ALL_BLOGS_QUERY,
} from '@/sanity/lib/sanityQueries';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export const metadata: Metadata = {
  title: 'Journals',
  description: `The H-Journal: Your source for style inspiration, designer interviews, and the latest trends from the H-Collections creative studio.`,
};

const getPaginationRange = (currentPage: number, totalPage: number) => {
  const delta = 1;
  const range = new Set<number | string>();
  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPage, currentPage + delta);
    i++
  ) {
    range.add(i);
  }

  const result: (number | string)[] = Array.from(range);

  if (currentPage - delta > 2) result.unshift('...');
  if (currentPage + delta < totalPage - 1) result.push('...');

  if (!result.includes(1)) result.unshift(1);
  if (totalPage > 1 && !result.includes(totalPage)) result.push(totalPage);

  return result;
};

const BlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) => {
  const { category, page } = await searchParams;

  const pageSize = 4;
  const currentPage = Math.max(parseInt(page || '1', 10));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const { data: blogContents } = await sanityFetch({
    query: ALL_BLOGS_QUERY,
    params: {
      category: category || null,
      startIndex,
      endIndex,
    },
  });

  const totalBlogs = blogContents.total;
  const totalPage = Math.ceil(totalBlogs / pageSize);
  const paginationRange = getPaginationRange(currentPage, totalPage);

  const { data: categories } = await sanityFetch({
    query: ALL_BLOG_CATEGORIES_QUERY,
  });

  if (!blogContents) notFound();
  if (!categories) notFound();

  return (
    <Bounded isPadded>
      <PageTitle>Explore our Journals</PageTitle>
      <div className="grid md:grid-cols-[auto_1fr] md:gap-x-5 gap-y-5">
        {/* category filter */}
        <div className="space-y-3">
          <p className="font-semibold">Categories</p>
          <div className="flex flex-row md:flex-col max:md:justify-center gap-3 max-md:items-center flex-wrap">
            {categories.map((c) => (
              <Button
                asChild
                variant="faq"
                className={clsx(
                  'flex gap-x-3',
                  category === c.slug && 'bg-brand-pink',
                )}
                key={c.slug}
              >
                <Link
                  href={{
                    pathname: '/blog',
                    query: {
                      page: 1,
                      category: c.slug,
                    },
                  }}
                >
                  {c.name}
                </Link>
              </Button>
            ))}
            {category && (
              <Button variant="faq" asChild>
                <Link
                  href={{
                    pathname: '/blog',
                    query: {
                      ...(page && { page }),
                      category: '',
                    },
                  }}
                  className="text-red-500 flex items-center gap-x-3"
                >
                  <span>Clear Filter</span>
                  <span>
                    <IoClose className="border rounded-full" />
                  </span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* contents */}
        <div className="grid md:grid-cols-2 gap-3 py-5 md:pl-5 max-md:border-t md:border-l border-brand-black/20">
          {blogContents.blogs.map((b) => (
            <Suspense key={b.slug} fallback={<BlogCardSkeleton />}>
              <BlogCard {...b} />
            </Suspense>
          ))}

          <div className="flex gap-x-3 justify-center items-center col-span-full mt-5">
            <Button
              asChild
              className=""
              variant="faq"
              disabled={currentPage === 1}
            >
              <Link
                href={{
                  pathname: '/blog',
                  query: {
                    ...(category && { category }),
                    page: currentPage === 1 ? currentPage : currentPage - 1,
                  },
                }}
                className={clsx(
                  'flex gap-x-1 items-center',
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

            {paginationRange.map((pageNum) => (
              <div key={pageNum}>
                {pageNum === '...' ? (
                  <span>...</span>
                ) : (
                  <Button
                    asChild
                    variant="faq"
                    className={clsx(
                      '',
                      currentPage === pageNum && 'bg-brand-pink',
                    )}
                  >
                    <Link
                      href={{
                        pathname: '/blog',
                        query: {
                          ...(category && { category }),
                          page: pageNum,
                        },
                      }}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                )}
              </div>
            ))}

            <Button
              asChild
              className=""
              variant="faq"
              disabled={currentPage === totalPage}
            >
              <Link
                href={{
                  pathname: '/blog',
                  query: {
                    ...(category && { category }),
                    page:
                      currentPage === totalPage ? currentPage : currentPage + 1,
                  },
                }}
                className={clsx(
                  'flex gap-x-1 items-center',
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
        </div>
      </div>
    </Bounded>
  );
};

export default BlogPage;
