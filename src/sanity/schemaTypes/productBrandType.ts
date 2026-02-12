import { formatTitle } from '@/lib/formatter';
import { SiNike } from 'react-icons/si';
import { defineField, defineType } from 'sanity';

export const productBrandType = defineType({
  name: 'productBrand',
  title: 'Product Brand',
  icon: SiNike,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Brand Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: (doc, context) =>
          context.dataset === 'production'
            ? `${doc.name}-product-brand`
            : `${doc.name}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Brand Logo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Color name not provided';

      return {
        title: nameFormatted,
        media: image || SiNike,
      };
    },
  },
});
