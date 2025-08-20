import type { PublicBook } from "./PublicBook";

export type PrivateBook = {
  currentPage: number;
  status: "reading" | "want_to_read" | "read";
  copiedFrom: string | null;
} & PublicBook;