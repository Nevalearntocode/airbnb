import Empty from '@/components/empty';
import getListingBySlug from '@/app/actions/getListingBySlug';
import { redirect } from 'next/navigation';
import React from 'react';
import ListingClient from './listing-client';
import { getCurrentProfile } from '@/lib/current-profile';

type Props = {
  params: {
    listingSlug: string;
  };
};

const Listing = async ({ params }: Props) => {
  const listing = await getListingBySlug(params.listingSlug);
  const profile = await getCurrentProfile();

  if (!listing) {
    return (
      <Empty
        title="The link you provided may be broken or the listing may no longer be available."
        subtitle="The listing may no longer be available. Would you like to browse similar listings?"
        showReset
        resetTitle={'Return to homepage'}
      />
    );
  }

  return (
    <div className="mt-8">
      <ListingClient currentProfile={profile} listing={listing} />;
    </div>
  );
};

export default Listing;
