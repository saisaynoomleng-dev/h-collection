import { TiDocumentText } from 'react-icons/ti';
import { defineField, defineType } from 'sanity';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utility Pages',
  icon: TiDocumentText,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
