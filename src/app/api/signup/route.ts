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

		const user = await prisma.user.findUnique({ where: { email } });

		if (user) return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});

		return NextResponse.json({ email: newUser.email }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
