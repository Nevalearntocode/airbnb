'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  resetTitle?: string;
};

const Empty = ({ showReset, subtitle, title, resetTitle }: Props) => {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Header title={title} subtitle={subtitle} center />
      <div className="mt-4 flex w-48 items-center justify-center">
        {showReset && (
          <Button variant={'destructive'} onClick={() => router.push(`/`)}>
            {resetTitle}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;
