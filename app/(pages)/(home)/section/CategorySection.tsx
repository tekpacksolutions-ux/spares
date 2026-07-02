'use client';

import React, { useCallback, useEffect, useState } from 'react';
import CategoryCard, { CategoryData } from '@/app/components/CategoryCard';
import SectionLayout from '@/app/layouts/SectionLayout';
import { getHighlightedCategories } from '@/sanity/lib/sanity.queries';

export default function CategorySection() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <section
        id='category'
        className='relative h-96 bg-white py-4'
      />
    );
  return <CategorySectionInner />;
}

function CategorySectionInner() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTargetData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getHighlightedCategories();
      setCategories(data || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
     fetchTargetData();
  }, [fetchTargetData]);

  return (
    <section
      id='category'
      className='relative scroll-mt-16 bg-white py-4'>
      {isLoading ? (
        <div className='h-64 animate-pulse bg-slate-50' />
      ) : (
        <SectionLayout<CategoryData>
          title='Shop By Category'
          items={categories}
          renderItem={(c) => (
            <CategoryCard
              key={c.id}
              category={c}
            />
          )}
        />
      )}
    </section>
  );
}
