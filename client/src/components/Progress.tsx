import { Label } from "@radix-ui/react-label";
import Container from "./ui/Container";
import { Input } from "./ui/input";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { useMutation } from "@tanstack/react-query";
import { queryClient, updateProgress } from "@/util/http";
import { divide } from "lodash";
import { Button } from "./ui/button";

type ProgressProps = {
  currentPage: number;
  totalPages: number;
  id: string;
};

const Progress = ({ currentPage, totalPages, id }: ProgressProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: updateProgress,
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ["book", id] });
    },
  });

  const [updatedCurrentPage, setUpdatedCurrentPage] =
    useState<number>(currentPage);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const progress = Math.round((currentPage / totalPages) * 1000) / 10;

  const updateCurrentPage = (page: number) => {
    setUpdatedCurrentPage(Number(page));
  };

  const onSave = () => {
    mutate({ bookId: id, updatedCurrentPage: updatedCurrentPage })
    setIsEditing(false)
  }

  return (
    <Container title="Progress">
      <div className="flex flex-col gap-4">
        {/* Top row: pages + percentage */}
        <div className="flex justify-between items-center text-text-secondary">
          <div className="flex items-baseline gap-2">
            <span className="text-sm">Pages read:</span>
            <span className="font-medium text-text-primary">
              {isEditing ? (
                <Input
                  type="number"
                  value={updatedCurrentPage}
                  onChange={(e) =>
                    updateCurrentPage(Number(e.currentTarget.value))
                  }
                  className="w-20 text-center"
                />
              ) : (
                currentPage
              )}
            </span>
            <span className="text-sm">/ {totalPages}</span>
          </div>

          <span className="text-sm font-medium text-text-primary">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-3 bg-dark_bg rounded-lg overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="absolute h-full left-0 top-0 bg-purple rounded-lg transition-all duration-300"
          ></div>
        </div>

        {/* Bottom row: start date + update button */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-text-secondary italic">
            Started reading on{" "}
            <span className="text-text-primary">March 18, 2024</span>
          </p>

          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant={"destructive"}
                onClick={onSave}
              >
                Cancel
              </Button>
              <Button
                className="bg-purple"
                onClick={onSave}
              >
                Save
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="flex items-center gap-2 bg-dark_bg_third hover:bg-dark_bg px-3 py-2 rounded-lg text-sm font-medium text-text-primary transition-colors duration-200"
            >
              <CiBookmark size={20} />
              Update progress
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Progress;
