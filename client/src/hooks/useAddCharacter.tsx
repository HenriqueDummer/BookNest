import type { PrivateBook } from "@/Types/PrivateBook";
import { addCharacter, queryClient } from "@/util/http";
import { useMutation } from "@tanstack/react-query";

type useAddCharacterProps = {
  bookId: string;
  onClose: () => void;
};

const useAddCharacter = ({ bookId, onClose }: useAddCharacterProps) => {
  return useMutation({
    mutationFn: addCharacter,
    onSuccess: (udpdatedData: PrivateBook) => {
      queryClient.setQueryData(["book", bookId], () => {
        return udpdatedData;
      });
      onClose();
    },
  });
};

export default useAddCharacter;
