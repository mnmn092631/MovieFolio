import { DetailedReview } from "@/model/DetailedReview";
import { auth } from "@/auth";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req?: NextRequest) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = req?.nextUrl.searchParams;
  const id = searchParams?.get("id");

  if (!id) {
    const perPage = 10;
    const pageNo = Number(searchParams?.get("pageNo")) ?? 1;

    const detailedReviews = await prisma.detailedReview.findMany({
      where: { author: { email: session.user.email } },
      include: {
        movie: true,
      },
    });

    const totalCount = detailedReviews.length;
    const totalPage = Math.ceil(totalCount / perPage);
    if (pageNo > totalPage)
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 },
      );

    let pagination = detailedReviews;
    if (totalCount > perPage) {
      if (pageNo === totalPage)
        pagination = detailedReviews.slice(perPage * (pageNo - 1), totalCount);
      else
        pagination = detailedReviews.slice(
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
    const detailedReview = await prisma.detailedReview.findUnique({
      where: { id: Number(id) },
      include: {
        movie: true,
      },
    });

    return NextResponse.json(detailedReview, { status: 200 });
  }

  return NextResponse.json(
    { error: "Detailed review not found" },
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
    title,
    watchedAt,
    place,
    rating,
    storyline,
    quotes,
    review,
    movieId,
  }: Omit<
    DetailedReview,
    "id" | "createdAt" | "author" | "authorId" | "movie"
  > = await req.json();
  if (
    !title ||
    !watchedAt ||
    !place ||
    !rating ||
    !storyline ||
    !quotes ||
    !review ||
    !movieId
  )
    return NextResponse.json(
      { error: "Invalid request body: Missing required fields" },
      { status: 400 },
    );

  try {
    await prisma.detailedReview.create({
      data: {
        title,
        watchedAt,
        place,
        rating,
        storyline,
        quotes,
        review,
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
    title,
    watchedAt,
    place,
    rating,
    storyline,
    quotes,
    review,
  }: Omit<
    DetailedReview,
    "createdAt" | "author" | "authorId" | "movieId" | "movie"
  > = await req.json();
  if (
    !id ||
    isNaN(id) ||
    !title ||
    !watchedAt ||
    !place ||
    !rating ||
    !storyline ||
    !quotes ||
    !review
  )
    return NextResponse.json(
      { error: "Invalid request body: Missing or invalid fields" },
      { status: 400 },
    );

  try {
    await prisma.detailedReview.update({
      where: { id },
      data: {
        title,
        watchedAt,
        place,
        rating,
        storyline,
        quotes,
        review,
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
    await prisma.detailedReview.delete({
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
