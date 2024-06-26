'use client';

import Container from '@/components/container';
import Header from '@/components/header';
import { Listing, Profile, Reservation } from '@prisma/client';
import TripCard from './trip-card';

export type ReservationsProps = {
  reservations: (Reservation & {
    listing: Listing & {
      favoriteProfiles: {
        id: string;
      }[];
    };
  })[];
  currentProfile: Profile;
};

const TripsClient = ({ reservations, currentProfile }: ReservationsProps) => {
  return (
    <div className="mt-4 md:mt-8">
      <Container>
        <Header
          title="Trips"
          subtitle="Where you're been and where you're going"
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {reservations.map((reservation) => (
            <TripCard
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
