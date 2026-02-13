import { ProductCardProps } from '@/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import SanityImage from '../shared/SanityImage';
import { formatDiscount, formatPrice } from '@/lib/formatter';
import AddtoCart from '../shared/AddtoCart';

const ProductCard = ({ className, ...props }: ProductCardProps) => {
  const { name, slug, price, colors, imageUrl, imageAlt, discountInPercent } =
    props;

  return (
    <Link
      href={`/shop/${slug?.current}`}
      className={clsx(
        'flex flex-col gap-y-3 group w-50 md:w-75 h-100 p-2 shadow-md',
        className,
      )}
    >
      <div className="overflow-hidden">
        {imageUrl && imageAlt ? (
          <SanityImage
            imageAlt={imageAlt}
            imageUrl={imageUrl}
            width={300}
            height={400}
            className="group-hover:scale-[1.03] duration-200 ease-in-out transition-all"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-y-1 justify-center items-center">
        <p className="font-jost">{name}</p>
        <div className="flex gap-x-3">
          {price && (
            <p
              className={clsx(
                discountInPercent && 'line-through text-brand-black/50',
              )}
            >
              {formatPrice(price)}
            </p>
          )}
          {discountInPercent && price ? (
            <p>{formatDiscount(discountInPercent, price)}</p>
          ) : null}
        </div>

        <div className="flex gap-x-3">
          {colors?.slice(0, 5).map((color: Record<string, string>) => (
            <div
              key={color.name}
              style={{ backgroundColor: color.name }}
              className="w-5 h-5 rounded-full border"
            />
          ))}
        </div>
      </div>

      <AddtoCart className="self-start" />
    </Link>
  );
};

export default ProductCard;
