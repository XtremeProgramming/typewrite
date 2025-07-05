import { getPosts } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';

export function usePosts(page: number = 1, limit: number = 10) {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => getPosts(page, limit),
  });

  return {
    postList: data,
    isLoading: isPending,
    error,
    refetch,
  };
}
