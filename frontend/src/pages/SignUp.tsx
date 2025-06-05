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
import { useSignUp } from '@/hooks/useSignUp';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(12).max(128),
    'repeat-password': z.string().min(12).max(128),
  })
  .refine((data) => data.password === data['repeat-password'], {
    message: 'Passwords do not match',
    path: ['repeat-password'],
  });

type SignUpSchema = z.infer<typeof formSchema>;

export default function SignUp() {
  const { mutate, isPending } = useSignUp();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      'repeat-password': '',
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <PageContainer>
      <CardContainer>
        <FormCard title="Sign up" description="Create your account">
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                  name="repeat-password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repeat password</FormLabel>
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
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? 'Loading...' : 'Create account'}
                </Button>
              </div>
              <BackLink
                to="/signin"
                prefixText="Do you have an account already?"
              >
                Login
              </BackLink>
            </form>
          </Form>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
