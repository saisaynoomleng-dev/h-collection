import { Skeleton } from '../ui/skeleton';

// Product Card
export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-3 w-50 md:w-75 h-75">
      <Skeleton className="w-50 md:w-75 h-50" />
      <div className="flex flex-col gap-y-1 justify-center items-center">
        <Skeleton className="w-50 md:w-75 h-3" />
        <Skeleton className="w-50 md:w-75 h-3" />
        <Skeleton className="w-50 md:w-75 h-3" />
      </div>
      <Skeleton className="w-50 md:w-75 h-5" />
    </div>
  );
};

// blog Card
export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-3 shadow-sm w-100 h-100">
      <Skeleton className="w-100 h-60" />
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-20 h-3" />
        </div>
        <Skeleton className="w-30 h-3" />
      </div>

      <div className="flex flex-col gap-y-2">
        <Skeleton className="w-100 h-3" />
        <Skeleton className="w-100 h-3" />
      </div>

      <Skeleton className="w-30 h-3 self-end" />
    </div>
  );
};
