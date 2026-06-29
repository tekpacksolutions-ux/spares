import React from 'react';
import { ShieldCheck, Zap, Factory, Award, LifeBuoy, Scale } from 'lucide-react';

export default function FeatureSection() {
  const coreStrengths = [
    {
      icon: Factory,
      title: 'Industrial Deployment Ready',
      description:
        'Engineered specifically for continuous, high-volume production setups. Built to minimize cyclical downtime.',
    },
    {
      icon: ShieldCheck,
      title: 'OEM Grade Specifications',
      description:
        'Every spare component matches precise physical tolerances, structural metrics, and material properties.',
    },
    {
      icon: Scale,
      title: 'Direct Factory Rates',
      description:
        'Transparent B2B cost models without added multi-tier supply chain markups or third-party sourcing fees.',
    },
    {
      icon: Zap,
      title: 'Rapid India Logistics',
      description:
        'Fast, secure dispatch networks across industrial hubs ensuring parts arrive when your line requires them.',
    },
    {
      icon: Award,
      title: 'Certified Performance',
      description:
        'Strict quality control testing against dynamic thermal stress, friction limits, and high operating pressures.',
    },
    {
      icon: LifeBuoy,
      title: 'Direct Engineering Support',
      description:
        'Access dedicated mechanical and electrical technical assistance to assist with precise component cross-mapping.',
    },
  ];

  return (
    <section
      id='features'
      className='border-b border-slate-200/60 bg-slate-50 py-16'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        {/* Section Header */}
        <div className='mb-12 max-w-3xl'>
          <span className='text-brand-secondary mb-2 block text-[10px] font-bold tracking-[0.2em] uppercase'>
            Why Partner With Mass Spares
          </span>
          <h2 className='font-clash text-brand-primary text-2xl font-bold tracking-tight uppercase sm:text-4xl'>
            Built for Scale. Engineered for Precision.
          </h2>
          <p className='mt-3 max-w-2xl text-sm leading-relaxed font-normal text-slate-500'>
            We deliver critical, heavy-duty packing machinery components designed to maintain high performance in
            demanding industrial manufacturing environments.
          </p>
        </div>

        {/* Features Structural Grid Layout */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {coreStrengths.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className='group hover:border-brand-secondary relative flex flex-col justify-between rounded-sm border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:shadow-md'>
                <div>
                  {/* Icon Frame */}
                  <div className='text-brand-secondary group-hover:bg-brand-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 transition-colors group-hover:text-white'>
                    <IconComponent
                      className='h-5 w-5'
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Feature Text Info */}
                  <h3 className='text-brand-primary group-hover:text-brand-secondary text-base font-bold tracking-tight transition-colors'>
                    {feature.title}
                  </h3>
                  <p className='mt-2 text-xs leading-relaxed font-normal text-slate-400'>{feature.description}</p>
                </div>

                {/* Subtle Technical Visual Anchor */}
                <div className='mt-4 flex items-center justify-between border-t border-slate-100 pt-3'>
                  <span className='font-mono text-[9px] tracking-tight text-slate-300'>SYSTEM REF // 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
