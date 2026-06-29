import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({ children, className = '', ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`bg-brand-secondary hover:text-brand-primary rounded-sm px-8 py-4 text-sm font-bold tracking-wide text-white shadow-md transition-colors duration-200 hover:bg-white ${className}`}>
      {children}
    </button>
  );
}
