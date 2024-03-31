'use client';

import { categories } from '@/constants';
import React, { useMemo } from 'react';

type Props = {
  listingCategory: string;
};

const ListingCategory = ({ listingCategory }: Props) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listingCategory);
  }, [listingCategory]);

  const { label, icon: Icon, description } = category!;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{label}</p>
          <span className="font-light text-neutral-500">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
