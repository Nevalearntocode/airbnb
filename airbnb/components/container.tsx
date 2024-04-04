'use client';

import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
