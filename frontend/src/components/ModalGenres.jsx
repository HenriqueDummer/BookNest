import { useRef } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { IoCloseCircleOutline } from "react-icons/io5";

const ModalGenres = ({setFormData, formData}) => {
  const genreRef = useRef();

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
          <p className="font-light text-sm opacity-50">No genres added yet</p>
        )}
      </div>
    </div>
  );
};

export default ModalGenres;
