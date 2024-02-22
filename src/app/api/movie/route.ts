import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

interface MovieInfoAPIData {
  movieInfoResult: {
    movieInfo: {
      movieCd: string;
      movieNm: string;
      movieNmEn: string;
      prdtYear: string;
      openDt: string;
      genres: { genreNm: string }[];
      nations: { nationNm: string }[];
      showTm: string;
      audits: { watchGradeNm?: string }[];
    };
  };
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json(
      { error: "Bad Request: Missing ID parameter" },
      { status: 400 },
    );

  try {
    const exData = await prisma.movie.findFirst({
      where: { id },
      include: {
        briefReviews: {
          include: {
            author: true,
          },
        },
      },
    });
    if (exData) return NextResponse.json(exData, { status: 200 });

    const findMovieInfo: MovieInfoAPIData = await fetch(
      `${process.env.MOVIE_INFO_BY_ID_API}${id}`,
    ).then((data) => data.json());

    if (!findMovieInfo.movieInfoResult.movieInfo.movieCd)
      return NextResponse.json(
        { error: "Failed to fetch movie information" },
        { status: 500 },
      );

    const { movieInfo } = findMovieInfo.movieInfoResult;

    const findMovie = await prisma.movie.create({
      data: {
        id: movieInfo.movieCd,
        titleKo: movieInfo.movieNm,
        titleEn: movieInfo.movieNmEn,
        openYear: movieInfo.prdtYear,
        openDate: movieInfo.openDt,
        genre: movieInfo.genres.map((genre) => genre.genreNm).join(","),
        nation: movieInfo.nations.map((nation) => nation.nationNm).join(","),
        time: movieInfo.showTm,
        watchGradeNm:
          movieInfo.audits.length > 0 ? movieInfo.audits[0].watchGradeNm! : "",
      },
    });

    return NextResponse.json(findMovie, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
