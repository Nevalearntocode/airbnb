'use client';

import React from 'react';
import { Listing, Profile, Reservation } from '@prisma/client';
import Container from '@/components/container';
import ListingHeader from './listing-header';
import ListingInfo from './listing-info';
import ListingReservation from './listing-reservation';

type Props = {
  listing: Listing & {
    reservations: Reservation[];
    profile: Profile;
    favoriteProfiles: {
      id: string;
    }[];
  };
  currentProfile: Profile | null;
};

const ListingClient = ({ currentProfile, listing }: Props) => {
  const {
    imageUrl,
    locationValue,
    slug,
    title,
    reservations,
    favoriteProfiles,
    price,
  } = listing;

  const isFav = favoriteProfiles.some(
    (profile) => profile.id === currentProfile?.id,
  );

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHeader
            currentProfile={currentProfile}
            image={imageUrl}
            location={locationValue}
            slug={slug}
            title={title}
            isFav={isFav}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo listing={listing} />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
              reservations={reservations}
              startPrice={price}
              isLoggedIn={currentProfile ? true : false}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
