import { type SchemaTypeDefinition } from 'sanity';
import { categoryType } from '@/sanity/schemaTypes/category';
import { productType } from '@/sanity/schemaTypes/product';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType],
};
