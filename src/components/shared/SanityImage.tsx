import { urlFor } from '@/sanity/lib/image';
import { SanityImageProps } from '@/types/types';
import clsx from 'clsx';
import Image from 'next/image';

const SanityImage = ({
  className,
  imageUrl,
  width,
  height,
  imageAlt,
}: SanityImageProps) => {
  return (
    <Image
      src={urlFor(imageUrl).format('webp').url()}
      width={width}
      height={height}
      alt={imageAlt || ''}
      loading="lazy"
      className={clsx('rounded-sm object-cover min-w-full', className)}
    />
  );
};

export default SanityImage;
