import { BackLink } from '@/components/BackLink';
import { Button } from '@/components/ui/button';
import { useDeletePost } from '@/hooks/useDeletePost';
import { usePost } from '@/hooks/usePost';
import { useUser } from '@/hooks/useUser';
import { Link, useParams } from 'react-router';

export default function PostDetail() {
  const { postId } = useParams();
  const { data: post, isPending } = usePost(postId || '');
  const { user } = useUser();
  const { mutate: deletePostMutation, isPending: isDeleting } = useDeletePost();

  const handleDelete = () => {
    // TODO: improve confirmation
    if (confirm('Are you sure you want to delete this post?')) {
      deletePostMutation(postId || '');
    }
  };

  if (isPending) return 'Loading...';
  if (!post) return 'Post not found';

  const isAuthor = user?.id === post.author?.id;

  return (
    <article className="m-6 flex flex-col gap-2 items-center">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {isAuthor && (
        <div className=" flex gap-2">
          <Link to={`/posts/${postId}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </div>
      )}
      <section className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>By {post.author?.full_name || 'Unknown Author'}</span>
        <span>•</span>
        {/* TODO: add updated_at logic */}
        <span>{post.created_at}</span>
      </section>
      <p className="mt-4">{post.content}</p>

      <BackLink to="/posts">Back to Posts</BackLink>
    </article>
  );
}
