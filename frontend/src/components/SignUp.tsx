import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="repeat-password">Repeat Password</Label>
                    <Input
                      {...register("repeat-password")}
                      id="repeat-password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Create account
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Do you have an account already?{" "}
                  <a href="/signin" className="underline underline-offset-4">
                    Login
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
