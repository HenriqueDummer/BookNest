import NoteComponent from "@/components/Note";
import { useOutletContext } from "react-router-dom";
import type { BookOutletProps } from "./Overview";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddNoteForm from "@/components/AddNoteForm";
import { BiSolidEditAlt } from "react-icons/bi";
import type { Note } from "@/Types/Note";

const Notes = () => {
  const { bookData } = useOutletContext<BookOutletProps>();
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<Note | null>(null);

  const handleEditNote = (note: Note) => {
    setInitialData(note);
    setIsAddingNote(true);
  };

  const resetInitialData = () => {
    setInitialData(null);
  };

  const notes = bookData.notes;

  return (
    <div>
      {isAddingNote ? (
        <AddNoteForm
          resetInitialData={resetInitialData}
          existingFormData={initialData}
          bookId={bookData._id}
          totalPages={bookData.totalPages}
          setIsAddingNote={setIsAddingNote}
        />
      ) : (
        <div className="flex justify-end">
          <Button variant="ghost" onClick={() => setIsAddingNote(true)}>
            Add note
          </Button>
        </div>
      )}
      {notes.length > 0 ? (
        <div className="flex flex-col gap-5 mt-5">
          {notes.map((note) => (
            <NoteComponent
              content={note.content}
              page={note.page}
              chapter={note.chapter}
              color={note.color}
            >
              <button
                onClick={() => handleEditNote(note)}
                className={`p-3 rounded-lg duration-200 hover:bg-black/20 hidden group-hover:inline`}
              >
                <BiSolidEditAlt />
              </button>
            </NoteComponent>
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-lg text-text-secondary">
          No notes yet
        </p>
      )}
    </div>
  );
};

export default Notes;
