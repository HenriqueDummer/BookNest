import type { Character } from "@/Types/Character";
import { FaRegNoteSticky } from "react-icons/fa6";
import { PiUserBold, PiUsersThreeLight } from "react-icons/pi";
import Note from "./Note";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { Button } from "./ui/button";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

type CharacterComponentType = {
  character: Character;
  children: React.ReactNode;
};

const CharacterComponent = ({ character, children }: CharacterComponentType) => {
  const { color, name, description, tags, relationships, notes } = character;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="flex-grow rounded-lg overflow-hidden bg-dark_bg_sec">
      {/* -------------------- HEADER  ------------------------- */}
      <div
        className="w-full h-30 flex p-4 items-start"
        style={{ backgroundColor: color }}
      >
        <div className="w-14 bg-black/40 aspect-square rounded-lg flex justify-center items-center">
          <span className="text-xl font-semibold">{getInitials(name)}</span>
        </div>
        <div className="ml-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <p className="bg-black/40 text-sm px-2 rounded-full">{tag}</p>
            ))}
          </div>
        </div>
      </div>
      {/* ---------------------------------- ------------------------- */}
      <div className="py-5 px-4">
        <h3 className="font-medium flex items-center gap-2">
          <PiUserBold /> Description
        </h3>
        <p className="mt-2 text-text-secondary text-sm">{description}</p>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="px-w-full h-[2px] bg-dark_bg_third"></div>
        <div className="py-5 px-4">
          <h3 className="font-medium flex items-center gap-2">
            <PiUsersThreeLight /> Relations
          </h3>
          <div className="mt-2 flex flex-col gap-2 rounded-md py-1">
            {relationships.length > 0 ? (
              <>
                {relationships.map((relation) => (
                  <div className="px-2 py-1 bg-dark_bg_third rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 aspect-square rounded-full flex justify-center items-center "
                        style={{ backgroundColor: relation.color }}
                      >
                        <span className="text-lg font-semibold">
                          {getInitials(relation.characterId)}
                        </span>
                      </div>

                      <p>{relation.characterId}</p>
                    </div>
                    <span
                      className="text-xs px-1 rounded-full"
                      style={{ backgroundColor: relation.color }}
                    >
                      {relation.type}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center my-4 text-text-secondary">
                No relations yet
              </p>
            )}
          </div>
        </div>
        <div className="px-w-full h-[2px] bg-dark_bg_third"></div>
        <div className="py-5 px-4">
          <h3 className="font-medium flex items-center gap-2">
            <FaRegNoteSticky /> Notes
          </h3>
          {notes.length > 0 ? (
            <div className="flex flex-col gap-2 my-4">
              {notes.map((note) => (
                <Note
                  content={note}
                  page={null}
                  chapter={null}
                  color={color}
                  characterNote
                />
              ))}
            </div>
          ) : (
            <p className="text-center my-4 text-text-secondary">No notes yet</p>
          )}
        </div>
      </div>
      {/* -------------------- FOOTER  ------------------------- */}
      <div>
        <div className="px-w-full h-[2px] bg-dark_bg_third"></div>
        <div className="p-2 flex">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center justify-center flex-1 gap-2"
          >
            <IoIosArrowUp
              size={20}
              className={`${isExpanded ? "rotate-0" : "rotate-180"}`}
            />
            More details
          </button>
          {isExpanded && (
            children
          )}
        </div>
      </div>
      {/* ---------------------------------------------------------- */}
    </div>
  );
};

export default CharacterComponent;
