import { getCurrentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { reservationId: string } },
) {
  try {
    const profile = await getCurrentProfile();

    const { type } = await req.json();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.reservationId) {
      return new NextResponse('Reservation ID required', { status: 400 });
    }

    if (!type) {
      return new NextResponse('Type of reservation required', { status: 404 });
    }

    const reservation =
      type === 'own'
        ? await db.reservation.delete({
            where: {
              profileId: profile.id,
              id: params.reservationId,
            },
            select: {
              id: true,
            },
          })
        : await db.reservation.delete({
            where: {
              id: params.reservationId,
              listing: {
                profileId: profile.id,
              },
            },
            select: {
              id: true,
            },
          });

    if (!reservation) {
      return new NextResponse('Reservation not found', { status: 404 });
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.log('[RESERVATION_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
