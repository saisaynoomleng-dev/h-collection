import { CiGift } from 'react-icons/ci';
import { defineField, defineType } from 'sanity';

export const giftCardType = defineType({
  name: 'giftCard',
  title: 'Gift Cards',
  icon: CiGift,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-gift-card`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
});
