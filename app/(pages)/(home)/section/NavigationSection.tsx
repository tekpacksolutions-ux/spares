'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function NavigationSection() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLandingPage = pathname === '/';


  const navLinks = [
    { name: 'Home', href: '/', isScroll: true },
    { name: 'Category', href: '/categories', isScroll: false },
    { name: 'About', href: '#about', isScroll: true },
    { name: 'Products', href: '#features', isScroll: true },
    { name: 'Contact', href: '#contact', isScroll: true },
    { name: 'Admin', href: '/studio', isScroll: false },
  ];


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isScroll: boolean) => {
    setIsOpen(false);

    if (isScroll && !isLandingPage) {
      e.preventDefault();
      // Route back to home root with anchor target attached
      router.push(`/${href}`);
    }
  };

  // Centralized WhatsApp endpoint string assignment
  const whatsappUrl = 'https://wa.me/919150040034';

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        <div className='flex h-16 items-center justify-between'>
          {/* Left Column: Core Corporate Logo Asset */}
          <div className='flex shrink-0'>
            <Link
              href='/'
              className='flex items-center gap-2 outline-none'>
              <span className='font-clash text-brand-primary text-xl sm:text-3xl  font-bold tracking-wider uppercase'>
                Mass
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

          {/* Right Column: WhatsApp CTA Trigger Node */}
          <div className='hidden items-center md:flex'>
            <a
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-transform duration-150 outline-none hover:bg-[#20ba56] active:scale-[0.98]'>
              <MessageCircle className='h-4 w-4 fill-white' />
              Chat On WhatsApp
            </a>
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
            <a
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => setIsOpen(false)}
              className='flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-sm transition-colors hover:bg-[#20ba56]'>
              <MessageCircle className='h-4 w-4 fill-white' />
              Chat On WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
