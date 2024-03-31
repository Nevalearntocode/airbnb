'use client';

import React, { useMemo } from 'react';
import { Listing, Profile, Reservation } from '@prisma/client';
import { categories } from '@/constants';
import Container from '@/components/container';
import ListingHeader from './listing-header';

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
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  const isFav = listing.favoriteProfiles.some(
    (profile) => profile.id === currentProfile?.id,
  );

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHeader
            currentProfile={currentProfile}
            image={listing.imageUrl}
            location={listing.locationValue}
            slug={listing.slug}
            title={listing.title}
            isFav={isFav}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
