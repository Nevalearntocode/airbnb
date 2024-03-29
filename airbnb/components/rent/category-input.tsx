'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  label: string;
  description: string;
  icon: IconType;
  onClick: (value: string) => void;
  selected?: boolean;
};

const CategoryInput = ({
  description,
  icon: Icon,
  label,
  onClick,
  selected,
}: Props) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick(label);
      }}
      className={cn(
        'flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-neutral-200 p-4 transition hover:border-black dark:border-neutral-800',
        selected && 'border-black dark:border-white',
      )}
    >
      <Icon />
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default CategoryInput;
