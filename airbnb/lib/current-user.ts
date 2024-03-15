import { auth } from "@/app/api/auth/[...nextauth]/options";
import { db } from "./db";

export async function CurrentUser() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
}
