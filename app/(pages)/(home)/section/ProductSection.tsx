'use client';

import React, { useEffect, useState, useTransition, useCallback } from 'react';
import ProductCard, { ProductData } from '@/app/components/ProductCard';
import SectionLayout from '@/app/layouts/SectionLayout';
import { Box, RefreshCw } from 'lucide-react';
import { getHighlightedProducts } from '@/sanity/lib/sanity.queries';

export default function ProductSection() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  // Memoize data pipeline handler to prevent structural layout cascading updates
  const fetchTargetData = useCallback(() => {
    // Safety check to invoke async calls seamlessly within Transition batches
    startTransition(async () => {
      setIsLoading(true);
      try {
        const data = await getHighlightedProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to resolve database highlighted products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchTargetData();
  }, [fetchTargetData]);

  return (
    <section
      id='product'
      className='relative scroll-mt-16 bg-white py-4'>
      {/* 1. System Loading Skeleton Grid State */}
      {isLoading ? (
        <div className='mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12'>
          <div className='mb-3 h-4 w-40 animate-pulse rounded-xs bg-slate-100' />
          <div className='mb-8 h-8 w-80 animate-pulse rounded-xs bg-slate-100' />
          <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:gap-6'>
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className='flex animate-pulse flex-col gap-4 rounded-sm border border-slate-100 p-5'>
                <div className='h-48 w-full rounded-sm bg-slate-50' />
                <div className='space-y-2'>
                  <div className='h-4 w-1/3 rounded-xs bg-slate-50' />
                  <div className='h-5 w-3/4 rounded-xs bg-slate-50' />
                  <div className='h-3 w-5/6 rounded-xs bg-slate-50' />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : products.length > 0 ? (
        /* 2. Active Inventory Render Canvas */
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
        /* 3. Polished Empty Data Matrix Fallback View Frame */
        <div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12'>
          <div className='mx-auto flex max-w-3xl flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center'>
            {/* Visual Abstract Icon Block */}
            <div className='relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
              <Box className='h-6 w-6 stroke-[1.5]' />
              <div className='absolute inset-0 animate-ping rounded-full border border-slate-200 opacity-25' />
            </div>

            {/* Typography Stack */}
            <span className='mb-1 font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase'>
              Data Core Log Index: 0xPROD_EMPTY
            </span>
            <h3 className='font-clash text-brand-primary text-base font-bold tracking-tight uppercase'>
              No Highlighted Components Active
            </h3>
            <p className='mt-2 max-w-md text-xs leading-relaxed font-normal text-slate-400'>
              There are currently no active industrial spares flagged for primary homepage deployment features inside
              the CMS control dashboard.
            </p>

            {/* Micro Interaction Action Control */}
            <div className='mt-6'>
              <button
                onClick={fetchTargetData}
                disabled={isPending}
                className='text-brand-primary inline-flex cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-xs transition-colors hover:bg-slate-50 disabled:opacity-60'>
                <RefreshCw className={`h-3 w-3 ${isPending ? 'animate-spin' : ''}`} />
                Re-verify Sync Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
