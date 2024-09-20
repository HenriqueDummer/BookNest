import React, { useRef } from "react";
import { FaFileImage } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const BookCover = ({ background, setBackground }) => {
  const imageInputRef = useRef();

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackground(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-2">
      <label htmlFor="background">Book background</label>
      <input
        ref={imageInputRef}
        onChange={handleImgChange}
        id="background"
        type="file"
        hidden
        name="background"
      />
      {!background ? (
        <div
          className="w-full cursor-pointer mt-3 flex h-[6rem] justify-center items-center rounded-lg border-dashed border-2 border-zinc-300 opacity-80"
          onClick={() => imageInputRef.current.click()}
        >
          <FaFileImage className="text-3xl opacity-70" />
        </div>
      ) : (
        <div style={{backgroundImage: `url(${background})`}} className="relative w-full h-[6rem] bg-cover bg-center rounded-lg">
          <button
            onClick={() => setBackground(null)}
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
