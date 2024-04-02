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

export async function PATCH(
  req: Request,
  { params }: { params: { listingSlug: string } },
) {
  try {
    const profile = await getCurrentProfile();

    const body = await req.json();
    const {
      category,
      title,
      description,
      location,
      imageUrl,
      guestCount,
      roomCount,
      bathRoomCount,
      price,
    } = body;

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.listingSlug) {
      return new NextResponse('Listing slug required', { status: 400 });
    }

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        return new NextResponse(`${value} is required.`, { status: 400 });
      }
    });

    const counter = await db.listing.findFirst({
      where: {
        title,
      },
      select: {
        counter: true,
      },
    });

    let newCounter = counter?.counter ? counter?.counter + 1 : 1;

    const baseSlug = title.toLowerCase().replace(/\s+/g, '-');

    let uniqueSlug = baseSlug;
    let conflictFound = false;

    do {
      const existingList = await db.listing.findFirst({
        where: { slug: uniqueSlug },
      });

      conflictFound = existingList !== null;
      if (conflictFound) {
        uniqueSlug = `${baseSlug}-${newCounter}`;
        newCounter++;
      }
    } while (conflictFound);

    const listing = await db.listing.update({
      where: {
        slug: params.listingSlug,
      },
      data: {
        title,
        description,
        imageUrl,
        category,
        slug: uniqueSlug,
        roomCount,
        bathRoomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log('[LISTING_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
