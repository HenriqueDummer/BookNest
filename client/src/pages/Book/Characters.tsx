// const dummyCharacters = [
//   {
//     name: "Harry Potter",
//     description: "The Boy Who Lived, famous wizard, brave and loyal.",
//     color: "rgba(249, 115, 22, 0.6)", // orange-ish
//     tags: ["Student", "Gryffindor", "Wizard"],
//     relationships: [
//       {
//         characterId: "Hermione Granger",
//         type: "Friend",
//         color: "rgba(16, 185, 129, 0.6)",
//       },
//       {
//         characterId: "Ron Weasley",
//         type: "Friend",
//         color: "rgba(59, 130, 246, 0.6)",
//       },
//       {
//         characterId: "Lord Voldemort",
//         type: "Enemy",
//         color: "rgba(220, 38, 38, 0.6)",
//       },
//     ],
//     notes: [
//       "Main protagonist of the series.",
//       "Brave and often acts impulsively.",
//       "Has a strong connection to Voldemort.",
//     ],
//   },
//   {
//     name: "Hermione Granger",
//     description: "Muggle-born witch, extremely intelligent and resourceful.",
//     color: "rgba(16, 185, 129, 0.6)", // green-ish
//     tags: ["Student", "Gryffindor", "Wizard"],
//     relationships: [
//       // {
//       //   characterId: "Harry Potter",
//       //   type: "Friend",
//       //   color: "rgba(249, 115, 22, 0.6)",
//       // },
//       // {
//       //   characterId: "Ron Weasley",
//       //   type: "Friend",
//       //   color: "rgba(59, 130, 246, 0.6)",
//       // },
//     ],
//     notes: [
//       // "Very studious and logical.",
//       // "Loyal to her friends.",
//       // "Often the voice of reason.",
//     ],
//   },
//   {
//     name: "Ron Weasley",
//     description: "Harry's best friend, loyal, sometimes insecure.",
//     color: "rgba(59, 130, 246, 0.6)", // blue-ish
//     tags: ["Student", "Gryffindor", "Wizard"],
//     relationships: [
//       {
//         characterId: "Harry Potter",
//         type: "Friend",
//         color: "rgba(249, 115, 22, 0.6)",
//       },
//       {
//         characterId: "Hermione Granger",
//         type: "Friend",
//         color: "rgba(16, 185, 129, 0.6)",
//       },
//     ],
//     notes: [
//       "Comes from a large wizarding family.",
//       "Sometimes jealous but brave.",
//       "Has a good sense of humor.",
//     ],
//   },
//   {
//     name: "Lord Voldemort",
//     description: "Dark wizard, main antagonist, seeks immortality and power.",
//     color: "rgba(220, 38, 38, 0.6)", // red-ish
//     tags: ["Dark Wizard", "Slytherin", "Professor?"],
//     relationships: [
//       {
//         characterId: "Harry Potter",
//         type: "Enemy",
//         color: "rgba(249, 115, 22, 0.6)",
//       },
//     ],
//     notes: [
//       "Fears death above all.",
//       "Ruthless and cunning.",
//       "Created multiple Horcruxes.",
//     ],
//   },
//   {
//     name: "Albus Dumbledore",
//     description: "Headmaster of Hogwarts, wise and powerful wizard.",
//     color: "rgba(168, 85, 247, 0.6)", // purple-ish
//     tags: ["Professor", "Headmaster", "Wizard"],
//     relationships: [
//       {
//         characterId: "Harry Potter",
//         type: "Mentor",
//         color: "rgba(249, 115, 22, 0.6)",
//       },
//       {
//         characterId: "Severus Snape",
//         type: "Colleague",
//         color: "rgba(120, 120, 120, 0.6)",
//       },
//     ],
//     notes: [
//       "Guides Harry through difficult times.",
//       "Extremely powerful and wise.",
//       "Has a complicated past with Grindelwald.",
//     ],
//   },
// ];

import AddCharacterForm from "@/components/AddCharacterForm/AddCharacterForm";
import { Button } from "@/components/ui/button";
import type { Character } from "@/Types/Character";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { BookOutletProps } from "./Overview";
import { IoIosAdd } from "react-icons/io";
import CharacterComponent from "@/components/Character";
import { BiSolidEditAlt } from "react-icons/bi";

const Characters = () => {
  const { bookData } = useOutletContext<BookOutletProps>();

  const [editingChar, setEditingChar] = useState<Character | null>(null);

  return (
    <section>
      {editingChar ? (
        <AddCharacterForm
          mode={editingChar._id ? "edit" : "add"}
          character={editingChar}
          onClose={() => setEditingChar(null)}
          bookId={bookData._id}
        />
      ) : (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => setEditingChar({} as Character)}
          >
            <IoIosAdd />
            Add character
          </Button>
        </div>
      )}
      <div className="w-full mt-4 columns-1 sm:columns-2 lg:columns-3 gap-5">
        {bookData.characters.map((character) => (
          <div key={character.name} className="mb-5 break-inside-avoid">
            <CharacterComponent character={character}>
              <Button onClick={() => setEditingChar(character)} className="bg-purple hover:bg-purple/80">
                <BiSolidEditAlt size={16} />
                Edit
              </Button>
            </CharacterComponent>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Characters;
