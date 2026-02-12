import { formatTitle } from '@/lib/formatter';
import { MdOutlineQuestionMark } from 'react-icons/md';
import { defineArrayMember, defineField, defineType } from 'sanity';

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
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'question',
          title: 'Question',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineArrayMember({
          name: 'answer',
          title: 'Answer',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
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
