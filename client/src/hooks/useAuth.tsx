import { getMe, queryClient, submitLogIn, submitSignUp } from "@/util/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAuth = () => {
  const {
    data: authUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryFn: getMe,
    queryKey: ["authUser"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: submitLogIn,
    onError: (res) => {
      console.log(res.message);
      toast.warn(res.message, { theme: "dark", autoClose: 2000 });
    },
    onSuccess: (res) => {
      queryClient.setQueryData(["authUser"], res.user);
    },
  });

  const singUpMutation = useMutation({
    mutationFn: submitSignUp,
    onError: (res) => {
      console.log(res.message);
      toast.warn(res.message, { theme: "dark", autoClose: 2000 });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return {
    authUser,
    isLoadingUser,
    userError,
    login: loginMutation.mutate,
    isLogginIn: loginMutation.isPending,
    signUp: singUpMutation.mutate,
    signingUp: singUpMutation.isPending,
  };
};

export default useAuth;
