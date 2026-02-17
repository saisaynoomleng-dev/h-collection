import { CareerTable } from '@/db/schema';
import { formatDate } from '@/lib/formatter';
import { InferSelectModel } from 'drizzle-orm';
import Link from 'next/link';

type Career = InferSelectModel<typeof CareerTable>;
type JobCardProps = Omit<Career, 'updatedAt'>;

const JobCard = (props: JobCardProps) => {
  const { isOpen, position, id, body, createdAt } = props;

  if (!isOpen) return null;

  return (
    <Link
      href={`/career/${id}`}
      className="shadow p-3 flex flex-col gap-y-4 max-md:max-w-110 md:w-150 hover:scale-[1.01] transition-all duration-200 ease-in-out"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-brand-pink">{position}</p>
        <p>
          <span className="font-medium">Posted</span>{' '}
          {formatDate(createdAt.toLocaleDateString())}
        </p>
      </div>
      <p className="truncate">{body}</p>
    </Link>
  );
};

export default JobCard;
