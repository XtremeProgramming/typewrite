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
import { useEditProfile } from '@/hooks/useEditProfile';
import { useUser } from '@/hooks/useUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string(),
  bio: z.string(),
});

type EditProfileSchema = z.infer<typeof formSchema>;

export default function EditProfile() {
  const { mutate, isPending } = useEditProfile();
  const { user } = useUser();

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.full_name || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = (data: EditProfileSchema) => {
    mutate({
      fullName: data.fullName,
      bio: data.bio,
    });
  };

  return (
    <PageContainer>
      <CardContainer>
        <FormCard
          title="Edit Profile"
          description={`Edit ${user?.email} profile`}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Loading...' : 'Edit'}
                </Button>
              </div>
              <BackLink to="/user" linkText="Back" />
            </form>
          </Form>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
