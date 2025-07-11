import { signUp } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useSignUp() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) =>
      signUp(data.fullName, data.email, data.password),
    onSuccess: () => {
      toast.success('User created successfully');

      navigate('/signin');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUpMutation: mutate, isSigningUp: isPending };
}
