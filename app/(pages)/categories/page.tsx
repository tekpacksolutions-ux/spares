'use client';

import React, { useCallback, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers, RefreshCw } from 'lucide-react';
import CategoryCard, { CategoryData as CardCategoryDataType } from '@/app/components/CategoryCard';
import { ContactSection, FooterSection } from '@/app/(pages)/(home)/section';
import { getAllCategories } from '@/sanity/lib/sanity.queries';

export interface ExtendedCategoryData extends CardCategoryDataType {
  slug: string;
  partCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ExtendedCategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  // 1. Memoize with useCallback to preserve reference identity
  const syncDirectoryData = useCallback(() => {
    // 2. Batch mutations inside startTransition to prevent synchronous cascading renders
    startTransition(async () => {
      setIsLoading(true);
      try {
        const data = await getAllCategories();
        setCategories((data as ExtendedCategoryData[]) || []);
      } catch (error) {
        console.error('Failed syncing live global category registry:', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    });
  }, []); // Empty dependency array ensures reference stability

  // 3. Effect safely runs on mount because syncDirectoryData is reference-stable
  useEffect(() => {
    syncDirectoryData();
  }, [syncDirectoryData]);

  return (
    <>
      <main className='min-h-screen border-t border-slate-100 bg-white py-12'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb Navigation Action Link */}
          <div className='mb-6'>
            <Link
              href='/'
              className='hover:text-brand-secondary inline-flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 uppercase transition-colors outline-none'>
              <ArrowLeft className='h-3.5 w-3.5' />
              Back to Homepage
            </Link>
          </div>

          {/* Section Title Header Block */}
          <div className='mb-12 max-w-3xl border-b border-slate-100 pb-8'>
            <span className='text-brand-secondary mb-2 block text-[10px] font-bold tracking-[0.2em] uppercase'>
              Global Components Directory
            </span>
            <h1 className='font-clash text-brand-primary text-3xl font-bold tracking-tight uppercase sm:text-4xl'>
              Browse Spares By Category
            </h1>
            <p className='mt-3 max-w-2xl text-xs leading-relaxed font-normal text-slate-500'>
              Select a specialized packaging machinery layout module to view our complete structural directory of
              technical configurations, sizing indices, and engineering availability metrics.
            </p>
          </div>

          {/* 1. Async Pending State Skeleton Loader Matrix */}
          {isLoading ? (
            <div className='mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className='flex animate-pulse flex-col gap-4 rounded-sm border border-slate-100 bg-white p-4'>
                  <div className='aspect-square w-full rounded-sm bg-slate-50' />
                  <div className='mx-auto h-4 w-2/3 rounded-xs bg-slate-100' />
                  <div className='mx-auto h-3 w-5/6 rounded-xs bg-slate-100' />
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            /* 2. Content Loaded Vector Grid Matrix */
            <div className='mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {categories.map((category) => (
                <CategoryCard
                  category={category}
                  key={category.id}
                />
              ))}
            </div>
          ) : (
            /* 3. Empty Workspace Fallback State Panel */
            <div className='mx-auto my-16 flex max-w-3xl flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-slate-50/50 p-12 py-12 text-center'>
              <div className='relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400'>
                <Layers className='h-6 w-6 stroke-[1.5]' />
                <div className='absolute inset-0 animate-ping rounded-full border border-slate-200 opacity-25' />
              </div>
              <span className='mb-1 font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase'>
                Data Node Unmapped // Null
              </span>
              <h3 className='font-clash text-brand-primary text-base font-bold tracking-tight uppercase'>
                No Active Categories Found
              </h3>
              <p className='mt-2 max-w-md text-xs leading-relaxed font-normal text-slate-400'>
                The content management server returned an empty directory layout layer. Please ensure categories are
                published inside your database studio instance.
              </p>
              <div className='mt-6'>
                <button
                  onClick={syncDirectoryData}
                  disabled={isPending}
                  className='text-brand-primary inline-flex cursor-pointer items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-bold shadow-xs transition-colors outline-none hover:bg-slate-50 disabled:opacity-60'>
                  <RefreshCw className={`h-3 w-3 ${isPending ? 'animate-spin' : ''}`} />
                  Retry Database Handshake
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <ContactSection />
      <FooterSection />
    </>
  );
}
