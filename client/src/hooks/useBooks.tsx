import { getMyBooks, getPublicBooks } from "@/util/http";
import { type PrivateBook } from "@/Types/PrivateBook";
import { useQuery } from "@tanstack/react-query";
import type { PublicBook } from "@/Types/PublicBook";

type UseBooksProps = {
  isPublic: boolean;
  status: string | undefined;
}

const useBooks = <T extends PublicBook[] | PrivateBook[]>({ isPublic, status }: UseBooksProps) => {
  const normalizedStatus = !isPublic && status ? status : undefined;

  const queryFn = () =>
    normalizedStatus ? getMyBooks(normalizedStatus) : getPublicBooks();

  return useQuery<T>({
    queryFn,
    queryKey: ["books", isPublic ? "public" : "me", normalizedStatus],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  })
}

export default useBooks