import { getPost } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';

export function usePost(postId: string) {
  const { data, isPending } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPost(postId),
  });

  return { data, isPending };
}
