import { BlogCardProps } from '@/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import SanityImage from '../shared/SanityImage';
import CTA from '../shared/CTA';
import { formatDate } from '@/lib/formatter';

const BlogCard = ({ className, ...props }: BlogCardProps) => {
  const {
    title,
    slug,
    subtitle,
    author,
    category,
    imageUrl,
    imageAlt,
    authorImg,
    publishedAt,
  } = props;

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-3 p-2 shadow-sm w-100 max-h-100',
        className,
      )}
    >
      <div className="overflow-hidden relative">
        <div className="relative">
          {imageAlt && imageUrl ? (
            <SanityImage
              imageAlt={imageAlt}
              imageUrl={imageUrl}
              width={400}
              height={300}
              className="rounded-none! relative"
            />
          ) : null}
        </div>

        {publishedAt && (
          <div className="absolute right-0 bottom-0 bg-brand-white pl-1 pt-1">
            <p className=" bg-brand-rose p-2 text-fs-300">
              {formatDate(publishedAt)}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <div>
            {authorImg?.asset?.url && (
              <SanityImage
                imageAlt={authorImg.alt || ''}
                imageUrl={authorImg.asset.url}
                width={30}
                height={30}
                className="rounded-full!"
              />
            )}
          </div>
          <p>{author}</p>
        </div>
        <p>{category}</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="font-medium">{title}</p>
        <p className="truncate">{subtitle}</p>
      </div>

      <CTA href={`/blog/${slug}`} className="self-end">
        Read More
      </CTA>
    </div>
  );
};

export default BlogCard;
