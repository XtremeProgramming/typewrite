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
import { useChangePassword } from '@/hooks/useChangePassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
  const { changePasswordMutation, isChangingPassword } = useChangePassword();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      'repeat-newPassword': '',
    },
  });

  const onSubmit = (data: ChangePasswordSchema) => {
    changePasswordMutation({
      oldPassword: data.oldPassword,
      password: data.newPassword,
    });
  };

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title="Change password">
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
                          disabled={isChangingPassword}
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
                          disabled={isChangingPassword}
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
                          disabled={isChangingPassword}
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
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'Loading...' : 'Edit'}
                </Button>
              </div>
              <BackLink to="/user">Back</BackLink>
            </form>
          </Form>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
