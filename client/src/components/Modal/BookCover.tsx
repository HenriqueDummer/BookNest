import { useRef } from "react";
import { FaFileImage } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import handleImgChange from "@/util/readImageAsUrl";

type BookCoverProps = {
  cover: string | null;
  setCover: (cover: string | null) => void;
}

const BookCover = ({ cover, setCover }: BookCoverProps) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mt-2">
      <label htmlFor="cover">Book cover</label>
      <input
        ref={imageInputRef}
        onChange={(e) => setCover(handleImgChange(e))}
        id="cover"
        type="file"
        accept="image/*"
        hidden
        name="cover"
      />

      {!cover ? (
        <div
          className="w-full cursor-pointer mt-3 flex justify-center items-center rounded-lg h-[22rem] border-dashed border-2 border-zinc-300 opacity-80"
          onClick={() => imageInputRef.current && imageInputRef.current.click()}
        >
          <FaFileImage className="text-8xl opacity-70" />
        </div>
      ) : (
        <div className="relative w-full">
          <img className="w-full rounded-lg" src={cover} alt="" />
          <button
            onClick={() => setCover(null)}
            className="absolute text-2xl top-2 right-2 bg-slate-950/80 rounded-full"
          >
            <IoIosClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCover;
