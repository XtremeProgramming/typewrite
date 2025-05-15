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
import { Link } from "react-router";

export default function RecoverPassword() {
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
              <CardTitle className="text-2xl">Recover password</CardTitle>
              <CardDescription>
                Enter your email to recover your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      {...register("email")}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Recover password
                    </Button>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm">
                  Or you can{" "}
                  <Link to="/signin" className="underline underline-offset-4">
                    go back to Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
