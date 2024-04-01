'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Reservation } from '@prisma/client';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { Range } from 'react-date-range';
import { useParams, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import Calendar from './calendar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useModal } from '@/hooks/use-modal-store';
import axios from 'axios';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

type Props = {
  reservations: Reservation[];
  startPrice: number;
  isLoggedIn: boolean;
};

const ListingReservation = ({
  reservations,
  startPrice,
  isLoggedIn,
}: Props) => {
  const [totalPrice, setTotalPrice] = useState(startPrice);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const { onOpen, onClose } = useModal();
  const { listingSlug } = useParams();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  // Calculate total price whenever dateRange or startPrice changes:
  useEffect(() => {
    // Ensure both startDate and endDate are available for calculations
    if (dateRange.startDate && dateRange.endDate) {
      // Calculate difference in days between selected dates
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      // Update total price based on day count and start price
      if (dayCount && startPrice) {
        setTotalPrice(dayCount * startPrice);
      } else {
        // Reset to starting price if day count or start price is unavailable
        setTotalPrice(startPrice);
      }
    }
  }, [dateRange, startPrice]);

  const onSubmit = async () => {
    try {
      await axios.post(`/api/listings/${listingSlug}/reservations/`, {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
      });
      toast.success('Listing reserved!');
      onOpen('redirect');
      router.refresh();
      setTimeout(() => {
        onClose();
      }, 10000);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex items-center gap-1 p-4">
        <h2 className="text-2xl font-semibold">${startPrice}</h2>
        <span className="font-light text-neutral-600"> / night</span>
      </div>
      <Separator />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => setDateRange(value.selection)}
      />
      <div className="w-full px-4 pb-4">
        <Button
          variant={'destructive'}
          className="mt-0 w-full"
          onClick={
            isLoggedIn
              ? onSubmit
              : () => {
                  toast.info('Login to reserve.');
                  onOpen('login');
                }
          }
        >
          Reserve
        </Button>
      </div>
      <Separator />
      <div className="flex items-center justify-between p-4 text-lg font-semibold">
        <h3>Total</h3>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
