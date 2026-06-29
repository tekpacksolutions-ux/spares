import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import React from 'react';

// 1. Define your canonical URL and business details
const SITE_URL = 'https://www.massspares.com'; // Replace with your actual domain
const SITE_NAME = 'Mass Spares | Industrial Packing Machine Parts';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const clashDisplay = localFont({
  variable: '--font-clash-display',
  src: [
    { path: '../public/font/ClashDisplay-Extralight.otf', weight: '200' },
    { path: '../public/font/ClashDisplay-Light.otf', weight: '300' },
    { path: '../public/font/ClashDisplay-Regular.otf', weight: '400' },
    { path: '../public/font/ClashDisplay-Medium.otf', weight: '500' },
    { path: '../public/font/ClashDisplay-Semibold.otf', weight: '600' },
    { path: '../public/font/ClashDisplay-Bold.otf', weight: '700' },
  ],
});

// 2. Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Leading supplier of high-precision packing machine spare parts in Coimbatore. Explore our extensive range of gear wheels, heaters, sensors, and controllers for industrial automation.',
  keywords: [
    'packing machine spares',
    'industrial automation parts',
    'industrial heater supplier',
    'Coimbatore spare parts',
    'packaging machine components',
  ],
  authors: [{ name: 'Mass Spares' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_NAME,
    description:
      'High-quality industrial packing machine spare parts. Reliable, durable, and fast delivery across India.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }], // Ensure you have an OG image in your public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 3. Structured Data (JSON-LD) for Local Business Ranking
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Mass Spares',
    'description': 'Industrial packing machine spare parts supplier in Coimbatore.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '149, Trichy Road, Cindhamanipudur, Pallapalayam',
      'addressLocality': 'Coimbatore',
      'addressRegion': 'Tamil Nadu',
      'postalCode': '641103',
      'addressCountry': 'IN',
    },
    'telephone': '+919150040034',
    'url': SITE_URL,
  };

  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} h-full antialiased`}>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <title>Mass Spares</title>
      </head>
      <body className='flex min-h-full flex-col font-sans'>{children}</body>
    </html>
  );
}
