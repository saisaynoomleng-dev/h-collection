import { formatTitle } from '@/lib/formatter';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const faqType = defineType({
  name: 'faq',
  title: 'FAQs',
  icon: MdOutlineQuestionMark,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'FAQ type name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc, context) =>
          context.dataset === 'production' ? `${doc.name}-faqs` : `${doc.name}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      return {
        title: nameFormatted,
        media: MdOutlineQuestionMark,
      };
    },
  },
});
