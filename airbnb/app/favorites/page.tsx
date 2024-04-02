import { getCurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import React from 'react';
import Empty from '@/components/empty';
import Container from '@/components/container';
import ListingCard from './favorite-card';
import Header from '@/components/header';

type Props = {};

const Favorites = async (props: Props) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return null;
  }

  const favoriteListings = await db.listing.findMany({
    where: {
      favoriteProfiles: {
        some: {
          id: profile.id,
        },
      },
    },
    include: {
      favoriteProfiles: {
        select: { id: true },
      },
    },
  });

  if (favoriteListings.length === 0) {
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
    <div className="mt-4 h-full pb-20">
      <Container>
        <Header title="Favorites" subtitle="Your favorited listings" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {favoriteListings.map((list) => (
            <ListingCard key={list.id} listing={list} profile={profile} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Favorites;
