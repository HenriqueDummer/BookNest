import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { accentColors } from "@/Types/Colors";
import type { Character } from "@/Types/Character";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Button } from "../ui/button";
import { TiDelete } from "react-icons/ti";

type DetailsProps = {
  formData: Character;
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<Character>>;
};

const Details = ({ formData, handleFormChange, setFormData }: DetailsProps) => {
  const tagRef = useRef<HTMLInputElement | null>(null);

  function handleAddTag() {
    let tag = tagRef.current!.value;

    if (tag.trim() === "") {
      toast.error("Tag can't be empty", { theme: "dark" });
      return;
    }

    const updatedCharacter = { ...formData, tags: [...formData.tags, tag] };
    setFormData(updatedCharacter);

    tagRef.current!.value = "";
  }

  function handleDeleteTag(targetTag: string) {
    const updatedTags = formData.tags.filter((tag) => tag !== targetTag);
    const updatedCharacter = { ...formData, tags: updatedTags };
    setFormData(updatedCharacter);
  }

  return (
    <>
      <div className="flex gap-2 my-2">
        <div className="flex gap-2">
          <p>
            <Label className="font-semibold">Name:</Label>
            <Input
              id="name"
              type="text"
              onChange={handleFormChange}
              value={formData.name}
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
      <p>
        <Label className="font-semibold">Description:</Label>
        <TextareaAutosize
          className="bg-transparent border w-full max-h-[10rem] rounded-lg p-2"
          id="description"
          value={formData.description}
          onChange={(e) => handleFormChange(e)}
        />
      </p>
      <div>
        <Label className="font-semibold">Tags:</Label>
        <div className="flex gap-1">
          <Input type="text" name="tag" ref={tagRef} />
          <Button type="button" variant={"ghost"} onClick={handleAddTag}>
            Add
          </Button>
        </div>
        <div className="flex gap-1 mt-2">
          {formData.tags.map((tag) => (
            <div onClick={() => handleDeleteTag(tag)} key={tag} className="px-2 flex items-center gap-1 cursor-pointer rounded-sm bg-dark_bg_third group">
              {tag}
              <span className="hidden group-hover:inline">
                <TiDelete />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
