import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionLayoutProps<T> {
  title: string;
  viewAllLink?: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columnsClassName?: string;
}

export default function SectionLayout<T>({
  title,
  viewAllLink,
  items,
  renderItem,
  columnsClassName = 'grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:grid-cols-6',
}: SectionLayoutProps<T>) {
  return (
    <section className='border-b border-slate-100 bg-white py-16'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        {/* Modular Header Configuration */}
        <div className='mb-10 flex items-end justify-between border-b border-slate-100 pb-5'>
          <h2 className='font-clash text-brand-primary text-2xl font-bold tracking-tight uppercase sm:text-3xl'>
            {title}
          </h2>

          {viewAllLink && (
            <Link
              href={'/categories'}
              className='group text-brand-secondary hover:text-brand-primary flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors'>
              View All
              <ArrowRight className='h-3 w-3 transition-transform duration-200 group-hover:translate-x-1' />
            </Link>
          )}
        </div>

        {/* Dynamic Mapping Core Injection */}
        <div className={columnsClassName}>{items.map((item, index) => renderItem(item, index))}</div>
      </div>
    </section>
  );
}
