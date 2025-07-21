import { getPosts } from '@/api/posts';
import { MAX_POSTS_PER_PAGE } from '@/utils/consts';
import { useQuery } from '@tanstack/react-query';

export function usePosts(
  page: string | null = null,
  limit: number = MAX_POSTS_PER_PAGE,
) {
  const currentPage = page ? Math.max(1, parseInt(page, 10) || 1) : 1;

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['posts', currentPage, limit],
    queryFn: () => getPosts(currentPage, limit),
  });

  const totalPages = Math.ceil((data?.total || 0) / MAX_POSTS_PER_PAGE);

  return {
    postList: data,
    isLoading: isPending,
    error,
    refetch,
    totalPages,
    currentPage,
  };
}
