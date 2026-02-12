import { defineField, defineType } from 'sanity';

export const blockImage = defineType({
  name: 'blockImage',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .error(`Image alternative text is helpful for accessibility`),
    }),
  ],
  options: {
    hotspot: true,
  },
});
