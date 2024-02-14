import { BriefReview } from "./BriefReview";
import { DetailedReview } from "./DetailedReview";

export interface Movie {
  id: string;
  titleKo: string;
  titleEn: string;
  openYear: string;
  openDate: string;
  genre: string;
  nation: string;
  time: string;
  watchGradeNm: string;

  detailedReviews: DetailedReview[];
  briefReviews: BriefReview[];
}
