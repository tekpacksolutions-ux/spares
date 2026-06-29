'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { getAllCategories } from '@/sanity/lib/sanity.queries';

interface MinimalCategory {
  id: string;
  slug: string;
  name: string;
}

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  const [footerCategories, setFooterCategories] = useState<MinimalCategory[]>([]);

  useEffect(() => {
    async function syncFooterLinks() {
      try {
        const data = await getAllCategories();
        if (data && Array.isArray(data)) {
          setFooterCategories(data.slice(0, 10));
        }
      } catch (error) {
        console.error('Failed indexing categories for dynamic foot nav mapping:', error);
      }
    }
    syncFooterLinks();
  }, []);

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/919150040034', icon: <FaWhatsapp className='h-4 w-4' /> },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/mass_automation1?igsh=MWIzNzE4eThmaTNkOQ==',
      icon: <FaInstagram className='h-4 w-4' />,
    },
    { name: 'X / Twitter', href: 'https://x.com/Massindustrycbe', icon: <FaXTwitter className='h-3.5 w-3.5' /> },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mass-industries-0b0a13416',
      icon: <FaLinkedinIn className='h-4 w-4' />,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@massautomationandsmartsystems?si=41zVFxq3OpqPr5rG',
      icon: <FaYoutube className='h-4 w-4' />,
    },
  ];

  const coreNavLinks = [
    { name: 'Home Directory', href: '/' },
    { name: 'All Categories', href: '/categories' },
    { name: 'About Engineering', href: '/#about' },
    { name: 'Product Index', href: '/#features' },
  ];

  return (
    <footer
      id='contact'
      className='border-t border-slate-900 bg-slate-950 pt-16 pb-8 text-white'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        {/* Top Segmented Grid Layout Block */}
        <div className='grid grid-cols-1 gap-10 border-b border-slate-900 pb-12 md:grid-cols-4'>
          {/* Brand Frame Module */}
          <div className='md:col-span-1'>
            <span className='font-clash text-lg font-bold tracking-tight uppercase'>
              Mass<span className='text-brand-secondary'>Spares</span>
            </span>
            <p className='mt-4 max-w-xs text-xs leading-relaxed font-normal text-slate-400'>
              High-precision engineering and manufacturing of heavy-duty replacement spare parts custom balanced for
              industrial packing machinery.
            </p>

            {/* Social Matrix Row */}
            <div className='mt-6 flex items-center gap-3'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-brand-secondary hover:border-brand-secondary/40 flex h-8 w-8 items-center justify-center rounded-sm border border-slate-800 bg-slate-900 text-slate-400 transition-colors'
                  title={social.name}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Core System Navigation Links */}
          <div className='md:pl-8'>
            <h4 className='text-brand-secondary text-[10px] font-bold tracking-[0.2em] uppercase'>Navigation</h4>
            <ul className='mt-4 space-y-2.5'>
              {coreNavLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='inline-flex items-center gap-1 text-xs text-slate-400 transition-colors outline-none hover:text-white'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dynamic Inventory Categories Node Index */}
          <div>
            {footerCategories.length > 0 && (
              <>
                <h4 className='text-brand-secondary text-[10px] font-bold tracking-[0.2em] uppercase'>
                  Top Component Clusters
                </h4>
                <ul className='mt-4 space-y-2.5'>
                  {footerCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/products?category=${category.slug}`}
                        className='inline-flex max-w-full items-center gap-1 truncate text-xs text-slate-400 transition-colors outline-none hover:text-white'>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Corporate HQ Technical Coordinates info column */}
          <div>
            <h4 className='text-brand-secondary mb-4 text-[10px] font-bold tracking-[0.2em] uppercase'>
              Corporate Headquarters & Logistics
            </h4>

            <div className='space-y-4 text-xs font-normal text-slate-400'>
              <div className='flex items-start gap-3'>
                <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-slate-500' />
                <p className='leading-relaxed'>
                  149, Trichy Road, Cindhamanipudur,
                  <br />
                  Pallapalayam, Coimbatore,
                  <br />
                  Tamil Nadu — 641103
                </p>
              </div>

              <div className='flex items-start gap-3 border-t border-slate-900 pt-3'>
                <Phone className='mt-0.5 h-4 w-4 shrink-0 text-slate-500' />
                <div className='space-y-1 font-mono tracking-tight text-slate-300'>
                  <a
                    href='tel:+919150040034'
                    className='hover:text-brand-secondary block transition-colors outline-none'>
                    +91 91500 40034
                  </a>
                  <a
                    href='tel:+919150040037'
                    className='hover:text-brand-secondary block transition-colors outline-none'>
                    +91 91500 40037
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Verification & Copyright Row Block */}
        <div className='mt-8 flex flex-col items-center justify-between gap-4 font-mono text-[10px] tracking-wider text-slate-500 sm:flex-row'>
          <div>&copy; {currentYear} MASS SPARES. ALL RIGHTS RESERVED INDICES.</div>
          <div className='flex gap-4 uppercase'>
            <span>B2B Verification Verified</span>
            {/* Swapped inline comment syntax to valid evaluation blocks to bypass react/jsx-no-comment-textnodes */}
            <span>{'//'}</span>
            <span>Procurement Engineering Cluster</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
