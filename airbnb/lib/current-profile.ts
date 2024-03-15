import { db } from "./db";
import { CurrentUser } from "./current-user";

export async function getCurrentProfile() {
  const user = await CurrentUser();

  if (!user) {
    return null;
  }

  const currentProfile = await db.profile.findUnique({
    where: {
      email: user.email as string,
    },
  });

  return currentProfile;
}
