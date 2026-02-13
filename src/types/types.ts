import {
  ALL_BLOGS_QUERYResult,
  ALL_PRODUCT_QUERIESResult,
} from '@/sanity/types';

// Newsletter Form Previous Props
export type NewsletterFormPrevStateProps = {
  status: string;
  message: string;
  field?: string;
};

// Submit Button
export type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

// Bounded
export type BoundedProps = {
  as: React.ElementType;
  children: React.ReactNode;
  className?: string;
  isPadded: boolean;
};

// CTA
export type CTAProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

// Banner
export type BannerProps = {
  className?: string;
};

// Product Cards
export type ProductCardProps =
  NonNullable<ALL_PRODUCT_QUERIESResult>[number] & { className?: string };

// Sanity Image
export type SanityImageProps = {
  className?: string;
  imageUrl: string;
  width: number;
  height: number;
  imageAlt: string;
};

// Blog Card
export type BlogCardProps = NonNullable<ALL_BLOGS_QUERYResult>[number] & {
  className?: string;
};
