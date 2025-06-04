import { editUser, UserRequest } from '@/api/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useEditProfile = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserRequest) =>
      editUser({
        fullName: data.fullName,
        bio: data.bio,
      }),
    onSuccess: () => {
      toast.success('User updated successfully');

      navigate('/user');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
