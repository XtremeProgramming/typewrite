import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      fullName: string;
      email: string;
      bio: string;
      password: string;
    }) => signUp(data.fullName, data.email, data.bio, data.password),
    onSuccess: () => {
      toast.success("User created successfully");

      navigate("/signin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
