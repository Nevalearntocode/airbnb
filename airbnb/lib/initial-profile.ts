import { db } from "./db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function InitialProfile() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const currentProfile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (currentProfile) {
    return currentProfile;
  }

  const profile = await db.profile.create({
    data: {
      userId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    },
  });
  return profile;
}
