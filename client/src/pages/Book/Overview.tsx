import { useOutletContext } from "react-router-dom";
import type { PrivateBook } from "@/Types/PrivateBook";
import Container from "@/components/ui/Container";
import Progress from "@/components/Progress";
import { FaStar } from "react-icons/fa";

export type BookOutletProps = { bookData: PrivateBook };

const Overview = () => {
  const { bookData } = useOutletContext<BookOutletProps>();

  const { currentPage, totalPages, summary } = bookData;

  return (
    <div className="w-full flex flex-col gap-5">
      <Container title="Summary">
        <p className="text-text-secondary mt-4">{summary}</p>
      </Container>

      <Container title="Details">
        <tbody className="flex flex-col mt-4">
          <tr className="w-full flex justify-between">
            <th className="font-semibold">Author:</th>
            <td className="text-text-secondary">{bookData.author}</td>
          </tr>
          <tr className="w-full flex justify-between">
            <th className="font-semibold">Publication year:</th>
            <td className="text-text-secondary">{bookData.pubYear}</td>
          </tr>
          <tr className="w-full flex justify-between">
            <th className="font-semibold">Genres:</th>
            <td className="text-text-secondary flex gap-1">
              {bookData.genres.map((genre) => (
                <span>{genre}</span>
              ))}
            </td>
          </tr>

          <tr className="w-full flex justify-between">
            <th className="font-semibold">Rating:</th>
            <td className="text-text-secondary flex gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
            </td>
          </tr>
        </tbody>
      </Container>

      {!bookData.isPublic && (
        <Progress
          currentPage={currentPage}
          totalPages={totalPages}
          id={bookData._id}
        />
      )}
    </div>
  );
};

export default Overview;
