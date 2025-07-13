import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/hooks/usePosts';
import { formatDate } from '@/utils';
import { MAX_POSTS_PER_PAGE } from '@/utils/consts';
import { Link, useSearchParams } from 'react-router';

export default function PostList() {
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
  const { postList, isLoading, error } = usePosts(currentPage);

  // TODO: improve loading state
  if (isLoading) return 'Loading...';
  if (error) return 'Error loading posts';

  // TODO: add search
  // TODO: add sort
  const { items: posts, total: totalPosts } = postList || {};
  const totalPages = Math.ceil((totalPosts || 0) / MAX_POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return '#';
    return page === 1 ? '/posts' : `/posts?page=${page}`;
  };

  return (
    <div className="m-6 flex flex-col gap-4 items-center">
      <Link to="/posts/create">
        <Button>Create Post</Button>
      </Link>

      {posts && posts.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <p>No posts yet</p>
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="w-full max-w-screen-lg">
          {posts.map((post) => (
            <div key={post.id} className="py-6">
              <div className="relative w-full">
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.created_at)}
                </p>
                <h2 className="mt-2 text-lg font-medium text-foreground md:text-2xl line-clamp-1">
                  <Link className="hover:underline" to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="md:text-md pt-4 text-sm text-muted-foreground md:pr-24 xl:pr-32 line-clamp-3">
                  {post.content}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  By {post.author?.full_name || 'Unknown Author'}
                </p>
              </div>
              <div className="mt-4 h-px w-full bg-border" />
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
