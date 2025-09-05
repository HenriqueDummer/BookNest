import NoteComponent from "@/components/Note";
import { useOutletContext } from "react-router-dom";
import type { BookOutletProps } from "./Overview";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { BiSolidEditAlt } from "react-icons/bi";
import type { Note } from "@/Types/Note";
import AddNoteForm from "@/components/AddNoteForm";
import { IoIosAdd } from "react-icons/io";

const Notes = () => {
  const { bookData } = useOutletContext<BookOutletProps>();
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const notes = bookData.notes;

  return (
    <div>
      {editingNote ? (
        <AddNoteForm
          mode={editingNote._id ? "edit" : "add"}
          note={editingNote}
          onClose={() => setEditingNote(null)}
          bookId={bookData._id}
          totalPages={bookData.totalPages}
        />
      ) : (
        <div className="flex justify-end">
          <Button variant="ghost" onClick={() => setEditingNote({} as Note)}>
            <IoIosAdd />
            Add note
          </Button>
        </div>
      )}

      {notes.length > 0 ? (
        <div className="flex flex-col gap-5 mt-5">
          {notes.map((note) => (
            <NoteComponent
              key={note._id}
              content={note.content}
              page={note.page}
              chapter={note.chapter}
              color={note.color}
            >
              <button
                onClick={() => setEditingNote(note)}
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
