'use client';

import React, { useState } from 'react';
import Search from './search';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Listing } from '@prisma/client';
import useCountries from '@/hooks/use-country';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

type Props = {
  listings: Listing[];
};

const CommandSearchModal = ({ listings }: Props) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen;
  const { getByValue } = useCountries();
  const router = useRouter();

  return (
    <>
      <CommandDialog open={isModalOpen} onOpenChange={onClose}>
        <CommandInput placeholder="Search by specific category..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Locations">
            {listings.map((listing) => (
              <CommandItem
                key={listing.id}
                className="grid grid-cols-9"
                onSelect={() => {
                  onClose();
                  router.push(`/listings/${listing.slug}`);
                }}
              >
                <div className="col-span-4 w-full flex-1">
                  <h4 className="font-bold">{listing.title}</h4>
                </div>
                <div className="col-span-2 ">
                  <p className="font-semibold">{listing.category}</p>
                </div>
                <div className="col-span-3 flex w-full justify-between ">
                  <p className="line-clamp-1 font-bold">
                    {getByValue(listing.locationValue)?.label}
                  </p>
                  <span className="text-right opacity-70">
                    {getByValue(listing.locationValue)?.region}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandSearchModal;
