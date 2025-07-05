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
import { useCreatePost } from '@/hooks/useCreatePost';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type CreatePostSchema = z.infer<typeof formSchema>;

export default function CreatePost() {
  const navigate = useNavigate();
  const { createPostMutation, isCreatingPost } = useCreatePost();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: CreatePostSchema) => {
    createPostMutation({
      title: data.title,
      content: data.content,
    });
  };

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title="Create Post">
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
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/posts')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreatingPost}>
                    Create Post
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
