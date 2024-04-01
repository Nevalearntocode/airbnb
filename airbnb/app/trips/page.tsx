import { getCurrentProfile } from '@/lib/current-profile';
import React from 'react';
import getReservations from '../actions/getReservations';
import Empty from '../(home)/empty';
import TripsClient from './trips-client';

type Props = {};

const Trips = async (props: Props) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return null;
  }

  const reservations = await getReservations({ profileId: profile.id });

  if (reservations.length === 0) {
    return (
      <Empty
        title="No trips found"
        subtitle="Looks like you have not reserve any trips."
        showReset
        resetTitle="Return to homepage"
      />
    );
  }

  return (
    <>
      <TripsClient reservations={reservations} currentProfile={profile} />
    </>
  );
};

export default Trips;
