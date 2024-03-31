'use client';

import useCountries from '@/hooks/use-country';
import { Listing, Profile, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartToggle from './heart-toggle';

type Props = {
  listing: Listing & {
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

const ListingCard = ({ listing, profile, isFav }: Props) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  const price = useMemo(() => {
    if (listing.reservations) {
      let result = 0;
      listing.reservations.forEach(
        (reservation) => reservation.totalPrice + result,
      );
      return result;
    }
  }, [listing]);

  return (
    <div
      className="group col-span-1"
      onClick={() => {
        console.log(listing.slug);
        router.push(`/listings/${listing.slug}`);
      }}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
          />
          <HeartToggle isFav={isFav} profile={profile} slug={listing.slug} />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="font-semibold">
            {location?.region}, {location?.label}
          </p>
          <span className="font-light text-neutral-500">
            {listing.category}
          </span>
          <div className="flex items-center gap-1">
            <p className="font-semibold">$ {listing.price}</p>
            {listing.reservations && <p className="font-light">night</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
