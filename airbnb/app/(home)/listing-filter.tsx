'use client';

import { Listing, Profile } from '@prisma/client';
import React from 'react';
import ListingCard from './listing-card';
import { useSearchParams } from 'next/navigation';
import Empty from '@/components/empty';

type Props = {
  listings: (Listing & {
    reservations: {
      startDate: Date;
      endDate: Date;
    }[];
    favoriteProfiles: {
      id: string;
    }[];
  })[];
  profile: Profile | null;
};

const ListingFilter = ({ listings, profile }: Props) => {
  const searchParams = useSearchParams();

  let filteredListings = listings;

  type ListingParam =
    | 'category'
    | 'locationValue'
    | 'guestCount'
    | 'roomCount'
    | 'bathRoomCount';

  const filterListings = (param: ListingParam) => {
    if (searchParams.get(param)) {
      const searchValue = searchParams.get(param)!;
      filteredListings = filteredListings.filter((listing) => {
        if (typeof listing[param] === 'number') {
          return Number(listing[param]) >= Number(searchValue);
        }
        return listing[param] === searchValue;
      });
    }
  };

  filterListings('category');
  filterListings('locationValue');
  filterListings('guestCount');
  filterListings('roomCount');
  filterListings('bathRoomCount');

  if (searchParams.get('startDate') && searchParams.get('endDate')) {
    const startDate = new Date(searchParams.get('startDate')!);
    const endDate = new Date(searchParams.get('endDate')!);

    filteredListings = filteredListings.filter((listing) =>
      listing.reservations.every((reservation) => {
        return !(
          reservation.startDate <= startDate && reservation.endDate >= endDate
        );
      }),
    );
  }

  if (filteredListings.length === 0) {
    return (
      <Empty
        title="No exact matches"
        subtitle="Try changing or removing some of your filters"
        showReset
        resetTitle="Remove filter"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {filteredListings.map((list) => (
        <ListingCard key={list.id} listing={list} profile={profile} />
      ))}
    </div>
  );
};

export default ListingFilter;
