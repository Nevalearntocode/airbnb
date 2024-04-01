'use client';

import Container from '@/components/container';
import Header from '@/components/header';
import { Listing, Profile, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import ListingCard from './listing-card';

type Props = {
  reservations: (Reservation & {
    listing: Listing & {
      favoriteProfiles: {
        id: string;
      }[];
    };
  })[];
  currentProfile: Profile;
};

const TripsClient = ({ reservations, currentProfile }: Props) => {
  const router = useRouter();

  return (
    <div className="mt-4 md:mt-8">
      <Container>
        <Header
          title="Trips"
          subtitle="Where you're been and where you're going"
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              profile={currentProfile}
              reservation={reservation}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TripsClient;
