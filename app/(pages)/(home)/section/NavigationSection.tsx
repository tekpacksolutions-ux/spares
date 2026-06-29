'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import PrimaryButton from '@/app/components/PrimaryButton';

export default function NavigationSection() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLandingPage = pathname === '/';

  // Core navigation configurations mapped against structural route actions
  const navLinks = [
    { name: 'Home', href: '/', isScroll: true },
    { name: 'Category', href: '/categories', isScroll: false },
    { name: 'About', href: '#about', isScroll: true },
    { name: 'Products', href: '#features', isScroll: true }, // Targets the core feature checklist layout
    { name: 'Contact', href: '#contact', isScroll: true },
  ];

  // Intercept scroll trigger to execute fallback routing safely if off-home
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isScroll: boolean) => {
    setIsOpen(false);

    if (isScroll && !isLandingPage) {
      e.preventDefault();
      // Route back to home root with anchor target attached
      router.push(`/${href}`);
    }
  };

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left Column: Core Corporate Logo Asset */}
          <div className='flex shrink-0'>
            <Link
              href='/'
              className='flex items-center gap-2 outline-none'>
              <span className='font-clash text-brand-primary text-lg font-bold tracking-tight uppercase'>
                Mass<span className='text-brand-secondary ml-1'>Spares</span>
              </span>
            </Link>
          </div>

          {/* Center Column: Desktop Structural Navigation Node */}
          <div className='hidden items-center gap-8 md:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.isScroll && isLandingPage ? link.href : link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isScroll)}
                className='hover:text-brand-secondary text-xs font-bold tracking-widest text-slate-500 uppercase transition-colors'>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Column: CTA Trigger Node */}
          <div className='hidden items-center md:flex'>
            <Link
              href={isLandingPage ? '#contact' : '/#contact'}
              onClick={(e) => handleNavClick(e, '#contact', true)}
              className='outline-none'>
              <PrimaryButton className='flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs'>
                Submit RFQ
                <ArrowUpRight className='h-3.5 w-3.5' />
              </PrimaryButton>
            </Link>
          </div>

          {/* Mobile Shell Menu Toggle Button */}
          <div className='flex md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='hover:text-brand-primary inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-50 focus:outline-none'>
              {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Layout Panel Drawer */}
      {isOpen && (
        <div className='absolute left-0 w-full space-y-3 border-t border-slate-100 bg-white px-6 py-4 shadow-lg transition-all duration-200 md:hidden'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.isScroll && isLandingPage ? link.href : link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isScroll)}
              className='block border-b border-slate-50/60 py-2 text-xs font-bold tracking-wider text-slate-600 uppercase'>
              {link.name}
            </Link>
          ))}
          <div className='pt-2'>
            <Link
              href={isLandingPage ? '#contact' : '/#contact'}
              onClick={(e) => handleNavClick(e, '#contact', true)}
              className='block w-full'>
              <PrimaryButton className='flex w-full items-center justify-center gap-1.5 rounded-sm py-2.5 text-xs'>
                Submit RFQ
                <ArrowUpRight className='h-3.5 w-3.5' />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
