import { CTAProps } from '@/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';

const CTA = ({ className, href, children }: CTAProps) => {
  return (
    <Link
      href={href}
      className={clsx('border group flex gap-x-2 items-center px-2', className)}
    >
      <span>{children}</span>
      <span className="-rotate-45 group-hover:rotate-0 duration-200 ease-in-out">
        <GoArrowRight />
      </span>
    </Link>
  );
};

export default CTA;
