'use client';

import useCountries from '@/hooks/use-country';
import { Listing, Profile } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HeartToggle from './heart-toggle-favorite';

type Props = {
  listing: Listing & {
    favoriteProfiles: {
      id: string;
    }[];
  };
  profile: Profile | null;
};

const FavoriteCard = ({ listing, profile }: Props) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
  return (
    <div
      className="group col-span-1"
      onClick={() => {
        console.log(listing.slug);
        router.push(`/listings/${listing.slug}`);
      }}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            sizes="auto"
            priority
            loading="lazy"
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
          />
          <HeartToggle
            favProfileIds={listing.favoriteProfiles}
            profile={profile}
            slug={listing.slug}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="line-clamp-1 font-semibold">
            {location?.region}, {location?.label}
          </p>
          <span className="font-light text-neutral-500">
            {listing.category}
          </span>
          <div className="flex items-center gap-1">
            <p className="font-semibold">$ {listing.price}</p>
            <p className="font-light">night</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
