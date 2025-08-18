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

import { useMutation } from "@tanstack/react-query";
import { deleteBook, queryClient } from "@/util/http";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmActionModal = ({
  onConfirmFn,
  children,
  dialog,
  onSuccessMessage,
  queryToInvalidate,
  pendingText,
}) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: onConfirmFn,
    onSuccess: () => {
      toast.success(onSuccessMessage, { theme: "dark", autoClose: 1500 });
      if (queryToInvalidate) {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: [queryToInvalidate] });
          navigate("/");
        }, 1500); // 1.5 second delay to give time for toast to show
      }
    },
  });

  function handleDeleteBook() {
    mutate(id);
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="bg-dark_bg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-300">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {dialog}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={isPending}
              onClick={handleDeleteBook}
              className="bg-purple"
            >
              {isPending ? pendingText : "Continue"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConfirmActionModal;
