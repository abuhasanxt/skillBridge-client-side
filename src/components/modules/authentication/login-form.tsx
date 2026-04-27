"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),

  password: z.string().min(8, "Minimum length 8"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    console.log(data);
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging In");
      try {
        //
        const res = await authClient.signIn.email(value);
        console.log("full ", res);
        console.log("user", res.data?.user);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        const user = res.data?.user;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          window.dispatchEvent(new Event("userChanged"));
        }
        toast.success("Login Successfully!", { id: toastId });
        router.replace("/");
      } catch (error) {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
      console.log("submit click", value);
    },
  });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* email  */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      placeholder="Type your email"
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* password  */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Button
          className="w-full cursor-pointer"
          form="login-form"
          type="submit"
        >
          Login
        </Button>
        <Button
          onClick={() => handleGoogleLogin()}
          className="w-full cursor-pointer"
          variant="outline"
          type="button"
        >
          Login with Google
        </Button>
      </CardFooter>
      <FieldDescription className="text-center">
        Don&apos;t have an account? <a href="/register">Sign up</a>{" "}
      </FieldDescription>
    </Card>
  );
}
