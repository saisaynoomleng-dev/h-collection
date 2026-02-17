import ApplicationForm from '@/components/features/ApplicationForm';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import db from '@/db';
import { CareerTable } from '@/db/schema';
import { formatDate } from '@/lib/formatter';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

const JobOfferDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job = await db.query.CareerTable.findFirst({
    where: eq(CareerTable.id, id),
    columns: {
      updatedAt: false,
    },
  });

  if (!job) notFound();

  return (
    <Bounded isPadded>
      <PageTitle>{job.position}</PageTitle>
      <p>
        Posted At{' '}
        <span className="font-semibold">
          {formatDate(job.createdAt.toLocaleDateString())}
        </span>
      </p>

      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Overview</p>
        {job.body && <p className="prose md:prose-lg min-w-full">{job.body}</p>}
      </div>

      <ApplicationForm />
    </Bounded>
  );
};

export default JobOfferDetailPage;
