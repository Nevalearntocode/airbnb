import { getCurrentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eachDayOfInterval, format } from 'date-fns';

export async function POST(
  req: Request,
  { params }: { params: { listingSlug: string } },
) {
  try {
    const profile = await getCurrentProfile();

    const { startDate, endDate, totalPrice } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.listingSlug) {
      return new NextResponse('Listing slut is required.', { status: 400 });
    }

    if (!startDate) {
      return new NextResponse('Please choose start date for reservation', {
        status: 400,
      });
    }

    if (!endDate) {
      return new NextResponse('Please choose end date for reservation', {
        status: 400,
      });
    }

    // Fetch existing reservations for the listing with the given slug,
    // filtering for reservations that overlap with the requested startDate and endDate.
    const existingReservations = await db.reservation.findMany({
      where: {
        listing: {
          slug: params.listingSlug, // Filter by listing slug
        },
        startDate: {
          lte: startDate, // Reservation starts on or before requested startDate
        },
        endDate: {
          gte: endDate, // Reservation ends on or after requested endDate
        },
      },
      include: {
        listing: {
          select: {
            slug: true, // Include listing slug for comparison
          },
        },
      },
    });

    // Create an array of dates between startDate and endDate (inclusive).
    const datesArray = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    // Check if all dates in datesArray are available (not overlapping with existing reservations).
    const isDateAvailable = datesArray.every((date) => {
      const formattedDate = format(date, 'yyyy-MM-dd'); // Format date for comparison

      return !existingReservations.some((reservation) => {
        // Format reservation dates for comparison
        const reservationStart = format(
          new Date(reservation.startDate),
          'yyyy-MM-dd',
        );
        const reservationEnd = format(
          new Date(reservation.endDate),
          'yyyy-MM-dd',
        );

        // Check if formattedDate falls within the reservation date range and belongs to the same listing
        return (
          formattedDate >= reservationStart &&
          formattedDate <= reservationEnd &&
          reservation.listing.slug === params.listingSlug
        );
      });
    });

    if (!isDateAvailable) {
      return new NextResponse(
        `${datesArray.length > 1 ? 'Some dates are' : 'Date is'} already taken.`,
        { status: 400 },
      );
    }

    const listingAndReservations = await db.listing.update({
      where: {
        slug: params.listingSlug,
      },
      data: {
        reservations: {
          create: {
            endDate,
            startDate,
            totalPrice,
            profileId: profile.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(listingAndReservations);
  } catch (error) {
    console.log('[RESERVATIONS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
