import { BriefReview } from "@/model/BriefReview";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(req?: NextRequest) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
    if (pageNo > totalPage)
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 },
      );

    let pagination = briefReviews;
    if (totalCount > perPage) {
      if (pageNo === totalPage)
        pagination = briefReviews.slice(perPage * (pageNo - 1), totalCount);
      else
        pagination = briefReviews.slice(
          perPage * (pageNo - 1),
          perPage * pageNo,
        );
    }

    return NextResponse.json(
      { isEnd: totalPage === pageNo, list: pagination },
      { status: 200 },
    );
  }

  if (!isNaN(Number(id))) {
    const briefReview = await prisma.briefReview.findUnique({
      where: { id: Number(id) },
      include: {
        movie: true,
      },
    });

    return NextResponse.json(briefReview, { status: 200 });
  }

  return NextResponse.json(
    { error: "Brief review not found" },
    { status: 404 },
  );
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  const {
    rating,
    pros,
    cons,
    movieId,
  }: Pick<BriefReview, "rating" | "pros" | "cons" | "movieId"> =
    await req.json();
  if (!rating || !pros || !cons || !movieId)
    return NextResponse.json(
      { error: "Invalid request body: Missing required fields" },
      { status: 400 },
    );

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
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const {
    id,
    rating,
    pros,
    cons,
  }: Pick<BriefReview, "id" | "rating" | "pros" | "cons" | "movieId"> =
    await req.json();
  if (!id || isNaN(id) || !rating || !pros || !cons)
    return NextResponse.json(
      { error: "Invalid request body: Missing or invalid fields" },
      { status: 400 },
    );

  try {
    await prisma.briefReview.update({
      where: { id },
      data: {
        rating,
        pros,
        cons,
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: number } = await req.json();
  if (!id || isNaN(id))
    return NextResponse.json(
      { error: "Invalid request body: Missing or invalid ID" },
      { status: 400 },
    );

  try {
    await prisma.briefReview.delete({
      where: { id },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
