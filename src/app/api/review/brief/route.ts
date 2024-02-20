import { BriefReview } from "@/model/BriefReview";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(req?: NextRequest) {
	const session = await auth();
	// todo: status 확인
	if (!session?.user?.email) return new NextResponse("", { status: 400 });

	const searchParams = req?.nextUrl.searchParams;
	const id = searchParams?.get("id");

	if (!id) {
		const perPage = 10;
		const pageNo = Number(searchParams?.get("pageNo")) ?? 1;

		const briefReviews = await prisma.briefReview.findMany({
			where: { author: { email: session.user.email } },
			include: {
				movie: true,
			},
		});

		const totalCount = briefReviews.length;
		const totalPage = Math.ceil(totalCount / perPage);
		if (pageNo > totalPage) return new NextResponse("", { status: 400 });

		let pagination = briefReviews;
		if (totalCount > perPage) {
			if (pageNo === totalPage) pagination = briefReviews.slice(perPage * (pageNo - 1), totalCount);
			else pagination = briefReviews.slice(perPage * (pageNo - 1), perPage * pageNo);
		}

		return new NextResponse(JSON.stringify(pagination), { status: 200 });
	}

	if (!isNaN(Number(id))) {
		const briefReview = await prisma.briefReview.findUnique({
			where: { id: Number(id) },
			include: {
				movie: true,
			},
		});

		return new NextResponse(JSON.stringify(briefReview), { status: 200 });
	}

	return new NextResponse("", { status: 404 });
}

export async function POST(req: NextRequest) {
	const session = await auth();
	// todo: status 확인
	if (!session?.user?.email) return new NextResponse("", { status: 400 });

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
	});
	if (!user) return new NextResponse("", { status: 400 });

	const { rating, pros, cons, movieId }: Pick<BriefReview, "rating" | "pros" | "cons" | "movieId"> = await req.json();

	try {
		await prisma.briefReview.create({
			data: {
				rating,
				pros,
				cons,
				authorId: user.id,
				movieId,
			},
		});
		return new NextResponse("", { status: 200 });
	} catch (err) {
		console.log(err);
		return new NextResponse("", { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	const { id, rating, pros, cons }: Pick<BriefReview, "id" | "rating" | "pros" | "cons" | "movieId"> = await req.json();

	try {
		await prisma.briefReview.update({
			where: { id },
			data: {
				rating,
				pros,
				cons,
			},
		});
		return new NextResponse("", { status: 200 });
	} catch (err) {
		console.log(err);
		return new NextResponse("", { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	const { id }: { id: number } = await req.json();

	try {
		await prisma.briefReview.delete({
			where: { id },
		});
		return new NextResponse("", { status: 200 });
	} catch (err) {
		console.log(err);
		return new NextResponse("", { status: 500 });
	}
}
