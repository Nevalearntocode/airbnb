'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { cn } from '@/lib/utils';
import { Profile } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'sonner';

type Props = {
  profile: Profile | null;
  slug: string;
  className?: string;
  favProfileIds: {
    id: String
  }[]
};

const HeartToggle = ({profile, slug, favProfileIds }: Props) => {
  const [favorited, setFavorited] = useState(
    favProfileIds.some((favProfile) => favProfile.id === profile?.id)
  );

  useEffect(() => {
    setFavorited(
      favProfileIds.some((favProfile) => favProfile.id === profile?.id),
    );
  }, [favProfileIds, profile?.id])
  const { onOpen } = useModal();

  const onFavorite = async () => {
    try {
      await axios.patch(`/api/listings/${slug}/favorite`);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <Button
      className="absolute right-0 top-0 bg-transparent hover:bg-transparent"
      variant={'ghost'}
      size={'icon'}
      onClick={(e) => {
        e.stopPropagation();
        if (!profile) {
          toast.info('You need to login to favorite a place');
          onOpen('login');
        } else {
          onFavorite();
          setFavorited(!favorited);
        }
      }}
    >
      <AiOutlineHeart size={28} className="absolute fill-white" />
      <AiFillHeart
        size={24}
        className={cn(
          'fill-neutral-500/70 transition duration-500 hover:fill-neutral-500',
          favorited &&
            'fill-rose-500 transition duration-500 hover:fill-rose-300',
        )}
      />
    </Button>
  );
};

export default HeartToggle;
