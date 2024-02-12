import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest) {
  if (!req.url) return new NextResponse("", { status: 400 });

  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  if (!keyword) return new NextResponse("", { status: 400 });

  try {
    const keywordMovies = await prisma.movie.findMany({
      where: {
        OR: [
          { titleKo: { contains: keyword } },
          { titleEn: { contains: keyword } },
        ],
      },
    });

    if (keywordMovies.length === 0)
      return new NextResponse("", { status: 404 });
    return new NextResponse(JSON.stringify(keywordMovies), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
