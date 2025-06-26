import { Button } from '@/components/ui/button';
import { usePosts } from '@/hooks/usePosts';
import { Link } from 'react-router';

const MAX_CONTENT_LENGTH = 400;

export default function PostList() {
  const { data, isPending, error } = usePosts();

  // TODO: improve loading state
  if (isPending) return 'Loading...';
  if (error) return 'Error loading posts';

  // TODO: add pagination
  // TODO: add search
  // TODO: add sort
  const posts = data?.items || [];

  return (
    <div className="m-6 flex flex-col gap-4 items-center">
      <Link to="/posts/create">
        <Button>Create Post</Button>
      </Link>

      <div className="w-full max-w-screen-lg">
        {posts?.map((post) => (
          <div key={post.id} className="py-6">
            <div className="relative w-full">
              <p className="text-sm text-muted-foreground">{post.created_at}</p>
              <h2 className="mt-2 text-lg font-medium text-foreground md:text-2xl">
                <Link className="hover:underline" to={`/posts/${post.id}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="md:text-md pt-4 text-sm text-muted-foreground md:pr-24 xl:pr-32">
                {post.content.length > MAX_CONTENT_LENGTH
                  ? `${post.content.substring(0, MAX_CONTENT_LENGTH)}...`
                  : post.content}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                By {post.author?.full_name || 'Unknown Author'}
              </p>
            </div>
            <div className="mt-4 h-px w-full bg-border" />
          </div>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <p>No posts yet</p>
        </div>
      )}
    </div>
  );
}
