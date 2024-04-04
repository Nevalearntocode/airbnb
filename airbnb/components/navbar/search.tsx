'use client';

import useCountries from '@/hooks/use-country';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

type Props = {
  onClick?: () => void;
};

const Search = (props: Props) => {
  const searchParams = useSearchParams();
  const { getByValue } = useCountries();

  return (
    <div
      className="group w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md dark:hover:bg-neutral-800 md:w-auto"
      onClick={props.onClick}
    >
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold text-black dark:text-white">
          {searchParams.get('locationValue')
            ? getByValue(searchParams.get('locationValue')!)?.label
            : 'Anywhere'}
        </div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold text-black dark:text-white sm:block">
          {searchParams.get('startDate') && searchParams.get('endDate')
            ? `${-differenceInDays(
                new Date(searchParams.get('startDate')!),
                new Date(searchParams.get('endDate')!),
              )} ${
                Number(
                  -differenceInDays(
                    new Date(searchParams.get('startDate')!),
                    new Date(searchParams.get('endDate')!),
                  ),
                ) > 1
                  ? 'days'
                  : 'day'
              }`
            : 'Any week'}
        </div>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="hidden sm:block">
            {searchParams.get('guestCount')
              ? `${searchParams.get('guestCount')} ${Number(searchParams.get('guestCount')) > 1 ? 'guests' : 'guest'}`
              : 'Add guests'}
          </div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
