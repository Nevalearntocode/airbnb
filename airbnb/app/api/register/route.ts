import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    if (!email) {
      return new NextResponse("Email missing", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name missing", { status: 400 });
    }
    if (!password) {
      return new NextResponse("Password missing", { status: 400 });
    }

    const alreadyExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExists) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
