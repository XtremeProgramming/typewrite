import { signUp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const formSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(12).max(128),
    "repeat-password": z.string().min(12).max(128),
  })
  .refine((data) => data.password === data["repeat-password"], {
    message: "Passwords do not match",
    path: ["repeat-password"],
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      "repeat-password": "",
    },
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: { fullName: string; email: string; password: string }) =>
      signUp(data.fullName, data.email, data.password),
    onSuccess: () => {
      // TODO: success message + redirect
      alert("User created successfully");
    },
    onError: (error: any) => {
      alert(
        error?.message + " : " + error?.response?.data?.id ||
          "Something went wrong"
      );
      console.error("Error creating user:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign up</CardTitle>
              <CardDescription>Create your account</CardDescription>
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? "Loading..." : "Create account"}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Do you have an account already?{" "}
                    <Link to="/signin" className="underline underline-offset-4">
                      Login
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
