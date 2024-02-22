import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password }: SignupForm = await request.json();
    if (!name || !email || !password)
      return NextResponse.json(
        { error: "Invalid request body: Missing required fields" },
        { status: 400 },
      );

    const user = await prisma.user.findUnique({ where: { email } });

    if (user)
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      return NextResponse.json(
        { error: "Failed to hash password" },
        { status: 500 },
      );

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    if (!newUser) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ email: newUser.email }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
