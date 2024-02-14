import { Movie } from "./Movie";
import { User } from "./User";

export interface DetailedReview {
  id: number;
  title: string;
  createdAt: string;
  watchedAt: string;
  place: string;
  rating: number;
  storyline: string;
  quotes: string;
  review: string;

  author: User;
  authorId: string;
  movie: Movie;
  movieId: string;
}
