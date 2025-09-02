import type { PrivateBook } from "@/Types/PrivateBook";
import { deleteNote, queryClient } from "@/util/http";
import { useMutation } from "@tanstack/react-query";

type useDeleteNoteProps = {
  bookId: string;
  onClose: () => void;
};

const useDeleteNote = ({ bookId, onClose }: useDeleteNoteProps) => {
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: (udpdatedData: PrivateBook) => {
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
      onClose();
    },
  });
};

export default useDeleteNote;
