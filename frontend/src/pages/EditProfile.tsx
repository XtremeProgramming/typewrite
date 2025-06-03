import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Link } from 'react-router';
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={'flex flex-col gap-6'}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit Profile</CardTitle>
              <CardDescription>Edit {user?.email} profile</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? 'Loading...' : 'Edit'}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    <Link to="/user" className="underline underline-offset-4">
                      Back
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
