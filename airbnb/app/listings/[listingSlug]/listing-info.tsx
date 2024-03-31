'use client';

import NavAvatar from '@/components/navbar/nav-avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useCountries from '@/hooks/use-country';
import { Listing, Profile } from '@prisma/client';
import React from 'react';
import ListingCategory from './listing-category';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});

type Props = {
  listing: Listing & {
    profile: Profile;
  };
};

const ListingInfo = ({ listing }: Props) => {
  const {
    profile,
    locationValue,
    guestCount,
    roomCount,
    bathRoomCount,
    category,
    description,
  } = listing;
  const { getByValue } = useCountries();

  const coordinate = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 mt-4 flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <p>Hosted by {profile.name}</p>
          <Button variant={`outline`} className="rounded-full" size={'icon'}>
            <NavAvatar
              imageUrl={profile.image}
              className="transition duration-500 hover:scale-110"
            />
          </Button>
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathRoomCount} bathrooms</span>
        </div>
      </div>
      <Separator className="mt-0 h-[2px] w-full pt-0" />
      <ListingCategory listingCategory={category} />
      <Separator className="mt-0 h-[2px] w-full pt-0" />
      <span className="font-light text-neutral-500">{description}</span>
      <Separator className="mt-0 h-[2px] w-full pt-0" />
      <Map center={coordinate} />
    </div>
  );
};

export default ListingInfo;
