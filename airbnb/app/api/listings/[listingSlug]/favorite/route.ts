import { getCurrentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { listingSlug: string } },
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.listingSlug) {
      return new NextResponse('Listing not found', { status: 400 });
    }

    const alreadyFav = await db.profile.findFirst({
      where: {
        id: profile.id,
        favoriteListing: {
          some: {
            slug: params.listingSlug,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (alreadyFav) {
      const newList = await db.listing.update({
        where: {
          slug: params.listingSlug,
        },
        data: {
          favoriteProfiles: {
            disconnect: {
              id: profile.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      return NextResponse.json(newList);
    }

    const newList = await db.listing.update({
      where: {
        slug: params.listingSlug,
      },
      data: {
        favoriteProfiles: {
          connect: {
            id: profile.id,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(newList);
  } catch (error) {
    console.log('[favorite]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
