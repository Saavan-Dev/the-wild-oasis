import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // manully setting data to the React query cache
      navigate("/dashboard", { replace: true }); // repalce property prevents user from getting redirected to the previous page
    },
    onError: (err) => {
      toast.error("Provided email or passwrod are incorrect");
    },
  });
  return { login, isLoading };
}
