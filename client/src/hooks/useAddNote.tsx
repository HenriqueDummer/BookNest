import type { PrivateBook } from "@/Types/PrivateBook";
import { addNote, queryClient } from "@/util/http";
import { useMutation } from "@tanstack/react-query";

type useAddNoteProps = {
  bookId: string;
  onClose: () => void;
};

const useAddNote = ({ bookId, onClose }: useAddNoteProps) => {
  return useMutation({
    mutationFn: addNote,
    onSuccess: (udpdatedData: PrivateBook) => {
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
      onClose();
    },
  });
};

export default useAddNote;
