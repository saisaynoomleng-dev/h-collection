'use client';

import { BackToPageProps } from '@/types/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from '../ui/button';

const BackToPage = ({ children, className }: BackToPageProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <Button
      variant="search"
      className={clsx(
        'flex items-center gap-x-3 cursor-pointer w-50 group',
        className,
      )}
      onClick={handleBack}
    >
      <span>
        <BiArrowBack className="group-hover:-translate-x-1 transition-all duration-200 ease-in-out" />
      </span>
      <span>{children}</span>
    </Button>
  );
};

export default BackToPage;
