import { formatTitle } from '@/lib/formatter';
import { BiCategory } from 'react-icons/bi';
import { defineField, defineType } from 'sanity';

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Product Categories',
  icon: BiCategory,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Category',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc, context) =>
          context.dataset === 'production'
            ? `${doc.name}-product-category`
            : `${doc.name}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Category name not provided';

      return {
        title: nameFormatted,
        media: BiCategory,
      };
    },
  },
});
