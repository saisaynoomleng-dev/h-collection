import { JobCardSkeleton } from '@/components/features/Skeletons';
import Bounded from '@/components/shared/Bounded';
import JobCard from '@/components/shared/JobCard';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import db from '@/db';
import { CareerTable } from '@/db/schema';
import clsx from 'clsx';
import { count, desc, ilike } from 'drizzle-orm';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Careers',
  description: `Join the H-Collections team. Explore opportunities in fashion design, e-commerce operations, and creative direction at our Cincinnati headquarters.`,
};

const CareerPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ position?: string; page?: string }>;
}) => {
  const { position, page } = await searchParams;

  const pageSize = 3;
  const currentPage = parseInt(page || '1', 10);

  const jobOffers = await db.query.CareerTable.findMany({
    where: position ? ilike(CareerTable.position, `%${position}%`) : undefined,
    columns: {
      updatedAt: false,
    },
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    orderBy: desc(CareerTable.position),
  });

  const positions = await db.query.CareerTable.findMany({
    columns: {
      position: true,
      id: true,
    },
  });

  const [totalCount] = await db.select({ value: count() }).from(CareerTable);
  const totalJobs = totalCount.value;

  const totalPage = Math.ceil(totalJobs / pageSize);
  console.log(totalPage);

  if (!jobOffers || jobOffers.length === 0) {
    return (
      <Bounded isPadded>
        <PageTitle className="text-center">No Positions Found</PageTitle>
        <p className="text-center mt-4">
          We don't have any openings matching your criteria right now.
        </p>
      </Bounded>
    );
  }

  return (
    <Bounded isPadded>
      <PageTitle className="text-center">Join Our Team</PageTitle>

      <div className="grid md:grid-cols-[auto_1fr] md:gap-x-5">
        {/* filters */}
        <div className="space-y-3">
          <p className="font-semibold">Positions</p>
          <div className="flex md:flex-col gap-y-2 gap-x-3 flex-wrap max-md:pb-5 max-md:border-b md:border-r md:pr-5">
            {positions.map((p) => (
              <Button variant="faq" asChild key={p.id}>
                <Link
                  href={{
                    pathname: '/career',
                    query: {
                      page: 1,
                      position: p.position,
                    },
                  }}
                >
                  {p.position}
                </Link>
              </Button>
            ))}
          </div>
          {position && (
            <Button
              variant="faq"
              asChild
              className="w-full border-red-500 text-red-500"
            >
              <Link
                href={{
                  pathname: '/career',
                  query: {
                    ...(page && { page }),
                    position: '',
                  },
                }}
              >
                Clear Filter
              </Link>
            </Button>
          )}
        </div>

        {/* contents */}
        <div className="flex flex-col max-md:justify-center max-md:items-center gap-y-8 pt-5 md:ml-5">
          {jobOffers.map((job) => (
            <Suspense key={job.id} fallback={<JobCardSkeleton />}>
              <JobCard {...job} />
            </Suspense>
          ))}
        </div>
      </div>

      {totalPage > 1 && (
        <div className="flex gap-x-3 items-center justify-center">
          {Array.from({ length: totalPage })
            .map((_, i) => i + 1)
            .map((page) => (
              <Button key={page} variant="faq" asChild>
                <Link
                  href={{
                    pathname: '/career',
                    query: {
                      ...(position && { position }),
                      page,
                    },
                  }}
                  className={clsx(page === currentPage && 'bg-brand-pink')}
                >
                  {page}
                </Link>
              </Button>
            ))}
        </div>
      )}
    </Bounded>
  );
};

export default CareerPage;
