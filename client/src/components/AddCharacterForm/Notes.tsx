import type { Character } from "@/Types/Character";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import NoteComponent from "../Note";
import { MdDelete } from "react-icons/md";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoIosAdd } from "react-icons/io";

type NotesProps = {
  formData: Character;
  setFormData: React.Dispatch<React.SetStateAction<Character>>;
};

const Notes = ({ formData, setFormData }: NotesProps) => {
  const noteRef = useRef<HTMLInputElement | null>(null);

  function handleAddNote() {
    let note = noteRef.current!.value;

    if (note.trim() === "") {
      toast.error("Note can't be empty", { theme: "dark" });
      return;
    }

    const updatedCharacter = { ...formData, notes: [...formData.notes, note] };
    setFormData(updatedCharacter);

    noteRef.current!.value = "";
  }

  function handleDeleteNote(targetNote: string) {
    console.log(targetNote)
    const updatedNotes = formData.notes.filter(note => note !== targetNote)
    const updatedCharacter = { ...formData, notes: updatedNotes };
    setFormData(updatedCharacter)
  }

  return (
    <div>
      <Label className="font-semibold">New note:</Label>
      <div className="flex gap-1">
        <Input type="text" ref={noteRef} />
        <Button variant={"ghost"} onClick={handleAddNote}>
          <IoIosAdd />
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        {formData.notes.length > 0 ? (
          formData.notes.map((note) => (
            <NoteComponent
              characterNote
              key={note}
              page={null}
              chapter={null}
              content={note}
              color={formData.color}
            >
              <button
                onClick={() => handleDeleteNote(note)}
                className={`py-2 px-4 text-sm rounded-lg duration-200 hover:bg-black/20 hidden group-hover:inline`}
              >
                <MdDelete size={20} />
              </button>
            </NoteComponent>
          ))
        ) : (
          <p className="text-center mt-2 text-text-secondary">No notes yet </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
