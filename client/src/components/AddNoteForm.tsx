import { Label } from "@radix-ui/react-label";
import TextareaAutosize from "react-textarea-autosize";

import React, { useState } from "react";
import Container from "./ui/Container";
import type { Note } from "@/Types/Note";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { addNote, deleteNote, queryClient } from "@/util/http";
import type { PrivateBook } from "@/Types/PrivateBook";
import { accentColors } from "@/Types/Colors";

type AddNoteFormProps = {
  bookId: string;
  totalPages: number;
  setIsAddingNote: React.Dispatch<React.SetStateAction<boolean>>;
  existingFormData: Note | null;
  resetInitialData: () => void;
};

const AddNoteForm = ({
  bookId,
  totalPages,
  setIsAddingNote,
  existingFormData,
  resetInitialData,
}: AddNoteFormProps) => {
  const initialData =
    existingFormData !== null
      ? existingFormData
      : {
          content: "",
          page: null,
          chapter: null,
          color: accentColors[0],
        };

  const [formData, setFormData] = useState<Note>(initialData);

  const { mutate, isPending } = useMutation({
    mutationFn: addNote,
    onSuccess: (udpdatedData: PrivateBook) => {
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
    },
  });

  const { mutate: deleteNoteMutate, isPending: isDeletingNote } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (udpdatedData: PrivateBook) => {
      handleCancel();
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
    },
  });

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });

    console.log(formData);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.content.trim() === "") {
      toast.error("Note text cannot be empty", {
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }

    if (formData.chapter && formData.chapter < 0) {
      toast.error("Chapter should be a positive number", {
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }

    if (formData.page && formData.page < 0) {
      toast.error("Page should be a positive number", {
        theme: "dark",
        autoClose: 2000,
      });
      return;
    }

    if (formData.page && formData.page > totalPages) {
      toast.error(
        `Page should cannot be greater than total pages: ${totalPages}`,
        { theme: "dark", autoClose: 2000 }
      );
      return;
    }

    mutate({ bookId, formData });
    setIsAddingNote(false);
  }

  function handleDeleteNote() {
    if (existingFormData && existingFormData._id)
      deleteNoteMutate({ bookId: bookId, noteId: existingFormData._id });
  }

  function handleCancel() {
    setIsAddingNote(false);
    resetInitialData();
    setFormData({
      content: "",
      page: null,
      chapter: null,
      color: "rgba(249,115,22)",
    });
  }

  return (
    <Container title="New note">
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
            existingFormData ? "between" : "end"
          }`}
        >
          {existingFormData && (
            <Button
              variant={"destructive"}
              type="button"
              onClick={() => handleDeleteNote()}
            >
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant={"ghost"} type="button" onClick={handleCancel}>
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
