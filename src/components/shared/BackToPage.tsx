import { BackToPageProps } from '@/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

const BackToPage = ({ children, className, href }: BackToPageProps) => {
  return (
    <Link
      href={href}
      className={clsx('flex gap-x-2 items-center group', className)}
    >
      <span>
        <BiArrowBack className="group-hover:-translate-x-1 duration-200 ease-in-out transition-all" />
      </span>
      <span>Back to {children}</span>
    </Link>
  );
};

export default BackToPage;
