'use client';

import React, { useEffect, useState, useTransition, useCallback } from 'react';
import CategoryCard, { CategoryData } from '@/app/components/CategoryCard';
import SectionLayout from '@/app/layouts/SectionLayout';
import { Layers, RefreshCw } from 'lucide-react';
import { getHighlightedCategories } from '@/sanity/lib/sanity.queries';

export default function CategorySection() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  // Encapsulated data engine synchronization loop
  const fetchTargetData = useCallback(() => {
    startTransition(async () => {
      setIsLoading(true);
      try {
        const data = await getHighlightedCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to resolve database highlighted categories:', error);
        setCategories([]);
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
      id='category'
      className='relative scroll-mt-16 bg-white py-4'>
      {/* 1. System Loading Skeleton Frame State */}
      {isLoading ? (
        <div className='mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12'>
          <div className='mb-3 h-4 w-32 animate-pulse rounded-xs bg-slate-100' />
          <div className='mb-8 h-8 w-64 animate-pulse rounded-xs bg-slate-100' />
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:gap-6'>
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className='flex animate-pulse flex-col gap-4 rounded-sm border border-slate-100 p-4'>
                <div className='aspect-square w-full rounded-sm bg-slate-50' />
                <div className='mx-auto h-4 w-2/3 rounded-xs bg-slate-50' />
                <div className='mx-auto h-3 w-5/6 rounded-xs bg-slate-50' />
              </div>
            ))}
          </div>
        </div>
      ) : categories.length > 0 ? (
        /* 2. Database Record Render Canvas */
        <SectionLayout<CategoryData>
          title='Shop By Category'
          viewAllLink='/categories'
          items={categories}
          columnsClassName='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:gap-6'
          renderItem={(category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          )}
        />
      ) : (
        /* 3. Polished Empty Data Matrix Fallback View Frame */
        <div className='mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12'>
          <div className='mx-auto flex max-w-3xl flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-slate-50/60 p-12 text-center'>
            {/* Visual Abstract Dynamic Shell Layout */}
            <div className='relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
              <Layers className='h-6 w-6 stroke-[1.5]' />
              <div className='absolute inset-0 animate-ping rounded-full border border-slate-200 opacity-25' />
            </div>

            {/* Typography Stack */}
            <span className='mb-1 font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase'>
              Data Core Log Index: 0xEMPTY
            </span>
            <h3 className='font-clash text-brand-primary text-base font-bold tracking-tight uppercase'>
              No Highlighted Allocation Profiles Active
            </h3>
            <p className='mt-2 max-w-md text-xs leading-relaxed font-normal text-slate-400'>
              There are currently no engineering component groups flagged for homepage feature arrays inside the cluster
              database dashboard configuration matrix.
            </p>

            {/* Micro Interaction Action Control Layout */}
            <div className='mt-6 flex items-center gap-3'>
              <button
                onClick={fetchTargetData}
                disabled={isPending}
                className='text-brand-primary inline-flex cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-xs transition-colors outline-none hover:bg-slate-50 disabled:opacity-60'>
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
