import { defineQuery } from 'next-sanity';

export const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == 'product'
 && defined(slug.current)]{
  name,
  slug,
  price,
  "imageUrl": mainImages[0].asset -> url,
  "imageAlt": mainImages[0].alt,
  "colors": availableColor[]->{name},
  discountInPercent,
  "brand": brand->name
 }
 `);

export const PRODUCT_QUERY = defineQuery(`*[_type == 'product'
 && slug.current == $slug][0]{
  name,
  slug,
  sku,
  'category': category->name,
  price,
  discountInPercent,
  'colors': availableColor[]->name,
  'sizes': availableSize[]->name,
  mainImages[]{
    asset->{url},
    alt
  },
  body,
 }`);

export const ALL_BLOGS_QUERY = defineQuery(`*[_type == 'blog'
 && defined(slug.current)]{
  title,
  'slug': slug.current,
  'author': author->name,
  'authorImg': author->mainImage{alt, asset->{url}},
  subtitle,
  'category': category->name,
  publishedAt,
  'imageUrl': mainImage.asset->url,
  'imageAlt': mainImage.alt,
  minRead
 }`);
