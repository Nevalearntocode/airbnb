import { getCurrentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { listingSlug: string } },
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.listingSlug) {
      return new NextResponse('Listing ID required', { status: 400 });
    }

    const listing = await db.listing.delete({
      where: {
        profileId: profile.id,
        slug: params.listingSlug,
      },
      select: {
        id: true,
      },
    });

    if (!listing) {
      return new NextResponse('Listing not found', { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.log('[LISTING_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
