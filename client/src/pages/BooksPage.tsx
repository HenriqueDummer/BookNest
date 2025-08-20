import BookCollection from "@/components/BookCollection";

type BooksPageProps = {
  status?: "all" | "reading" | "finished" | "wishlist";
  isPublic?: boolean;
  title: string;
};

const BooksPage = ({ status, title, isPublic = false }: BooksPageProps) => {
  return <BookCollection status={status} title={title} isPublic={isPublic} />;
};

export default BooksPage;
