import { BackLink } from '@/components/BackLink';
import { CardContainer } from '@/components/CardContainer';
import { FormCard } from '@/components/FormCard';
import { PageContainer } from '@/components/PageContainer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePost } from '@/hooks/usePost';
import { useUpdatePost } from '@/hooks/useUpdatePost';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type EditPostSchema = z.infer<typeof formSchema>;

export default function EditPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { updatePostMutation, isUpdating } = useUpdatePost();
  const { post, isLoading } = usePost(postId || '');

  const form = useForm<EditPostSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
      });
    }
  }, [post, form]);

  const onSubmit = (data: EditPostSchema) => {
    if (!postId) return;

    updatePostMutation({
      id: postId,
      data: {
        title: data.title,
        content: data.content,
      },
    });
  };

  if (isLoading) return 'Loading...';
  if (!post) return 'Post not found';

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title="Edit Post">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[200px] max-h-[400px] resize-y"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/posts/${postId}`)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUpdating}>
                    Update Post
                  </Button>
                </div>
              </div>
              <BackLink to={`/posts/${postId}`}>Back to Post</BackLink>
            </form>
          </Form>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
