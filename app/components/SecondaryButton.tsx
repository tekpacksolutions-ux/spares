import React from 'react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function SecondaryButton({ children, className = '', ...props }: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-sm border border-slate-500 bg-transparent px-8 py-4 text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:border-white hover:bg-white/5 ${className}`}>
      {children}
    </button>
  );
}
