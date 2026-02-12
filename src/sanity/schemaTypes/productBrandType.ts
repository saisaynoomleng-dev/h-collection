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
        source: 'name',
        maxLength: 200,
      },
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
        media: SiNike,
      };
    },
  },
});
