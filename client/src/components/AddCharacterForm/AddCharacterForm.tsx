import { Label } from "@radix-ui/react-label";

import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import { toast } from "react-toastify";
import { accentColors } from "@/Types/Colors";
import type { Character } from "@/Types/Character";
import useAddCharacter from "@/hooks/useAddCharacter";
import Notes from "./Notes";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Details from "./Details";
import Relationships from "./Relationships";
import useEditCharacter from "@/hooks/useEditCharacter";

type AddCharacterProps = {
  mode: "add" | "edit";
  bookId: string;
  character: Character | null;
  onClose: () => void;
};

function validateCharacter(character: Character): string | null {
  console.log(character)
  if (character.name.trim() === "") return "Character's name cannot be empty";
  if (character.description.trim() === "") return "Character's description cannot be empty";
  return null;
}

const AddCharacterForm = ({
  mode,
  bookId,
  character,
  onClose,
}: AddCharacterProps) => {

  const [formSection, setFormSection] = useState<
    "details" | "notes" | "relationships"
  >("details");

  const [formData, setFormData] = useState<Character>({
    name: "",
    description: "",
    notes: [],
    relationships: [],
    tags: [],
    color: accentColors[0],
    ...character,
  });

  useEffect(() => {
    if (character) setFormData((prev) => ({ ...prev, ...character }));
    console.log(formData)
  }, [character]);

  const { mutate: mutateAddCharacter } = useAddCharacter({ bookId, onClose });
  // const { mutate: mutateDeleteNote } = useDeleteNote({ bookId, onClose });
  const { mutate: mutateEditCharacter } = useEditCharacter({ bookId, onClose });

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const error = validateCharacter(formData);
    if (error) toast.error(error, { theme: "dark", autoClose: 2000 });

    if (mode === "add") {
      mutateAddCharacter({ bookId, formData });
    } else {
      mutateEditCharacter({ bookId, formData });
    }
  }

  return (
    <Container title={mode === "add" ? "New character" : "Edit character"}>
      <nav className="flex gap-1 mt-2">
        <button
          className={`text-text-secondary duration-200 px-2 rounded-sm ${
            formSection === "details" ? "!text-text-primary font-semibold " : ""
          }`}
          onClick={() => setFormSection("details")}
        >
          Details
        </button>
        <button
          className={`text-text-secondary duration-200 px-2 rounded-sm ${
            formSection === "notes" ? "!text-text-primary font-semibold " : ""
          }`}
          onClick={() => setFormSection("notes")}
        >
          Notes
        </button>
        <button
          className={`text-text-secondary duration-200 px-2 rounded-sm ${
            formSection === "relationships"
              ? "!text-text-primary font-semibold "
              : ""
          }`}
          onClick={() => setFormSection("relationships")}
        >
          Relationships
        </button>
      </nav>

      <form onSubmit={(e) => handleSubmit(e)} className="w-full mt-4">
        {formSection === "details" && (
          <Details
            setFormData={setFormData}
            formData={formData}
            handleFormChange={handleFormChange}
          />
        )}
        {formSection === "notes" && (
          <Notes formData={formData} setFormData={setFormData} />
        )}
        {formSection === "relationships" && <Relationships />}

        <div
          className={`mt-4 flex gap-2 justify-${
            mode === "edit" ? "between" : "end"
          }`}
        >
          {mode === "edit" && (
            <Button variant={"destructive"} type="button">
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant={"ghost"} type="button" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button className="bg-purple hover:bg-purple/80">Add</Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default AddCharacterForm;
