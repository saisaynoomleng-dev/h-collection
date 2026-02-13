import { formatTitle } from '@/lib/formatter';
import { BsNewspaper } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  icon: BsNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      initialValue: new Date().toDateString(),
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
            ? `${doc.title}-${doc.publishedAt}`
            : `${doc.title}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minRead',
      title: 'Reading Duration',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Blog Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      minRead: 'minRead',
      category: 'category.name',
      image: 'mainImage',
    },
    prepare({ title, minRead, category, image }) {
      const titleFormatted = title ? formatTitle(title) : 'Title not provided';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category not formatted';

      return {
        title: `${titleFormatted}`,
        subtitle: `Category: ${categoryFormatted} | ${minRead} mins read`,
        media: image || BsNewspaper,
      };
    },
  },
});
