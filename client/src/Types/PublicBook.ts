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
  userId: string;
  shared: boolean;
}