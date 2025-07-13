import { getPosts } from '@/api/posts';
import { MAX_POSTS_PER_PAGE } from '@/utils/consts';
import { useQuery } from '@tanstack/react-query';

export function usePosts(page: number = 1, limit: number = MAX_POSTS_PER_PAGE) {
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
