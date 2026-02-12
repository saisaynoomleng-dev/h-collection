import { formatPrice, formatTitle } from '@/lib/formatter';
import { skuGenerator } from '@/lib/generator';
import { IoIosShirt } from 'react-icons/io';
import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Products',
  icon: IoIosShirt,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      initialValue: () => skuGenerator(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc, context) =>
          context.dataset === 'production'
            ? `${doc.name}-${doc.sku}`
            : `${doc.name}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImages',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'blockImage' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discountInPercent',
      title: 'Discount in Percent',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'availableColor',
      title: 'Available Colors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productColor' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availableSize',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productSize' }] }],
    }),
    defineField({
      name: 'brand',
      title: 'Product Brand',
      type: 'reference',
      to: [{ type: 'productBrand' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'numberInStock',
      title: 'Number In Stock',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'price',
      brand: 'brand.name',
      image: 'mainImages.0.asset',
    },
    prepare({ name, price, brand, image }) {
      const nameFormatted = formatTitle(name) || 'name not provided';
      const priceFormatted = price ? formatPrice(price) : 'Price not provided';
      const brandFormatted = brand ? formatTitle(brand) : 'Brand not provided';

      return {
        title: nameFormatted,
        subtitle: `Price: ${priceFormatted} | Brand: ${brandFormatted}`,
        media: image || IoIosShirt,
      };
    },
  },
});
