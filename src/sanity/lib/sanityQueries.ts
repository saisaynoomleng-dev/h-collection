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

export const ALL_BLOGS_QUERY = defineQuery(`
 {
  "blogs": *[_type == 'blog'
            && defined(slug.current)
            && (
              (!defined($category))
              ||category->slug.current == $category
            )]
            | order(_id)
            [$startIndex...$endIndex]{
              title,
              'slug': slug.current,
              'author': author->name,
              'authorImg': author->mainImage{alt, asset->{url}},
              subtitle,
              'category': category->name,
              publishedAt,
              'imageUrl': mainImage.asset->url,
              'imageAlt': mainImage.alt,
             },
  "total": count(*[_type == 'blog'
            && defined(slug.current)
            && (
              (!defined($category))||
              category->slug.current == $category
            )])
}`);

export const BLOG_QUERY = defineQuery(`*[_type == 'blog'
 && slug.current == $slug][0]{
  title,
  "slug" : slug.current,
  subtitle,
  author->{
    name,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
  },
  category->{
    name,
    "slug": slug.current
  },
  publishedAt,
  body,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  minRead,
  "relatedBlogs": *[_type == 'blog'
                    && _id != ^._id
                    && category->slug.current == ^.category->slug.current]{
                       title,
                        'slug': slug.current,
                        'author': author->name,
                        'authorImg': author->mainImage{alt, asset->{url}},
                        subtitle,
                        'category': category->name,
                        publishedAt,
                        'imageUrl': mainImage.asset->url,
                        'imageAlt': mainImage.alt,
                    }
 }`);

export const ALL_FAQS_QUERY = defineQuery(`*[_type == 'faq'
 && defined(slug.current)]{
  name,
  "slug": slug.current,
  faqs[]{
    question,
    answer
  }
 }`);

export const ALL_BLOG_CATEGORIES_QUERY = defineQuery(`*[_type == 'blogCategory'
 && defined(slug.current)]{
  name,
  "slug" : slug.current
 }`);

export const UTILITY_PAGE_QUERY = defineQuery(`*[_type == 'utilityPage'
  && slug.current == $slug][0]{
  name,
  slug,
  body
}`);

export const ALL_AUTHORS_QUERY = defineQuery(`{
  "authors": *[_type == 'author'
 && defined(slug.current)]
 |order(_createdAt)
 [$startIndex...$endIndex]{
  name,
  "slug": slug.current,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt
 },
"total": count(*[_type == 'author'
 && defined(slug.current)])
}`);

export const AUTHOR_QUERY = defineQuery(`*[_type == 'author'
 && slug.current == $slug][0]{
  name,
  'imageUrl': mainImage.asset->url,
  'imageAlt': mainImage.alt,
  body,
  socialLink,
  "journals": *[_type == 'blog'
               && author->slug.current == ^.slug.current]{
                  title,
                  'slug': slug.current,
                  'author': author->name,
                  'authorImg': author->mainImage{alt, asset->{url}},
                  subtitle,
                  'category': category->name,
                  publishedAt,
                  'imageUrl': mainImage.asset->url,
                  'imageAlt': mainImage.alt,
               }
 }`);
