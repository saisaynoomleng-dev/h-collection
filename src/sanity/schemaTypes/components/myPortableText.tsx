import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const myPortableText: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value ? (
        <Image
          src={urlFor(value).format('webp').url()}
          alt={value?.alt || ''}
          width={400}
          height={400}
          loading="lazy"
          className="object-cover rounded-sm mx-auto"
        />
      ) : null,
  },
  marks: {
    link: ({ value, children }) => (
      <Link href={value?.href} className="underline text-brand-pink">
        {children}
      </Link>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="marker:text-brand-pink">{children}</ul>
    ),
  },
};
