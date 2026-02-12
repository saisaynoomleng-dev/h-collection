import { formatTitle } from '@/lib/formatter';
import { FaUserEdit } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Members',
  icon: FaUserEdit,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team Member Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Role',
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
            ? `${doc.name}-${doc.role}`
            : `${doc.name}`,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Member Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instaLink',
      title: 'Instagram Link',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'https://www.instagram.com',
    }),
    defineField({
      name: 'body',
      title: 'Memeber Bio',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      image: 'mainImage',
    },
    prepare({ name, role, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const roleFormatted = role ? formatTitle(role) : 'Role not provided';

      return {
        title: nameFormatted,
        subtitle: roleFormatted,
        media: image || FaUserEdit,
      };
    },
  },
});
