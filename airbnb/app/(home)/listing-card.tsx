'use client';

import useCountries from '@/hooks/use-country';
import { Listing, Profile, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';
import { useModal } from '@/hooks/use-modal-store';

type Props = {
  Listing: Listing & {
    reservations: Reservation[];
    favoriteProfiles: {
      id: string;
    }[];
  };
  profile: Profile | null;
  isFav: boolean;
};

const formatResult = (start: string, end: string) => {
  return `${format(start, 'PP')} - ${format(end, 'PP')}`;
};

const ListingCard = ({ Listing, profile, isFav }: Props) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(Listing.locationValue);
  const [favorited, setFavorited] = useState(isFav);
  const { onOpen } = useModal();

  useEffect(() => {
    setFavorited(isFav);
    console.log('render');
  }, [isFav]);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  const price = useMemo(() => {
    if (Listing.reservations) {
      let result = 0;
      Listing.reservations.forEach(
        (reservation) => reservation.totalPrice + result,
      );
      return result;
    }
  }, [Listing]);

  const onFavorite = async () => {
    try {
      await axios.patch(`/api/listings/${Listing.slug}/favorite`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="group col-span-1"
      onClick={() => {
        console.log(Listing.slug);
        router.push(`/listings/${Listing.slug}`);
      }}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl">
          <Image
            src={Listing.imageUrl}
            alt={Listing.title}
            fill
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
          />
          <Button
            className="lg: absolute right-0 top-0 bg-transparent hover:bg-transparent"
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
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="font-semibold">
            {location?.region}, {location?.label}
          </p>
          <span className="font-light text-neutral-500">
            {Listing.category}
          </span>
          <div className="flex items-center gap-1">
            <p className="font-semibold">$ {Listing.price}</p>
            {Listing.reservations && <p className="font-light">night</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
