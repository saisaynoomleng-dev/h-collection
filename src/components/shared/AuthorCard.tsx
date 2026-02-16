import { AuthorCardProps } from '@/types/types';
import Link from 'next/link';
import SanityImage from './SanityImage';
import clsx from 'clsx';

const AuthorCard = ({ className, ...props }: AuthorCardProps) => {
  const { name, slug, imageUrl, imageAlt } = props;

  return (
    <Link
      href={`/author/${slug}`}
      className={clsx('flex flex-col gap-y-3 group', className)}
    >
      <div className="overflow-hidden">
        {imageAlt && imageUrl ? (
          <SanityImage
            imageAlt={imageAlt || ''}
            imageUrl={imageUrl}
            width={300}
            height={300}
            className="group-hover:scale-[1.05] transition-all duration-200 ease-in-out"
          />
        ) : null}
      </div>

      <p className="font-semibold">{name}</p>
    </Link>
  );
};

export default AuthorCard;
