'use client';

import React from 'react';
import Link from 'next/link';
import PrimaryButton from '@/app/components/PrimaryButton';
import SecondaryButton from '@/app/components/SecondaryButton';
import { ArrowRight, Award, Box, CircleDollarSign, Truck, Users } from 'lucide-react';

export default function LandingSection() {
  return (
    <section
      id='home'
      className='relative flex min-h-screen w-full flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-20'>
      {/* Pure Background Video Canvas */}
      <video
        className='absolute inset-0 z-0 h-full w-full object-cover brightness-50'
        autoPlay
        loop
        muted
        playsInline>
        <source
          src='/video/background.mp4'
          type='video/mp4'
          title='Industrial automation background'
        />
      </video>

      {/* Hero Content Block */}
      <div className='relative z-10 my-auto flex w-full max-w-7xl flex-col justify-center pt-16 pb-8'>
        <div className='max-w-3xl'>
          {/* Technical Dynamic Tagline */}
          <div className='border-brand-secondary mb-6 border-l-2 pl-4'>
            <p className='text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase'>
              Built for Precision • Designed for Performance
            </p>
          </div>

          {/* Typography Header utilizing your custom Clash Display Font */}
          <h1 className='font-clash text-4xl leading-[1.1] font-semibold tracking-normal text-white uppercase sm:text-5xl lg:text-7xl'>
            Complete Range of
            <span className='ml-4 text-slate-300'>Packing Machine Spares</span>
          </h1>

          {/* Paragraph description */}
          <p className='mt-4 max-w-xl text-base leading-relaxed font-normal text-slate-400 sm:text-lg'>
            Gear wheels, shafts, heaters, sensors, controllers, valves and more—all you need, under one roof. Engineered
            for continuous, high-volume industrial deployment.
          </p>

          {/* Action Button Blocks with Link Wrappers */}
          <div className='mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center'>
            {/* Navigates directly to the All Categories internal directory page */}
            <Link
              href='/categories'
              className='flex outline-none'>
              <PrimaryButton className='flex w-full items-center justify-center gap-3 sm:w-auto'>
                Explore Products
                <ArrowRight className='h-4 w-4' />
              </PrimaryButton>
            </Link>

            {/* Smooth-scrolls down into the contact/RFQ footer module */}
            <Link
              href='#contact'
              className='flex outline-none'>
              <SecondaryButton className='flex w-full items-center justify-center gap-3 sm:w-auto'>
                Request a Quote
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Responsive & Modular Metrics Foundation Bar */}
      <footer className='relative z-10 mt-auto w-full rounded-sm border-t border-white/10 bg-black/40 backdrop-blur-md'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='grid grid-cols-2 divide-x divide-y divide-white/10 border-r border-b border-white/10 md:grid-cols-5 md:divide-y-0 md:border-none'>
            <div className='flex items-center gap-3 p-4 lg:p-6'>
              <Award
                className='text-brand-secondary h-5 w-5 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <p className='text-xs leading-tight font-bold text-white'>Premium Quality</p>
                <p className='mt-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase'>Tested Spares</p>
              </div>
            </div>

            <div className='flex items-center gap-3 p-4 lg:p-6'>
              <Box
                className='text-brand-secondary h-5 w-5 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <p className='text-xs leading-tight font-bold text-white'>Extensive Range</p>
                <p className='mt-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase'>
                  Deep Inventory
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3 p-4 lg:p-6'>
              <CircleDollarSign
                className='text-brand-secondary h-5 w-5 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <p className='text-xs leading-tight font-bold text-white'>Competitive Pricing</p>
                <p className='mt-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase'>Direct Rates</p>
              </div>
            </div>

            <div className='flex items-center gap-3 p-4 lg:p-6'>
              <Truck
                className='text-brand-secondary h-5 w-5 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <p className='text-xs leading-tight font-bold text-white'>Fast Delivery</p>
                <p className='mt-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase'>Pan India</p>
              </div>
            </div>

            <div className='col-span-2 flex items-center justify-center gap-3 p-4 md:col-span-1 md:justify-start lg:p-6'>
              <Users
                className='text-brand-secondary h-5 w-5 shrink-0'
                strokeWidth={1.5}
              />
              <div>
                <p className='text-xs leading-tight font-bold text-white'>Expert Support</p>
                <p className='mt-0.5 text-[9px] font-semibold tracking-wider text-slate-400 uppercase'>Technical Hub</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
