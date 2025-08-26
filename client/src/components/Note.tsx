import { BiSolidEditAlt } from "react-icons/bi";
import Container from "./ui/Container";

type NoteProps = {
  content: string;
  color: string;
  page?: number | null;
  chapter?: number | null;
  characterNote: boolean;
};

const Note = ({ content, color, chapter, page, characterNote }: NoteProps) => {
  return (
    <Container
      key={content}
      className={`bg-dark_bg_${
        characterNote ? "third px-2" : "sec px-4"
      } py-2 flex justify-between items-center overflow-hidden group duration-200`}
    >
      <div className="flex gap-3">
        <div
          className="w-[3px] flex max-h-14 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0px 0px ${
              characterNote ? "150px" : "250px"
            } 20px ${color}`,
          }}
        ></div>

        <div className="flex-1">
          <p className={`py-1 ${characterNote ? "text-sm" : "text-base"}`}>{content}</p>
          {page && chapter && page !== null && chapter !== null && (
            <p className="text-text-secondary text-sm">
              Chapter {chapter} - Page {page}
            </p>
          )}
        </div>
      </div>

      {!characterNote && (
        <button
          className={`p-3 rounded-lg duration-200 hover:bg-black/20 hidden group-hover:inline`}
        >
          <BiSolidEditAlt />
        </button>
      )}
    </Container>
  );
};

export default Note;
