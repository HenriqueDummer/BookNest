import type { AccentColors } from "./Note";

export type Character = {
  // _id: string;
  name: string;
  description: string;
  color: AccentColors;
  tags: string[];
  relationships: {
    characterId: string;
    type: string;
    color: string;
  }[],
  notes: string[]
}