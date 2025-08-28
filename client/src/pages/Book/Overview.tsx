import { useOutletContext } from "react-router-dom";
import type { PrivateBook } from "@/Types/PrivateBook";
import Container from "@/components/ui/Container";
import Progress from "@/components/Progress";

export type BookOutletProps = { bookData: PrivateBook };

const Overview = () => {
  const { bookData } = useOutletContext<BookOutletProps>();

  const {
    currentPage,
    totalPages,
    summary,
  } = bookData;

  return (
    <div className="w-full flex flex-col gap-5">
      <Container title="Summary">
        <p className="text-text-secondary">{summary}</p>
      </Container>

      <Progress currentPage={currentPage} totalPages={totalPages} id={bookData._id} />
    </div>
  );
};

export default Overview;
