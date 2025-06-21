import { Post } from '@/api/posts';
import { CardContainer } from '@/components/CardContainer';
import { FormCard } from '@/components/FormCard';
import { PageContainer } from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function PostList() {
  const isPending = false;
  const posts: Post[] = [
    {
      id: '1',
      title: 'Post 1',
      content: 'Content 1',
      created_at: '2021-01-01',
      author_id: '1',
    },
    {
      id: '2',
      title: 'Post 2',
      content: 'Content 2',
      created_at: '2021-01-02',
      author_id: '2',
    },
  ];

  if (isPending) return 'Loading...';

  const headerActions = (
    <Link to="/posts/create">
      <Button>Create Post</Button>
    </Link>
  );

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title="Posts" headerActions={headerActions}>
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-0">
                <div className="space-y-1">
                  <Link
                    to={`/posts/${post.id}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500">{post.created_at}</p>
                </div>
              </div>
            ))}
            {posts?.length === 0 && (
              <p className="text-center text-gray-500">No posts yet</p>
            )}
          </div>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
