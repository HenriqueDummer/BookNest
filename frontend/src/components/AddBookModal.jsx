import React, { useRef, useState } from "react";

import { Textarea } from "@/components/ui/textarea";

import ModalBookCover from "./ModalBookCover";
import ModalBookBackground from "./ModalBookBackground";

import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import { useMutation } from "@tanstack/react-query";
import { addBook, queryClient, updateBook } from "@/util/http";
import ModalGenres from "./ModalGenres";
import ModalSelect from "./ModalSelect";

const AddBookModal = ({ existingFormData, children, className }) => {
  const mutation = existingFormData ? updateBook : addBook;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: mutation,
    onSuccess: (res) => {
      if (res.error) {
        toast.warn(res.error, {
          theme: "dark",
        });
      } else {
        toast.success(
          existingFormData
            ? "Book updated successfully!"
            : "Book added successfully!",
          { theme: "dark", autoClose: 2000 }
        );
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["book"]});
        queryClient.invalidateQueries({ queryKey: ["books"]});
      }
    },
  });

  const initialFormData = existingFormData ?? {
    status: "want_to_read",
    genres: [],
    currentPage: 0,
    totalPages: 0,
  };

  const initialCover = existingFormData?.bookCover ?? null;
  const initialBackground = existingFormData?.bookBackground ?? null;

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [cover, setCover] = useState(initialCover);
  const [background, setBackground] = useState(initialBackground);

  function handleFormChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          className={`flex items-center bg-purple text-zinc-300 font-semibold px-2 py-1 rounded-lg ${className}`}
        >
          {children}
        </DialogTrigger>
        <DialogContent className="bg-dark_bg border-none text-zinc-200 w-auto">
          <DialogClose onClick={() => setIsOpen(false)}></DialogClose>
          <DialogHeader>
            <DialogTitle className="text-sm">Let's add a new book</DialogTitle>
          </DialogHeader>
          <form className="flex gap-5 p-6">
            <div className="w-[16rem]">
              <ModalBookBackground background={background} setBackground={setBackground} />

              <ModalBookCover cover={cover} setCover={setCover} />
            </div>

            <div className="w-[28rem]">
              <p className="w-full">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  onChange={handleFormChange}
                  value={formData.title}
                />
              </p>
              <div className="flex w-full gap-2">
                <p className="w-full">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    type="text"
                    name="author"
                    onChange={handleFormChange}
                    value={formData.author}
                  />
                </p>
                <p className="w-full">
                  <Label htmlFor="pubYear">Publication year</Label>
                  <Input
                    id="pubYear"
                    type="number"
                    name="pubYear"
                    onChange={handleFormChange}
                    value={formData.pubYear}
                  />
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center gap-3">
                <ModalSelect formData={formData} setFormData={setFormData} />
                <p className="flex items-center gap-2">
                  Currently on
                  <Input
                    className={`w-14 p-1`}
                    id="currentPage"
                    type="number"
                    name="currentPage"
                    onChange={handleFormChange}
                    value={formData.currentPage}
                  />
                  of
                  <Input
                    className={`w-14 p-1`}
                    id="totalPages"
                    type="number"
                    name="totalPages"
                    onChange={handleFormChange}
                    value={formData.totalPages}
                  />
                </p>
              </div>
              <p className="mt-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  className="text-black min-h-[8rem]"
                  name="summary"
                  id="summary"
                  onChange={handleFormChange}
                  value={formData.summary}
                />
              </p>
              <ModalGenres formData={formData} setFormData={setFormData} />
            </div>
          </form>
          <DialogFooter>
            <div className="w-full flex justify-end gap-3 p-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={() => mutate({ ...formData, bookCover: cover, bookBackground: background })}
                type="button"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBookModal;
