import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) return new NextResponse("", { status: 400 });

  try {
    const exData = await prisma.movie.findFirst({
      where: { id },
    });
    if (exData)
      return new NextResponse(JSON.stringify(exData), { status: 200 });

    const findMovieInfo: MovieInfoAPIData = await fetch(
      `${process.env.MOVIE_INFO_BY_ID_API}${id}`,
    ).then((data) => data.json());
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

    return new NextResponse(JSON.stringify(findMovie), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("", { status: 500 });
  }
}
