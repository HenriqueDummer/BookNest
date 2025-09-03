import type { AccentColor } from "./Colors";

export type Character = {
  // _id: string;
  name: string;
  description: string;
  color: AccentColor;
  tags: string[];
  relationships: {
    characterId: string;
    type: string;
    color: string;
  }[],
  notes: string[]
}