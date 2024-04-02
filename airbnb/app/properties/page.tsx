import Container from '@/components/container';
import Empty from '@/components/empty';
import Header from '@/components/header';
import { getCurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import React from 'react';
import PropertyCard from './property-card';

type Props = {};

const Properties = async (props: Props) => {
  const profile = await getCurrentProfile();

  if (!profile) {
    return null;
  }

  const properties = await db.listing.findMany({
    where: {
      profileId: profile.id,
    },
  });

  if (properties.length === 0) {
    return (
      <Empty
        title="No exact matches"
        subtitle="Try changing or removing some of your filter"
        showReset
        resetTitle="Remove filter"
      />
    );
  }

  return (
    <div className="mt-4 md:mt-8">
      <Container>
        <Header
          title="Trips"
          subtitle="Where you're been and where you're going"
        />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              listing={property}
              profile={profile}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Properties;
