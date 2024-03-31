import { db } from '@/lib/db';

export default async function getListingBySlug(slug: string) {
  try {
    const listing = await db.listing.findUnique({
      where: {
        slug,
      },
      include: {
        profile: true,
        reservations: true,
        favoriteProfiles: {
          select: {
            id: true
          }
        }
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
