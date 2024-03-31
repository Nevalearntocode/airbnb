'use client';

import HeartToggle from '@/app/(home)/heart-toggle';
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
  isFav: boolean;
};

const ListingHeader = ({
  currentProfile,
  image,
  location: locationValue,
  slug,
  title,
  isFav,
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
        <div className="absolute right-1 top-0">
          <HeartToggle isFav={isFav} profile={currentProfile} slug={slug} />
        </div>
      </div>
    </>
  );
};

export default ListingHeader;
