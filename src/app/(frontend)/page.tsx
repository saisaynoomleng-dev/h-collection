import BlogCard from '@/components/features/BlogCard';
import ProductCard from '@/components/features/ProductCard';
import {
  BlogCardSkeleton,
  ProductCardSkeleton,
} from '@/components/features/Skeletons';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ALL_BLOGS_QUERY,
  ALL_PRODUCTS_QUERY,
} from '@/sanity/lib/sanityQueries';

export default async function Home() {
  const { data: products } = await sanityFetch({ query: ALL_PRODUCTS_QUERY });

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCardSkeleton key={product.slug?.current} {...product} />
      ))}
    </div>
  );
}
