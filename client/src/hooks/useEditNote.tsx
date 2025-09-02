import type { PrivateBook } from "@/Types/PrivateBook";
import { editNote, getBookById, queryClient } from "@/util/http";
import { useMutation } from "@tanstack/react-query";

type useEditNoteProps = {
  bookId: string;
  onClose: () => void;
};

const useEditNote = ({ bookId, onClose }: useEditNoteProps) => {
  return useMutation({
    mutationFn: editNote,
    onSuccess: (udpdatedData: PrivateBook) => {
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
      onClose();
    },
  });
};

export default useEditNote;
