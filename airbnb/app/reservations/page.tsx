import { getCurrentProfile } from '@/lib/current-profile';
import React from 'react';
import getReservations from '../actions/getReservations';
import Empty from '../../components/empty';
import ReservationClient from './reservation-client';

type Props = {};

const Reservations = async (props: Props) => {
  const profile = await getCurrentProfile();
  if (!profile) {
    return null;
  }

  const reservations = await getReservations({ authorId: profile.id });

  if (reservations.length === 0) {
    return (
      <Empty
        showReset
        resetTitle="Return to homepage"
        subtitle="Seems like you have no reservations on your properties"
        title="No reservations found"
      />
    );
  }

  return (
    <div className="mt-4">
      <ReservationClient reservations={reservations} currentProfile={profile} />
    </div>
  );
};

export default Reservations;
