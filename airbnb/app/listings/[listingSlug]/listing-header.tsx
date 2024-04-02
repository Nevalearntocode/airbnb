'use client';

import HeartToggle from '@/components/heart-toggle';
import Header from '@/components/header';
import useCountries from '@/hooks/use-country';
import { Profile } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
  image: string;
  location: string;
  slug: string;
  currentProfile: Profile | null;
  favProfileIds: {
    id: string;
  }[];
  listingProfileId: string;
};

const ListingHeader = ({
  currentProfile,
  image,
  location: locationValue,
  slug,
  title,
  favProfileIds,
  listingProfileId,
}: Props) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Header
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative aspect-video max-h-[464px] overflow-hidden">
        <Image
          alt="image"
          src={image}
          height={720}
          width={720}
          className="h-full w-full rounded-xl"
        />
        {listingProfileId !== currentProfile?.id && (
          <div className="absolute right-1 top-0">
            <HeartToggle
              favProfileIds={favProfileIds}
              profile={currentProfile}
              slug={slug}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ListingHeader;
