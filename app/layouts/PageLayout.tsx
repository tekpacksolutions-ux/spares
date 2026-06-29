import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main
      className={
        'bg-background text-foreground scrollbar-thumb-primary relative flex min-h-dvh max-w-dvw flex-col overflow-hidden'
      }>
      {children}
    </main>
  );
}
