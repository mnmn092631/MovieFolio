import { NextRequest, NextResponse } from "next/server";

interface MovieListAPIData {
  movieListResult: {
    totCnt: number;
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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  const perPage = 10;
  const pageNo = Number(searchParams?.get("pageNo")) ?? 1;

  if (!keyword)
    return NextResponse.json(
      { error: "Bad Request: Missing keyword parameter" },
      { status: 400 },
    );

  try {
    const findMovie: MovieListAPIData = await fetch(
      `${process.env.MOVIE_LIST_BY_TITLE_API}${keyword}&curPage=${pageNo}`,
    ).then((data) => data.json());

    const totalCount = findMovie.movieListResult.totCnt;
    if (totalCount === 0)
      return NextResponse.json(
        { error: "No movies found for the specified keyword" },
        { status: 404 },
      );

    const totalPage = Math.ceil(totalCount / perPage);
    const mappedDataPromises = findMovie.movieListResult.movieList.map(
      async (item) => {
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

    return NextResponse.json(
      { isEnd: totalPage === pageNo, list: mappedData },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
