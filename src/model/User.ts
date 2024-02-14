import { BriefReview } from "./BriefReview";
import { DetailedReview } from "./DetailedReview";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  detailedReviews: DetailedReview[];
  briefReviews: BriefReview[];
}
