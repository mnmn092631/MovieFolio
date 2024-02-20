import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";

export async function POST(request: NextRequest) {
	try {
		const body: { name: string; email: string; password: string } = await request.json();

		const user = await prisma.user.findUnique({
			where: { email: body.email },
		});

		if (user) return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });

		const hashedPassword = await bcrypt.hash(body.password, 10);

		const newUser = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: hashedPassword,
			},
		});

		return NextResponse.json({ email: newUser.email }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
