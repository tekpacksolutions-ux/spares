'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ProductCard, { ProductData } from '@/app/components/ProductCard';
import SectionLayout from '@/app/layouts/SectionLayout';
import { getHighlightedProducts } from '@/sanity/lib/sanity.queries';

// Shell Component
export default function ProductSection() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <section
        id='product'
        className='relative h-96 bg-white py-4'
      />
    );
  return <ProductSectionInner />;
}

// Logic Component
function ProductSectionInner() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTargetData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getHighlightedProducts();
      setProducts(data || []);
    } catch (error) {
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTargetData();
  }, [fetchTargetData]);

  if (isLoading) return <section className='h-64 animate-pulse bg-slate-50' />;

  return (
    <section
      id='product'
      className='relative scroll-mt-16 bg-white py-4'>
      {products.length > 0 ? (
        <SectionLayout<ProductData>
          title='Featured Spares & Components'
          viewAllLink='/products'
          items={products}
          columnsClassName='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:gap-6'
          renderItem={(product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          )}
        />
      ) : (
        <div className='p-12 text-center'>No active components.</div>
      )}
    </section>
  );
}
