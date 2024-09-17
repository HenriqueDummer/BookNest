import React, { useRef, useState } from "react";

import { IoAdd } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { FaFileImage } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBook, queryClient } from "@/util/http";

const AddBookModal = () => {

  const {mutate, isLoading, isError, error} = useMutation({
    mutationFn: addBook,
  })

  const modalRef = useRef();
  const imageInputRef = useRef();
  const genreRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    status: "want_to_read",
    genres: [],
    currentPage: 0,
    totalPages: 0,
  });
  const [img, setImg] = useState();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleFormChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleSelectChange(value) {
    setFormData((prev) => {
      return {
        ...prev,
        "status": value,
      };
    });
  }

  function handleAddGenre() {
    if (genreRef.current.value.trim() === "") {
      return;
    }
    setFormData((prev) => {
      return {
        ...prev,
        genres: [...prev.genres, genreRef.current.value],
      };
    });

    genreRef.current.value = "";
  }

  function handleDeleteGenre(e) {
    const genre = e.target.id;

    setFormData((prev) => {
      return {
        ...prev,
        genres: prev.genres.filter((existingGenre) => existingGenre !== genre),
      };
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} ref={modalRef}>
      <DialogTrigger className="flex items-center bg-violet-600 px-2 py-1 rounded-lg">
        <IoAdd className="text-lg" /> Add book
      </DialogTrigger>
      <DialogContent className="bg-dark_bg border-none text-zinc-200 w-auto">
        <DialogClose onClick={() => setIsOpen(false)}></DialogClose>
        <DialogHeader>
          <DialogTitle className="text-sm">Let's add a new book</DialogTitle>
        </DialogHeader>
        <form className="flex gap-5 p-6">
          <div className="w-[16rem]">
            <p>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                onChange={handleFormChange}
                value={formData.title}
              />
            </p>
            <div className="mt-2">
              <p>
                <Label htmlFor="file">Book cover</Label>
                <input
                  ref={imageInputRef}
                  onChange={handleImgChange}
                  id="cover"
                  type="file"
                  hidden
                  name="cover"
                />
              </p>
              {!img ? (
                <div
                  className="w-full cursor-pointer mt-3 flex justify-center items-center rounded-lg h-[22rem] border-dashed border-2 border-zinc-300 opacity-80"
                  onClick={() => imageInputRef.current.click()}
                >
                  <FaFileImage className="text-8xl opacity-70" />
                </div>
              ) : (
                <div className=" relative w-full">
                  <img className="w-full rounded-lg" src={img} alt="" />
                  <button
                    onClick={() => setImg("")}
                    className="absolute text-2xl top-2 right-2 bg-slate-950/80 rounded-full"
                  >
                    <IoIosClose />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-[28rem]">
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
              <div className="flex-grow">
                <Select
                  id="status"
                  onValueChange={(value) => handleSelectChange(value)}
                  value={formData.status}
                  defaultValue={formData.status}
                  className="w-full"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Read" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="want_to_read">Want to read</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            <div className="mt-2">
              <Label htmlFor="genre">Genres</Label>
              <div className="flex gap-2 w-[60%]">
                <Input ref={genreRef} id="genre" type="text" name="genre" />
                <Button type="button" onClick={handleAddGenre}>
                  Add
                </Button>
              </div>
              <div
                className={`w-full flex items-center gap-2 ${
                  formData?.genres ? "" : "justify-center"
                } mt-2 border flex-wrap border-slate-400 min-h-12 rounded-3xl p-2`}
              >
                {formData?.genres?.length > 0 ? (
                  formData.genres.map((genre) => (
                    <p
                      id={genre}
                      onClick={handleDeleteGenre}
                      className="bg-[#FF008A] px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                    >
                      {genre}
                      <IoCloseCircleOutline />
                    </p>
                  ))
                ) : (
                  <p className="font-light text-sm opacity-50">
                    No genres added yet
                  </p>
                )}
              </div>
            </div>
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

            <Button onClick={() => mutate({...formData, bookCover: img})} type="button">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
