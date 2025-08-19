import { useRef, useState } from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { IoCloseCircleOutline } from "react-icons/io5";
import type { PrivateBook } from "@/Types/PrivateBook";

type ModalGenresProps = {
  setFormData: (formData: any) => void;
  genres: string[];
}

const ModalGenres = ({ setFormData, genres }: ModalGenresProps) => {
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement> ){
    setError("");
    setGenre(e.target.value);
  }

  function handleAddGenre() {
    if (genre.trim() === "") {
      return;
    }

    if (genres.includes(genre.trim())) {
      setError("Genre already added");
      setGenre("");
      return;
    }

    setFormData((prev: PrivateBook) => {
      return {
        ...prev,
        genres: [...prev.genres, genre],
      };
    });

    setGenre("");
  }

  function handleDeleteGenre(e: React.MouseEvent<HTMLParagraphElement>) {
    const genre = e.currentTarget.id;

    setFormData((prev: PrivateBook) => {
      return {
        ...prev,
        genres: prev.genres.filter((existingGenre) => existingGenre !== genre),
      };
    });
  }

  return (
    <div className="mt-2 w-full">
      <Label htmlFor="genre">Genres</Label>
      <div className="flex gap-2 lg:w-[60%]">
        <Input
          onChange={(e) => handleChange(e)}
          value={genre}
          id="genre"
          type="text"
          name="genre"
        />

        <Button
          type="button"
          onClick={handleAddGenre}
          disabled={genre.trim() === ""}
        >
          Add
        </Button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div
        className={`w-full flex items-center gap-2 ${
          genres ? "" : "justify-center"
        } mt-2 border flex-wrap border-slate-400 min-h-12 rounded-3xl p-2`}
      >
        {genres?.length > 0 ? (
          genres.map((genre) => (
            <p
              key={genre}
              id={genre}
              onClick={(e) => handleDeleteGenre(e)}
              className="group bg-[#FF008A] px-2 py-1 rounded-full flex items-center gap-1 cursor-pointer"
            >
              {genre}
              <span className="hidden group-hover:inline">
                <IoCloseCircleOutline />
              </span>
            </p>
          ))
        ) : (
          <p className="font-light text-sm opacity-50">No genres added yet</p>
        )}
      </div>
    </div>
  );
};

export default ModalGenres;
