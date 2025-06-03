import { editUser, UserRequest } from '@/api/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useChangePassword = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserRequest) =>
      editUser({
        oldPassword: data.oldPassword,
        password: data.password,
      }),
    onSuccess: () => {
      toast.success('Password updated successfully');

      navigate('/user');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
