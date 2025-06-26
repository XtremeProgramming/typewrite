import { createPost } from '@/api/posts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useCreatePost() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (response) => {
      toast.success('Post created successfully');
      navigate(`/posts/${response.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
}
