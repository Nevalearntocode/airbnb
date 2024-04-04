'use client';

import { useModal } from '@/hooks/use-modal-store';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { LocationType } from './rent-modal';
import queryString from 'query-string';
import { formatISO } from 'date-fns';
import { cn } from '@/lib/utils';
import Header from '../header';
import CountrySelect from '../rent/country-select';
import { Separator } from '../ui/separator';
import Calendar from '@/app/listings/[listingSlug]/calendar';
import Counter from '../rent/counter';

type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = (props: Props) => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === 'search';
  const searchParams = useSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState<LocationType>();
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () =>
      dynamic(() => import(`../map`), {
        ssr: false,
      }),
    [],
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = queryString.parse(searchParams.toString());
    }

    const updateQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
      startDate: '',
      endDate: '',
    };
    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: `/`,
        query: updateQuery,
      },
      { skipNull: true, skipEmptyString: true },
    );
    setStep(STEPS.LOCATION);
    onClose();
    router.push(url);
  }, [
    step,
    location,
    router,
    guestCount,
    roomCount,
    bathRoomCount,
    dateRange,
    onNext,
    searchParams,
  ]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="text-xl font-bold">Filters</DialogHeader>
        {step === STEPS.LOCATION && (
          <div className="flex h-[409px] flex-col gap-4">
            <Header
              title="Where do you want to go?"
              subtitle="Find the perfect location"
            />
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />
            <Separator />
            <Map center={location ? location.latlng : [51, -0.09]} />
          </div>
        )}
        {step === STEPS.DATE && (
          <div className="flex h-[409px] flex-col gap-4">
            <Header title="When do you plan to go?" />
            <Calendar
              onChange={(value) => setDateRange(value.selection)}
              value={dateRange}
            />
          </div>
        )}
        {step === STEPS.INFO && (
          <div className="flex h-[409px] flex-col gap-4">
            <Header
              title="More infomation."
              subtitle="Choose option that fits you best."
            />
            <div className="mb-4 flex h-full flex-col justify-between">
              <Counter
                title="Guests"
                subtitle="Let us know how many people you're planning for."
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
              />
              <Separator />
              <Counter
                title="Rooms"
                subtitle="How many bedrooms do you need?."
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
              />
              <Separator />
              <Counter
                title="Bathrooms"
                subtitle="Choose the number of bathrooms for your need."
                value={bathRoomCount}
                onChange={(value) => setBathRoomCount(value)}
              />
            </div>
          </div>
        )}
        <DialogFooter className="mt-2">
          <div className="flex w-full items-center gap-4">
            <Button
              variant={'outline'}
              className="w-2/4"
              onClick={(e) => {
                e.preventDefault();
                if (step === STEPS.LOCATION) {
                  onClose();
                } else {
                  onBack();
                }
              }}
            >
              Back
            </Button>
            <Button
              variant={'destructive'}
              className={cn('ml-auto w-2/4', step === STEPS.LOCATION && 'p-0')}
              onClick={
                step < STEPS.INFO
                  ? (e) => {
                      e.preventDefault();
                      onNext();
                    }
                  : onSubmit
              }
            >
              {step === STEPS.INFO ? 'Search' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
