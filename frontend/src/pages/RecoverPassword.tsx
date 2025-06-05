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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
});

export default function RecoverPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <CardContainer>
        <FormCard
          title="Recover password"
          description="Enter your email to recover your password"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-6">
                Recover password
              </Button>
              <BackLink to="/signin" prefixText="Or you can">
                go back to Login
              </BackLink>
            </form>
          </Form>
        </FormCard>
      </CardContainer>
    </PageContainer>
  );
}
