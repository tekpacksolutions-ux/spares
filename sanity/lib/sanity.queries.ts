import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-29',
  useCdn: process.env.NODE_ENV === 'production',
});

/* ==========================================================================
   1. Fetch All Active Categories
   ========================================================================== */
export async function getAllCategories() {
  const query = `*[_type == "category"] | order(name asc) {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    "image": coalesce(image.asset->url, "/image/ProductDemo.jpg"),
    "partCount": count(*[_type == "product" && references(^._id)])
  }`;

  return await client.fetch(query);
}

/* ==========================================================================
   3. Fetch Highlighted Categories Only
   ========================================================================== */
export async function getHighlightedCategories() {
  const query = `*[_type == "category" && isHighlighted == true] | order(name asc) {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    "image": coalesce(image.asset->url, "/image/ProductDemo.jpg"),
    "partCount": count(*[_type == "product" && references(^._id)])
  }`;

  return await client.fetch(query);
}

/* ==========================================================================
   4. Fetch Highlighted Products Only (With Slug)
   ========================================================================== */
export async function getHighlightedProducts() {
  const query = `*[_type == "product" && isHighlighted == true] | order(_createdAt desc) {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    partNumber,
    "categoryName": category->name,
    "categorySlug": category->slug.current,
    "image": coalesce(image.asset->url, "/image/ProductDemo.jpg"),
    "inStock": coalesce(inStock, true),
    "features": coalesce(features[] { key, value }, [])
  }`;

  return await client.fetch(query);
}

/* ==========================================================================
   5. Fetch Single Category By Slug (With Nested Associated Products)
   ========================================================================== */
export async function getCategoryBySlug(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    name,
    description,
    "image": coalesce(image.asset->url, "/image/ProductDemo.jpg"),
    "partCount": count(*[_type == "product" && references(^._id)]),
    "products": *[_type == "product" && references(^._id)] | order(_createdAt desc) {
      "id": _id,
      "slug": slug.current,
      name,
      description,
      partNumber,
      "categoryName": category->name,
      "categorySlug": category->slug.current,
      "image": coalesce(image.asset->url, "/image/ProductDemo.jpg"),
      "inStock": coalesce(inStock, true),
      "features": coalesce(features[] { key, value }, [])
    }
  }`;

  return await client.fetch(query, { slug });
}
