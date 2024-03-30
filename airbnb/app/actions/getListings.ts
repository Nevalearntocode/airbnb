import { db } from '@/lib/db';

export default async function getListings() {
  try {
    const listings = await db.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        reservations: true,
        favoriteProfiles: {
          select: {
            id: true,
          },
        },
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
