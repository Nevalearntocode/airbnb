import { getCurrentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
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

    const listing = await db.listing.create({
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
        profileId: profile.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log('[LISTING_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
