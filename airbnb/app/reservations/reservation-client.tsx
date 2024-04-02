'use client';

import Container from '@/components/container';
import Header from '@/components/header';
import React from 'react';
import { ReservationsProps } from '../trips/trips-client';
import ReservationCard from './reservation-card';

const ReservationClient = ({
  currentProfile,
  reservations,
}: ReservationsProps) => {
  return (
    <Container>
      <Header title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ReservationCard
            reservation={reservation}
            profile={currentProfile}
            key={reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
