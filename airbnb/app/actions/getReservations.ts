import { db } from '@/lib/db';

export default async function getReservations({
  authorId,
  listingId,
  profileId,
}: {
  listingId?: string;
  profileId?: string;
  authorId?: string;
}) {
  const queryId = listingId ? listingId : profileId ? profileId : authorId;

  if (!authorId) {
    const reservations = await db.reservation.findMany({
      where: {
        OR: [
          {
            profileId: queryId,
          },
          {
            listingId: queryId,
          },
        ],
      },
      include: {
        listing: {
          include: {
            favoriteProfiles: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations;
  } else {
    const reservations = await db.reservation.findMany({
      where: {
        listing: {
          profileId: queryId,
        },
      },
      include: {
        listing: {
          include: {
            favoriteProfiles: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations;
  }
}
