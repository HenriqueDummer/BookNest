import type { AccentColor } from "./Colors";

export type Note = {
  chapter: number | null;
  page: number | null;
  content: string;
  color: AccentColor;
  _id?: string
};