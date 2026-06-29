'use client';

import React, { useEffect, useState, useTransition, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard, { ProductData } from '@/app/components/ProductCard';
import { ArrowLeft, Layers, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { getCategoryBySlug } from '@/sanity/lib/sanity.queries';

interface SanityCategoryPayload {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  partCount: number;
  products: ProductData[];
}

function ProductCatalogContainer() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');

  // Core asynchronous state management hooks
  const [categoryData, setCategoryData] = useState<SanityCategoryPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  // Memoize handler to secure variable identity stability across render ticks
  const syncCategoryCatalog = useCallback(() => {
    // Batch ALL synchronous layout choices safely within the transition wrapper context
    startTransition(async () => {
      if (!categorySlug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getCategoryBySlug(categorySlug);
        setCategoryData(data || null);
      } catch (error) {
        console.error('Failed to resolve Sanity component contextual stream:', error);
        setCategoryData(null);
      } finally {
        setIsLoading(false);
      }
    });
  }, [categorySlug]);

  // Trigger re-fetch safely whenever the slug dependency signature changes
  useEffect(() => {
    syncCategoryCatalog();
  }, [syncCategoryCatalog]);

  // Compute scannable text metadata safely based on API response payload
  const displayTitle = categoryData ? `${categoryData.name} Directory` : 'Dynamic Components Directory';
  const displayDesc = categoryData
    ? categoryData.description
    : 'Displaying production-grade performance variants matching specified internal structural design parameters.';

  return (
    <>
      {/* Dynamic Category Catalog Header Deck */}
      <div className='mb-10 border-b border-slate-100 pb-6'>
        <span className='text-brand-secondary mb-1 block text-[10px] font-bold tracking-[0.2em] uppercase'>
          System Classification Catalog
        </span>
        {isLoading ? (
          <div className='space-y-3'>
            <div className='h-8 w-64 animate-pulse rounded-xs bg-slate-100' />
            <div className='h-4 w-96 animate-pulse rounded-xs bg-slate-100' />
          </div>
        ) : (
          <>
            <h1 className='font-clash text-brand-primary text-2xl font-bold tracking-tight uppercase sm:text-4xl'>
              {displayTitle}
            </h1>
            <p className='mt-2 max-w-2xl text-xs leading-relaxed font-normal text-slate-400'>{displayDesc}</p>
          </>
        )}
      </div>

      {/* Dynamic State Layout Switcher Matrix */}
      {isLoading ? (
        /* 1. Network Loading Pipeline Skeleton Matrix Grid */
        <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-3'>
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className='flex animate-pulse flex-col gap-4 rounded-sm border border-slate-100 bg-white p-5'>
              <div className='h-48 w-full rounded-sm bg-slate-50' />
              <div className='space-y-2'>
                <div className='h-4 w-1/4 rounded-xs bg-slate-50' />
                <div className='h-5 w-5/6 rounded-xs bg-slate-50' />
                <div className='h-3 w-1/2 rounded-xs bg-slate-50' />
              </div>
            </div>
          ))}
        </div>
      ) : categoryData && categoryData.products && categoryData.products.length > 0 ? (
        /* 2. Content Map Rendering Grid Canvas */
        <div className='grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-3'>
          {categoryData.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        /* 3. Missing Inventory or Invalid Slug Param Edge State Frame */
        <div className='mx-auto my-8 flex max-w-2xl flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center'>
          <div className='relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
            <Layers className='h-5 w-5' />
            <div className='absolute inset-0 animate-ping rounded-full border border-slate-200 opacity-25' />
          </div>

          <span className='mb-1 font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase'>
            Inventory Cluster Status: Empty
          </span>
          <h3 className='text-brand-primary text-sm font-bold tracking-tight uppercase'>
            No Active Dynamic Records Found
          </h3>
          <p className='mt-2 max-w-sm text-xs leading-relaxed font-normal text-slate-400'>
            {categorySlug
              ? `There are currently no active catalog spares allocated under the target category parameter key "${categorySlug}".`
              : 'No explicit query string slug selection identified in structural viewport request URL headers.'}
          </p>

          <div className='mt-6 flex items-center gap-3'>
            <Link
              href='/categories'
              className='text-brand-primary rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-xs transition-colors outline-none hover:bg-slate-50'>
              Return to Directory
            </Link>
            {categorySlug && (
              <button
                onClick={syncCategoryCatalog}
                disabled={isPending}
                className='text-brand-primary inline-flex cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-xs transition-colors outline-none hover:bg-slate-50 disabled:opacity-60'>
                <RefreshCw className={`h-3 w-3 ${isPending ? 'animate-spin' : ''}`} />
                Sync Node
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductsPage() {
  return (
    <main className='min-h-screen border-t border-slate-100 bg-white py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Navigation Breadcrumb Node */}
        <div className='mb-6'>
          <Link
            href='/categories'
            className='hover:text-brand-secondary inline-flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase transition-colors outline-none'>
            <ArrowLeft className='h-3.5 w-3.5' />
            Back to Categories Directory
          </Link>
        </div>

        {/* Suspense boundary encapsulating dynamic search param parsing blocks */}
        <Suspense
          fallback={
            <div className='grid grid-cols-2 gap-4 pt-24 lg:grid-cols-3 xl:grid-cols-3'>
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className='flex animate-pulse flex-col gap-4 rounded-sm border border-slate-100 bg-white p-5'>
                  <div className='h-48 w-full rounded-sm bg-slate-50' />
                  <div className='space-y-2'>
                    <div className='h-4 w-1/4 rounded-xs bg-slate-50' />
                    <div className='h-5 w-5/6 rounded-xs bg-slate-50' />
                  </div>
                </div>
              ))}
            </div>
          }>
          <ProductCatalogContainer />
        </Suspense>
      </div>
    </main>
  );
}
