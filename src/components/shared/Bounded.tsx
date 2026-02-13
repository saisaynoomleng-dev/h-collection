import { BoundedProps } from '@/types/types';
import clsx from 'clsx';

const Bounded = ({
  children,
  className,
  as: Comp = 'section',
  isPadded,
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        'pt-3 pb:2 md:pt-5 min-h-screen space-y-5 md:space-y-8 lg:space-y-12 my-container',
        isPadded && 'px-4 md:px-6 lg:px-10',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;
