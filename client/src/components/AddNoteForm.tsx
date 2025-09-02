import { Label } from "@radix-ui/react-label";
import TextareaAutosize from "react-textarea-autosize";

import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import type { Note } from "@/Types/Note";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { addNote, deleteNote, queryClient } from "@/util/http";
import type { PrivateBook } from "@/Types/PrivateBook";
import { accentColors } from "@/Types/Colors";
import useAddNote from "@/hooks/useAddNote";
import useDeleteNote from "@/hooks/useDeleteNote";
import useEditNote from "@/hooks/useEditNote";
import NoteComponent from "./Note";

type NoteFormProps = {
  mode: "add" | "edit";
  bookId: string;
  totalPages: number;
  note: Note | null;
  onClose: () => void;
};

function validateNote(note: Note, totalPages: number): string | null {
  if (!note.content.trim()) return "Note text cannot be empty";
  if (note.chapter && note.chapter < 0)
    return "Chapter should be a positive number";
  if (note.page && note.page < 0) return "Page should be a positive number";
  if (note.page && note.page > totalPages)
    return `Page cannot be greater than total pages: ${totalPages}`;
  return null;
}

const AddNoteForm = ({
  mode,
  bookId,
  totalPages,
  note,
  onClose,
}: NoteFormProps) => {
  const [formData, setFormData] = useState<Note>({
    content: "",
    page: null,
    chapter: null,
    color: accentColors[0],
    ...note,
  });

  useEffect(() => {
    if (note) setFormData((prev) => ({ ...prev, ...note }));
  }, [note]);

  const { mutate: mutateAddNote } = useAddNote({ bookId, onClose });
  const { mutate: mutateDeleteNote } = useDeleteNote({ bookId, onClose });
  const { mutate: mutateEditNote } = useEditNote({ bookId, onClose });

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

    const error = validateNote(formData, totalPages);
    if (error) toast.error(error, { theme: "dark", autoClose: 2000 });

    if (mode === "add") {
      mutateAddNote({ bookId, formData });
    } else {
      mutateEditNote({ bookId, formData });
    }
  }

  function handleDeleteNote() {
    if (mode === "edit" && note?._id) {
      mutateDeleteNote({ bookId: bookId, noteId: note._id });
    }
  }

  return (
    <Container title={mode === "add" ? "New note" : "Edit note"}>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full mt-4">
        <p>
          <Label className="font-semibold">Note text:</Label>
          <TextareaAutosize
            className="bg-transparent border w-full max-h-[10rem] rounded-lg p-2"
            id="content"
            value={formData.content}
            onChange={(e) => handleFormChange(e)}
          />
        </p>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <p>
              <Label className="font-semibold">Page:</Label>
              <Input
                id="page"
                type="number"
                onChange={handleFormChange}
                value={formData.page ?? ""}
              />
            </p>
            <p>
              <Label className="font-semibold">Chapter:</Label>
              <Input
                id="chapter"
                type="number"
                onChange={handleFormChange}
                value={formData.chapter ?? ""}
              />
            </p>
          </div>
          <div>
            <Label className="font-semibold mb-1 block">Color:</Label>
            <div className="flex flex-wrap gap-2">
              {accentColors.map((color) => (
                <label
                  key={color}
                  className={`w-6 aspect-square rounded-full cursor-pointer border-2 border-transparent hover:border-white ${
                    color === formData.color ? "border-white" : ""
                  }`}
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="radio"
                    id="color"
                    value={color}
                    className="hidden"
                    checked={formData.color === color}
                    onChange={(e) => handleFormChange(e)}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-4 flex gap-2 justify-${
            mode === "edit" ? "between" : "end"
          }`}
        >
          {mode === "edit" && (
            <Button
              variant={"destructive"}
              type="button"
              onClick={() => handleDeleteNote()}
            >
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

export default AddNoteForm;
