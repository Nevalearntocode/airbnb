import { getCurrentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { reservationId: string } },
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.reservationId) {
      return new NextResponse('Reservation ID required', { status: 400 });
    }

    const reservation = await db.reservation.delete({
      where: {
        profileId: profile.id,
        id: params.reservationId,
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
