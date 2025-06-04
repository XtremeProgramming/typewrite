import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useChangePassword } from '@/hooks/useChangePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const formSchema = z
  .object({
    oldPassword: z.string().min(12).max(128),
    newPassword: z.string().min(12).max(128),
    'repeat-newPassword': z.string().min(12).max(128),
  })
  .refine((data) => data.newPassword === data['repeat-newPassword'], {
    message: 'Passwords do not match',
    path: ['repeat-newPassword'],
  });

type ChangePasswordSchema = z.infer<typeof formSchema>;

export default function ChangePassword() {
  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      'repeat-newPassword': '',
    },
  });

  const onSubmit = (data: ChangePasswordSchema) => {
    mutate({
      oldPassword: data.oldPassword,
      password: data.newPassword,
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={'flex flex-col gap-6'}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Change password</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="repeat-newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repeat new password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isPending}
                              {...field}
                            />
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
