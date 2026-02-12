import { formatTitle } from '@/lib/formatter';
import { BiCategory } from 'react-icons/bi';
import { defineField, defineType } from 'sanity';

export const blogCategoryType = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  icon: BiCategory,
  fields: [
    defineField({
      name: 'name',
      title: 'Blog Category Name',
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
            ? `${doc.name}-blog-category`
            : `${doc.name}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Description',
      type: 'text',
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
