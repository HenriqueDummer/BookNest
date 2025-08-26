import Note from "@/components/Note";
import Container from "@/components/ui/Container";
import { BiSolidEditAlt } from "react-icons/bi";

const dummyNotes = [
  {
    chapter: 1,
    page: 7,
    content:
      "The story opens with Voldemort and his Death Eaters plotting. Sets a dark tone for the final book.The story opens with Voldemort and his Death Eaters plotting. Sets a dark tone for the final book.The story opens with Voldemort and his Death Eaters plotting. Sets a dark tone for the final book.The story opens with Voldemort and his Death Eaters plotting. Sets a dark tone for the final book.The story opens with Voldemort and his Death Eaters plotting. Sets a dark tone for the final book.",
    color: "rgba(249,115,22)", // purple
  },
  {
    chapter: 4,
    page: 53,
    content:
      "The Dursleys leave Privet Drive. Important moment showing Dudley’s surprising respect for Harry.",
    color: "rgba(30, 144, 255)", // blue
  },
  {
    chapter: 8,
    page: 142,
    content:
      "Wedding of Bill and Fleur. Major exposition about Dumbledore’s past through Aunt Muriel and Elphias Doge.",
    color: "rgba(60, 179, 113)", // green
  },
  {
    chapter: 12,
    page: 213,
    content:
      "The trio takes refuge in Grimmauld Place. Discover more about R.A.B. and the locket Horcrux.",
    color: "rgba(255, 140, 0)", // orange
  },
  {
    chapter: 19,
    page: 377,
    content:
      "Godric’s Hollow. Emotional visit to Harry’s parents’ graves; encounter with Bathilda Bagshot (Nagini).",
    color: "rgba(220, 20, 60)", // red
  },
  {
    chapter: 24,
    page: 467,
    content:
      "Kreacher leads the trio to capture Mundungus and retrieve info about the locket Horcrux.",
    color: "rgba(0, 191, 255)", // cyan
  },
  {
    chapter: 32,
    page: 640,
    content:
      "Battle of Hogwarts begins. Fred’s death is a heartbreaking turning point.",
    color: "rgba(255, 99, 71)", // tomato red
  },
  {
    chapter: 34,
    page: 699,
    content:
      "Harry sacrifices himself in the Forbidden Forest. Accepts death and meets Dumbledore at King’s Cross.",
    color: "rgba(148, 0, 211)", // dark violet
  },
  {
    chapter: 36,
    page: 759,
    content:
      "Final duel with Voldemort. Harry explains the Elder Wand’s allegiance before Voldemort’s downfall.",
    color: "rgba(72, 61, 139)", // indigo
  },
  {
    chapter: 36,
    page: 770,
    content:
      "Epilogue: 19 years later. Harry, Ron, and Hermione send their kids off to Hogwarts.",
    color: "rgba(46, 139, 87)", // sea green
  },
];

const Notes = () => {
  return (
    <div className="flex flex-col gap-5">
      {dummyNotes.map((note) => (
        <Note content={note.content} page={note.page} chapter={note.chapter} color={note.color} bgThird={false} />
      ))}
    </div>
  );
};

export default Notes;
