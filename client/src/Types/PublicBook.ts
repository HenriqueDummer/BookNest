import type { User } from "./User";

export type PublicBook = {
  _id: string;
  title: string;
  author: string;
  bookCover: string;
  totalPages: number;
  pubYear: number;
  genres: string[];
  summary: string;
  bookBackground: string;
  sharedBy: User;
  shared: boolean;
  isPublic: boolean;
}