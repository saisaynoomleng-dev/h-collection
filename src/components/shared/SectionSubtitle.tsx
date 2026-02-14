import { SectionSubtitleProps } from '@/types/types';
import clsx from 'clsx';

const SectionSubtitle = ({
  className,
  children,
  as: Comp = 'h2',
}: SectionSubtitleProps) => {
  return (
    <div className={clsx('', className)}>
      {/* desktop view */}
      <div className="hidden md:grid md:grid-cols-3 items-center">
        <div className="divider bg-brand-teal/50 w-[95%]"></div>
        <Comp className="flex-2 text-center uppercase text-brand-teal font-semibold">
          {children}
        </Comp>
        <div className="divider bg-brand-teal/50 w-[95%]"></div>
      </div>

      {/* mobile view */}
      <div className="block md:hidden">
        <Comp className="flex-2 text-center uppercase border-y py-2 text-brand-teal font-semibold">
          {children}
        </Comp>
      </div>
    </div>
  );
};

export default SectionSubtitle;
