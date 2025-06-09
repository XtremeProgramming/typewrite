import { BackLink } from '@/components/BackLink';
import { CardContainer } from '@/components/CardContainer';
import { FormCard } from '@/components/FormCard';
import { PageContainer } from '@/components/PageContainer';
import { usePost } from '@/hooks/usePost';
import { useParams } from 'react-router';

export default function PostDetail() {
  const { postId } = useParams();
  const { data: post, isPending } = usePost(postId || '');

  if (isPending) return 'Loading...';
  if (!post) return 'Post not found';

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title={post.title}>
          <div className="space-y-4">
            <p>{post.content}</p>
            <div className="text-sm text-gray-500">{post.created_at}</div>
            <BackLink to="/posts">Back to Posts</BackLink>
          </div>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
