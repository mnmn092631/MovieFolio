import { NextResponse } from "next/server";

interface BoxOfficeAPIData {
  boxOfficeResult: {
    dailyBoxOfficeList: {
      rank: string;
      rankInten: string;
      rankOldAndNew: string;
      movieCd: string;
      movieNm: string;
      openDt: string;
    }[];
  };
}

export async function GET() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (1 + now.getMonth())).slice(-2);
  const date = ("0" + now.getDate()).slice(-2);

  const response = await fetch(
    `${process.env.MOVIE_BOX_OFFICE}${year + month + date}`,
  );
  const data: BoxOfficeAPIData = await response.json();

  const mappedData = data.boxOfficeResult.dailyBoxOfficeList.map((item) => {
    if (!item.rank) return;

    return {
      rank: item.rank,
      rankInten: item.rankInten,
      rankOldAndNew: item.rankOldAndNew,
      movieCd: item.movieCd,
      movieNm: item.movieNm,
      openDt: item.openDt,
    };
  });

  if (mappedData.length === 0) return new NextResponse("", { status: 404 });
  return new NextResponse(JSON.stringify(mappedData), { status: 200 });
}
