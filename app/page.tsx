import type { Metadata } from 'next';
import HomePage from '@/app/(pages)/(home)/HomePage';

export const metadata: Metadata = {
  title: 'Packing Machine Spares & Industrial Automation Parts in Coimbatore',
  description:
    'Leading supplier of high-precision packing machine spare parts in Coimbatore. Providing top-quality gear wheels, heaters, sensors, and controllers for industrial automation with pan-India delivery.',
  keywords: [
    'packing machine spares Coimbatore',
    'industrial automation parts India',
    'packaging machine components',
    'industrial heater supplier',
    'Mass Spares Coimbatore',
    'spare parts for packing machines',
  ],
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return <HomePage />;
}
