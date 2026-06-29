import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Product URL Path Slug',
      type: 'slug',
      description: 'Generates an individual dynamic link URL path for this spare part.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Technical Catalog Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Category Technical Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'products',
      title: 'Associated Products Group',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    // Highlighted configuration switch flag
    defineField({
      name: 'isHighlighted',
      title: 'Highlight Category',
      type: 'boolean',
      description: 'Pin this category to the primary layout matrices on the front landing screen.',
      initialValue: false,
    }),
  ],
});
