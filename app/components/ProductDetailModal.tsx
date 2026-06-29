'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { ProductData } from './ProductCard';

interface ProductDetailModalProps {
  product: ProductData;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className='relative z-10 flex max-h-[90vh] w-full max-w-2xl transform flex-col overflow-hidden rounded-sm border border-slate-100 bg-white shadow-2xl transition-all'>
        {/* Header Action Row */}
        <div className='flex items-center justify-between border-b border-slate-100 p-4'>
          <span className='font-mono text-[10px] tracking-wider text-slate-400 uppercase'>
            Product Specification Sheet
          </span>
          <button
            onClick={onClose}
            className='hover:text-brand-primary rounded-xs p-1 text-slate-400 transition-colors hover:bg-slate-50'>
            <X className='h-5 w-5' />
          </button>
        </div>

        {/* Modal Scrollable Content Stage */}
        <div className='overflow-y-auto p-6'>
          <div className='flex flex-col gap-6 sm:flex-row'>
            {/* Left: Product Media Stage */}
            <div className='relative flex aspect-square w-full shrink-0 items-center justify-center rounded-sm border border-slate-100 bg-slate-50 sm:w-56'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes='(max-w-md) 100vw, 224px'
                className='object-cover p-4'
                priority
              />
            </div>

            {/* Right: Core Information Stack */}
            <div className='flex flex-1 flex-col justify-between'>
              <div>
                <span className='text-brand-secondary mb-1 block text-xs font-bold tracking-widest uppercase'>
                  {product.categoryName}
                </span>

                <h3 className='font-clash text-brand-primary text-xl font-bold tracking-tight sm:text-2xl'>
                  {product.name}
                </h3>

                <div className='mt-2 flex items-center gap-3'>
                  <span className='rounded-xs bg-slate-100 px-2 py-0.5 font-mono text-[11px] tracking-tight text-slate-500'>
                    P/N: {product.partNumber}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 rounded-xs border px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      product.inStock
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-rose-200 bg-rose-50 text-rose-700'
                    }`}>
                    {product.inStock ? (
                      <>
                        <CheckCircle className='h-3 w-3 stroke-[2.5]' />
                        In Stock
                      </>
                    ) : (
                      <>
                        <AlertTriangle className='h-3 w-3 stroke-[2.5]' />
                        On Request
                      </>
                    )}
                  </span>
                </div>

                <p className='mt-4 text-sm leading-relaxed font-normal text-slate-500'>{product.description}</p>
              </div>
            </div>
          </div>

          {/* Technical Data Sheet Block (5 features) */}
          {product.features && product.features.length > 0 && (
            <div className='mt-6 border-t border-slate-100 pt-5'>
              <h4 className='text-brand-primary mb-3 text-xs font-bold tracking-wider uppercase'>
                Technical Specifications
              </h4>
              <div className='overflow-hidden rounded-sm border border-slate-100'>
                <dl className='divide-y divide-slate-100'>
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className='grid grid-cols-2 bg-white px-4 py-2.5 text-xs sm:grid-cols-3'>
                      <dt className='font-medium text-slate-400 sm:col-span-1'>{feature.key}</dt>
                      <dd className='text-right font-semibold text-slate-700 sm:col-span-2 sm:text-left'>
                        {feature.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Call to Action */}
        <div className='flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-4'>
          <button
            onClick={onClose}
            className='rounded-sm border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50'>
            Close Specification
          </button>
          <button className='bg-brand-secondary hover:bg-brand-primary rounded-sm px-5 py-2 text-xs font-bold text-white shadow-sm transition-colors'>
            Inquire For Quote
          </button>
        </div>
      </div>
    </div>
  );
}
