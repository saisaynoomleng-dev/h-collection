'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import clsx from 'clsx';
import { SubmitButtonProps } from '@/types/types';
import { LoadingSpinner } from './LoadingSpinner';

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className={clsx('cursor-pointer', className)}
    >
      {pending ? (
        <span>
          <LoadingSpinner />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
