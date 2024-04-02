'use client';

import useCountries from '@/hooks/use-country';
import { Listing, Profile, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartToggle from '../../components/heart-toggle';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';

type Props = {
  reservation: Reservation & {
    listing: Listing & {
      favoriteProfiles: {
        id: string;
      }[];
    };
  };
  profile: Profile;
};

const ReservationCard = ({ reservation, profile }: Props) => {
  const { onOpen } = useModal();
  const { listing, startDate, endDate, totalPrice } = reservation;
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

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
            sizes="auto"
            priority
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
          />
          {listing.profileId !== profile?.id && (
            <HeartToggle
              favProfileIds={listing.favoriteProfiles}
              profile={profile}
              slug={listing.slug}
            />
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="line-clamp-1 font-semibold">
            {location?.region}, {location?.label}
          </p>
          <span className="text-xs font-light text-neutral-500">
            {reservationDate}
          </span>
          <div className="flex items-center gap-1">
            <p className="font-semibold">$ {totalPrice}</p>
          </div>
          <Button
            variant={'destructive'}
            size={'sm'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpen('confirmGuest', { reservationId: reservation.id });
            }}
          >
            Cancel guest reservation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
