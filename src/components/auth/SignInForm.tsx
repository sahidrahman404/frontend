"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chrome, Facebook } from "lucide-react";
import { z } from "zod";
import { userPasswordSchema } from "@/components/auth/SignUpForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordField } from "@/components/auth/PasswordField";
import { redirectApp } from "@/auth/authServices";
import { config } from "@/config";
import { errorResponseSchema } from "@/lib/utils";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: userPasswordSchema,
});

export type SignIn = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: SignIn) {
    const response = await fetch(
      `${config.server.basePath}${config.server.signInPath}`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      },
    );
    if (!response.ok) {
      const message = await response.json();
      const data = errorResponseSchema.safeParse(message);
      if (!data.success) {
        return undefined;
      }
      form.setError("password", { message: data.data.msg });
      return;
    }
    redirectApp("/");
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">
          Enter your email and password to access your account.{" "}
          <Link href="/signup" className="underline" prefetch={false}>
            Don&apos;t have an account? Sign up
          </Link>
        </p>
      </div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="budimansujanda@protonmail.com"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordField form={form} name={"password"} />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing In" : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link
                  href={`${config.server.basePath}${config.server.signInByGooglePath}`}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Link
                  href={`${config.server.basePath}${config.server.signInByFacebookPath}`}
                >
                  <span className="flex">
                    <Facebook className="mr-2 h-4 w-4" />
                    Sign in with Facebook
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
