'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  imageUrl?: string | null;
  className?: string;
};

const NavAvatar = ({ imageUrl, className }: Props) => {
  return (
    <Avatar className="">
      {imageUrl && <AvatarImage src={imageUrl} className={cn('', className)} />}
      <AvatarFallback className="">
        <Image
          className="rounded-full"
          height={30}
          width={30}
          alt="avatar"
          src={`/images/placeholder.jpg`}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default NavAvatar;
