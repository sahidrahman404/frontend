"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { userPasswordSchema } from "@/components/auth/SignUpForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@/config";
import { errorResponseSchema } from "@/lib/utils";
import { redirectApp } from "@/auth/authServices";
import { PasswordField } from "@/components/auth/PasswordField";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const resetPasswordSchema = z
  .object({
    oldPassword: userPasswordSchema,
    newPassword: userPasswordSchema,
    confirmNewPassword: userPasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const response = await fetch(
      `${config.server.basePath}${config.server.resetPasswordPath}`,
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
      form.setError("oldPassword", { message: data.data.msg });
      return;
    }
    redirectApp("/dashboard");
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your old password and a new password to reset your account
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <PasswordField
              label="Old Password"
              name="oldPassword"
              form={form}
            />
            <PasswordField
              label="New Password"
              name="newPassword"
              form={form}
            />
            <PasswordField
              label="Confirm New Password"
              name="confirmNewPassword"
              form={form}
            />
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
