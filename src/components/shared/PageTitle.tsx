import { PageTitleProps } from '@/types/types';
import clsx from 'clsx';

const PageTitle = ({
  as: Comp = 'h2',
  children,
  className,
}: PageTitleProps) => {
  return (
    <Comp
      className={clsx('font-semibold text-fs-500 md:text-fs-600', className)}
    >
      {children}
    </Comp>
  );
};

export default PageTitle;
