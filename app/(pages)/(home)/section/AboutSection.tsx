import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section
      id='about'
      className='border-b border-slate-100 bg-white py-20'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center'>
          {/* Left Column: Core Narrative Stack */}
          <div>
            <span className='text-brand-secondary mb-3 block text-[10px] font-bold tracking-[0.2em] uppercase'>
              About Mass Spares
            </span>
            <h2 className='font-clash text-brand-primary text-3xl leading-tight font-bold tracking-tight uppercase sm:text-4xl'>
              Keeping High-Output Production Lines Moving.
            </h2>

            <p className='mt-5 text-sm leading-relaxed font-normal text-slate-500'>
              At Mass Spares, we specialize in manufacturing and distributing heavy-duty, high-precision replacement
              components for industrial packaging machinery. We understand that every hour of unexpected downtime
              carries heavy financial implications, which is why we engineer parts to exact OEM technical thresholds.
            </p>

            <p className='mt-4 text-sm leading-relaxed font-normal text-slate-500'>
              From localized thermal cartridge heaters and custom-profile cutting knives to high-torque gear arrays, our
              catalog is curated to support continuous-motion vertical form fill seal (VFFS) systems, multi-track flow
              wrappers, and high-speed sorting infrastructure.
            </p>

            {/* Quick Strategic Metrics Grid */}
            <div className='mt-8 grid grid-cols-2 gap-6 border-t border-slate-100 pt-8'>
              <div>
                <p className='font-clash text-brand-primary text-3xl font-bold'>99.8%</p>
                <p className='mt-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase'>
                  Dimensional Accuracy
                </p>
              </div>
              <div>
                <p className='font-clash text-brand-primary text-3xl font-bold'>24-48hr</p>
                <p className='mt-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase'>
                  Dispatch to Industrial Hubs
                </p>
              </div>
            </div>

            {/* CTA Directory Router Link */}
            <div className='mt-8'>
              <Link
                href='/categories'
                className='text-brand-secondary group hover:text-brand-primary inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase transition-colors'>
                Explore Full Directory
                <ArrowUpRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </Link>
            </div>
          </div>

          {/* Right Column: Split Dual Structural Visual Stage */}
          <div className='grid grid-cols-2 gap-4'>
            {/* Primary Dominant Image Frame */}
            <div className='relative aspect-4/5 w-full overflow-hidden rounded-sm border border-slate-100 bg-slate-50 shadow-sm'>
              <Image
                src='/image/ProductDemo.jpg'
                alt='Industrial processing and engineering manufacturing'
                fill
                sizes='(max-width: 1024px) 50vw, 33vw'
                className='h-full w-full object-cover brightness-[0.98]'
                priority
              />
              <div className='absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent' />
            </div>

            {/* Secondary Offset Image Frame Stack */}
            <div className='flex flex-col justify-between gap-4 pt-8'>
              <div className='relative aspect-square w-full flex-1 overflow-hidden rounded-sm border border-slate-100 bg-slate-50 shadow-sm'>
                <Image
                  src='/image/ProductDemo.jpg'
                  alt='Precision component verification setup'
                  fill
                  sizes='(max-width: 1024px) 50vw, 33vw'
                  className='h-full w-full object-cover'
                />
              </div>

              {/* Context Technical Callout Box */}
              <div className='flex min-h-35 flex-col justify-between rounded-sm border border-slate-200/60 bg-slate-50 p-5'>
                <span className='font-mono text-[9px] font-bold tracking-wider text-slate-400 uppercase'>
                  B2B PROCUREMENT //
                </span>
                <p className='mt-2 text-[11px] leading-relaxed font-medium text-slate-600'>
                  All components undergo rigorous multi-point verification testing against cyclic friction limits,
                  extreme heat, and load stresses before client dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
