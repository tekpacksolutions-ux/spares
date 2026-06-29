import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface CategoryData {
  id: string;
  slug: string; // Added architectural path identifier
  name: string;
  description: string;
  image: string;
}

interface CategoryCardProps {
  category: CategoryData;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className='group hover:border-brand-secondary hover:shadow-brand-secondary/5 flex cursor-pointer flex-col items-center justify-between rounded-sm border border-slate-200 bg-white p-4 transition-all duration-300 outline-none hover:shadow-lg'>
      <div>
        {/* Image Container with subtle scale on hover */}
        <div className='relative mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-sm border border-slate-100/40 bg-slate-50'>
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes='(max-w-7xl) 20vw, 25vw'
            className='object-cover p-2 transition-transform duration-500 group-hover:scale-110'
            loading='lazy'
          />
        </div>

        {/* Typography */}
        <div className='w-full text-center'>
          <h3 className='text-brand-primary group-hover:text-brand-secondary line-clamp-1 text-sm font-bold tracking-tight transition-colors'>
            {category.name}
          </h3>
          <p className='mt-1 line-clamp-2 text-[10px] leading-relaxed font-medium text-slate-400'>
            {category.description}
          </p>
        </div>
      </div>

      {/* Hidden layout buffer matching original structural layout metrics */}
      <div className='mt-2 w-full' />
    </Link>
  );
}
