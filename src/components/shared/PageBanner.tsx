import clsx from 'clsx';
import { TfiHeadphone, TfiWallet, TfiPackage } from 'react-icons/tfi';

const PageBanner = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'grid md:grid-cols-3 gap-x-3 items-start max-md:gap-y-5 border border-brand-black/10 rounded-sm p-2',
        className,
      )}
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-5 items-center">
        <div>
          <TfiPackage className="size-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Free Shipping</p>
          <p className="text-fs-300">Free shipping for order above $200</p>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-5 items-center">
        <div>
          <TfiWallet className="size-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">Flexible Payment</p>
          <p className="text-fs-300">Multiple secure payment options</p>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-5 items-center">
        <div>
          <TfiHeadphone className="size-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold">24x7 Support</p>
          <p className="text-fs-300">We support online all days, all week.</p>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
