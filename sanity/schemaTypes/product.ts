import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Component Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partNumber',
      title: 'Part / SKU Number',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Path Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Technical Specifications',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Belongs to Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Technical Specifications Matrix',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({ name: 'key', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'value', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    // Highlighted configuration switch flag
    defineField({
      name: 'isHighlighted',
      title: 'Highlight Component',
      type: 'boolean',
      description: 'Display this specific item in featured or promotional blocks on the landing interface.',
      initialValue: false,
    }),
  ],
});
