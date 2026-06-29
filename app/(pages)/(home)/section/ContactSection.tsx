'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import PrimaryButton from '@/app/components/PrimaryButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to dispatch RFQ.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected structural communication error occurred.');
      }
    }
  };

  return (
    <section
      id='contact'
      className='bg-white py-16'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 lg:px-12'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-5'>
          {/* Left Column: Corporate Information Deck */}
          <div className='flex flex-col justify-between lg:col-span-2'>
            <div>
              <span className='text-brand-secondary mb-2 block text-[10px] font-bold tracking-[0.2em] uppercase'>
                Procurement & RFQ Hub
              </span>
              <h2 className='font-clash text-brand-primary text-2xl font-bold tracking-tight uppercase sm:text-4xl'>
                Connect with Mass Spares
              </h2>
              <p className='mt-4 max-w-sm text-sm leading-relaxed font-normal text-slate-500'>
                Submit your parts schedule, specifications, or request a volume quote. Our engineering desk will confirm
                pricing and logistics options.
              </p>

              {/* Direct Info Channels */}
              <div className='mt-8 space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='text-brand-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-slate-50'>
                    <Phone className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold tracking-wider text-slate-400 uppercase'>Direct Hotline</p>
                    <p className='text-brand-primary mt-0.5 text-sm font-bold'>+91 (022) 555-0192</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='text-brand-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-slate-50'>
                    <Mail className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold tracking-wider text-slate-400 uppercase'>
                      Technical Sales Email
                    </p>
                    <p className='text-brand-primary mt-0.5 text-sm font-bold'>sales@massspares.com</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='text-brand-secondary flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-slate-50'>
                    <MapPin className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='text-xs font-semibold tracking-wider text-slate-400 uppercase'>Distribution Hub</p>
                    <p className='text-brand-primary mt-0.5 text-sm leading-relaxed font-bold'>
                      Plot 42, Industrial Engineering Zone,
                      <br />
                      Phase II, New Delhi, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8 hidden border-t border-slate-100 pt-6 lg:block'>
              <span className='font-mono text-[10px] text-slate-400 uppercase'>
                SECURE RFQ PIPELINE // ENCRYPTED VIA RESEND
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Form Node */}
          <div className='rounded-sm border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 lg:col-span-3'>
            <form
              onSubmit={handleSubmit}
              className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='name'
                    className='text-brand-primary mb-1 block text-xs font-bold tracking-wide uppercase'>
                    Full Name <span className='text-rose-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className='text-brand-primary focus:border-brand-secondary w-full rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none disabled:bg-slate-100'
                    placeholder='Sanjay Kumar'
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='text-brand-primary mb-1 block text-xs font-bold tracking-wide uppercase'>
                    Corporate Email <span className='text-rose-500'>*</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className='text-brand-primary focus:border-brand-secondary w-full rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none disabled:bg-slate-100'
                    placeholder='sanjay@company.com'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='company'
                    className='text-brand-primary mb-1 block text-xs font-bold tracking-wide uppercase'>
                    Company Name
                  </label>
                  <input
                    type='text'
                    id='company'
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className='text-brand-primary focus:border-brand-secondary w-full rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none disabled:bg-slate-100'
                    placeholder='Tekpack Automation'
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='text-brand-primary mb-1 block text-xs font-bold tracking-wide uppercase'>
                    Phone / WhatsApp
                  </label>
                  <input
                    type='text'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className='text-brand-primary focus:border-brand-secondary w-full rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none disabled:bg-slate-100'
                    placeholder='+91 98765 43210'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='text-brand-primary mb-1 block text-xs font-bold tracking-wide uppercase'>
                  Inquiry Details / Part Numbers <span className='text-rose-500'>*</span>
                </label>
                <textarea
                  id='message'
                  name='message'
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className='text-brand-primary focus:border-brand-secondary w-full resize-none rounded-sm border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder-slate-400 focus:outline-none disabled:bg-slate-100'
                  placeholder='Please specify part identifiers, sizing specifications, and volume quantities...'
                />
              </div>

              {/* Status Indicators Notifications */}
              {status === 'success' && (
                <div className='flex items-center gap-2 rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-800'>
                  <CheckCircle2 className='h-4 w-4 shrink-0 text-emerald-600' />
                  <span>Inquiry safely dispatched to Mass Spares. Our engineering desk will follow up shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className='flex items-center gap-2 rounded-sm border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800'>
                  <AlertCircle className='h-4 w-4 shrink-0 text-rose-600' />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submission CTA Trigger */}
              <div className='flex justify-end pt-2'>
                <PrimaryButton
                  type='submit'
                  disabled={status === 'submitting'}
                  className='flex w-full min-w-40 items-center justify-center gap-2 sm:w-auto'>
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit RFQ
                      <Send className='h-3.5 w-3.5' />
                    </>
                  )}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
