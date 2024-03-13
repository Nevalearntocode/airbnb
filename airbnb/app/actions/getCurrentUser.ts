import { auth } from "../api/auth/[...nextauth]/options";
import { db } from "@/lib/db";

export default async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
}
