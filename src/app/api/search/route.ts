import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface MovieListAPIData {
  movieListResult: {
    movieList: {
      movieCd: string;
      movieNm: string;
      movieNmEn: string;
      prdtYear: string;
      openDt: string;
      genreAlt: string;
      nationAlt: string;
    }[];
  };
}
interface MovieInfoAPIData {
  movieInfoResult: {
    movieInfo: {
      showTm: string;
      audits: { watchGradeNm?: string }[];
    };
  };
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");

  if (!keyword) return new NextResponse("", { status: 400 });

  try {
    const findMovie: MovieListAPIData = await fetch(
      `${process.env.MOVIE_LIST_BY_TITLE_API}${keyword}`,
    ).then((data) => data.json());

    if (findMovie.movieListResult.movieList.length === 0)
      return new NextResponse("", { status: 404 });

    const mappedDataPromises = findMovie.movieListResult.movieList.map(
      async (item) => {
        const exData = await prisma.movie.findFirst({
          where: {
            id: item.movieCd,
          },
        });
        if (exData) return;

        const movieInfoData: MovieInfoAPIData = await fetch(
          `${process.env.MOVIE_INFO_BY_ID_API}${item.movieCd}`,
        ).then((data) => data.json());

        return {
          id: item.movieCd,
          titleKo: item.movieNm,
          titleEn: item.movieNmEn,
          openYear: item.prdtYear,
          openDate: item.openDt,
          genre: item.genreAlt,
          nation: item.nationAlt,
          time: movieInfoData.movieInfoResult.movieInfo.showTm,
          watchGradeNm:
            movieInfoData.movieInfoResult.movieInfo.audits.length > 0
              ? movieInfoData.movieInfoResult.movieInfo.audits[0].watchGradeNm
              : "",
        };
      },
    );

    const mappedData = await Promise.all(mappedDataPromises);

    for (const data of mappedData) {
      if (!data) continue;

      await prisma.movie.create({
        data: {
          id: data.id,
          titleKo: data.titleKo,
          titleEn: data.titleEn,
          openYear: data.openYear,
          openDate: data.openDate,
          genre: data.genre,
          nation: data.nation,
          time: data.time,
          watchGradeNm: data.watchGradeNm || "",
        },
      });
    }

    const keywordMovies = await prisma.movie.findMany({
      where: {
        OR: [
          { titleKo: { contains: keyword } },
          { titleEn: { contains: keyword } },
        ],
      },
    });

    return new NextResponse(JSON.stringify(keywordMovies), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
