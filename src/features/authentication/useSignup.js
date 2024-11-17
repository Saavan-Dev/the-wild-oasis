import { useMutation } from "@tanstack/react-query";
import { signUp as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) => {
      return signupApi({ fullName, email, password });
    },
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
    onError: (error) => {
      console.error(error.message || "error occured during signup!");
      toast.error(error.message || "error occured during signup!");
    },
  });

  return { isLoading, signup };
}
