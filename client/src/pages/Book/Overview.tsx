import { useOutletContext } from "react-router-dom";
import type { PrivateBook } from "@/Types/PrivateBook";
import Container from "@/components/ui/Container";
import { CiBookmark } from "react-icons/ci";

type BookOutletProps = { bookData: PrivateBook };

const Overview = () => {
  const { bookData } = useOutletContext<BookOutletProps>();

  const {
    currentPage,
    totalPages,
    title,
    pubYear,
    author,
    isPublic,
    genres,
    sharedBy,
    summary,
  } = bookData;

  let progress = null;
  if (currentPage !== undefined && totalPages) {
    progress = Math.round((currentPage / totalPages) * 1000) / 10;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <Container title="Summary">
        <p className="text-text-secondary">{summary}</p>
      </Container>

      <Container title="Progress">
        <div>
          <div className="flex justify-between items-center text-text-secondary">
            <p>
              Pages read: {currentPage} / {totalPages}
            </p>
            <p>{progress}%</p>
          </div>
          <div className="flex mt-2">
            <div className="relative w-full h-[12px] left-0 bottom-0 bg-dark_bg rounded-lg overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className={`absolute rounded-lg h-full left-0 top-0 bg-purple`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-text-secondary">Started reading on March 18, 2024 </p>
            <button className="flex items-center bg-dark_bg_third mt-4 px-2 py-1 rounded gap-2">
              <CiBookmark size={22} /> Update progress
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Overview;
