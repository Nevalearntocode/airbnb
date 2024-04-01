import { getCurrentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

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
