import { Movie } from "./Movie";
import { User } from "./User";

export interface BriefReview {
  id: number;
  createdAt: string;
  rating: number;
  pros: string;
  cons: string;

  author: User;
  authorId: string;
  movie: Movie;
  movieId: string;
}
