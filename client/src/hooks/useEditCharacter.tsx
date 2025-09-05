import type { PrivateBook } from "@/Types/PrivateBook";
import { addCharacter, editCharacter, queryClient } from "@/util/http";
import { useMutation } from "@tanstack/react-query";

type useEditCharacterProps = {
  bookId: string;
  onClose: () => void;
};

const useEditCharacter = ({ bookId, onClose }: useEditCharacterProps) => {
  return useMutation({
    mutationFn: editCharacter,
    onSuccess: (udpdatedData: PrivateBook) => {
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
      onClose();
    },
  });
};

export default useEditCharacter;
