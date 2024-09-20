import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { MdDeleteForever } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { deleteBook, queryClient } from "@/util/http";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

const DeleteBookModal = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      toast.success("Book deleted successfully!", { theme: "dark", autoClose: 1000 });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        navigate("/");
      }, 1500); // 1.5 second delay to give time for toast to show
    },
  });

  function handleDeleteBook() {
    mutate(id);
  }

  return (
    <>
      <ToastContainer />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="gap-3 text-lg px-4 h-10">
            <MdDeleteForever className="text-xl" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-dark_bg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-300">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This action cannot be undone. This will permanently delete the
              book from our database!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              onClick={handleDeleteBook}
              className="bg-purple"
            >
              {isPending ? "Deleting" : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteBookModal;
