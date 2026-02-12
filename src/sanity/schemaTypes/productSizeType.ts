import { formatTitle } from '@/lib/formatter';
import { IoIosResize } from 'react-icons/io';
import { defineField, defineType } from 'sanity';

export const productSizeType = defineType({
  name: 'productSize',
  title: 'Product Size',
  icon: IoIosResize,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Size Name',
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
            ? `${doc.name}-product-size`
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
        : 'Color name not provided';

      return {
        title: nameFormatted,
        media: IoIosResize,
      };
    },
  },
});
