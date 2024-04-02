'use client';

import useCountries from '@/hooks/use-country';
import { Listing, Profile } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';

type Props = {
  listing: Listing;
  profile: Profile | null;
};

const PropertyCard = ({ listing }: Props) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
  const { onOpen } = useModal();

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
            className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
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
          <div className="flex items-center justify-between gap-x-2">
            <Button
              variant={'destructive'}
              className="m-0 h-8 w-full p-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Edit
            </Button>
            <Button
              className="m-0 h-8 w-full p-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpen('confirmListing', { listingSlug: listing.slug });
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
