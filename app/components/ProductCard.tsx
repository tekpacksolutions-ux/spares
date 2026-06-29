'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ProductDetailModal from './ProductDetailModal';

export interface ProductFeature {
  key: string;
  value: string;
}

export interface ProductData {
  id: string;
  name: string;
  description: string; // Added description attribute
  partNumber: string;
  categoryName: string; // Explicitly showing relational configuration
  image: string;
  inStock: boolean;
  features: ProductFeature[];
}

interface ProductCardProps {
  product: ProductData;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className='group hover:border-brand-secondary hover:shadow-brand-secondary/5 flex cursor-pointer flex-col gap-4 rounded-sm border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-lg sm:flex-row'>
        {/* Left Aspect Side Image Column */}
        <div className='relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-sm bg-slate-50 sm:w-32 md:w-36'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes='(max-w-md) 100vw, 150px'
            className='object-cover p-3 transition-transform duration-500 group-hover:scale-105'
            loading='lazy'
          />
        </div>

        {/* Right Details Column */}
        <div className='flex flex-1 flex-col justify-between pt-1'>
          <div>
            {/* Category Relationship Mapping Label */}
            <span className='text-brand-secondary mb-0.5 block text-[9px] font-bold tracking-widest uppercase'>
              {product.categoryName}
            </span>

            {/* Product Structural Title */}
            <h3 className='text-brand-primary group-hover:text-brand-secondary line-clamp-1 text-sm font-bold tracking-tight transition-colors'>
              {product.name}
            </h3>

            {/* Brief Segmented Row Description */}
            <p className='mt-1.5 line-clamp-3 text-xs leading-relaxed font-normal text-slate-400'>
              {product.description}
            </p>
          </div>

          {/* Subtle Bottom Action Trigger */}
          <div className='text-brand-secondary mt-3 flex items-center justify-end text-[11px] font-bold tracking-wide uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
            View Specifications &rarr;
          </div>
        </div>
      </div>

      {/* Embedded Client Portal Overlay Modal Sheet */}
      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
