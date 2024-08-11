"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { config } from "@/config";
import { errorResponseSchema } from "@/lib/utils";
import { revalidateApp } from "@/auth/authServices";

const updateUserNameSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 characters long"),
});

type UpdateUserName = z.infer<typeof updateUserNameSchema>;

export function NameForm({ name }: { name: string }) {
  const form = useForm<UpdateUserName>({
    resolver: zodResolver(updateUserNameSchema),
    defaultValues: {
      name: name,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UpdateUserName) {
    const response = await fetch(
      `${config.server.basePath}${config.server.updateUserNamePath}`,
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
      form.setError("name", { message: data.data.msg });
      return;
    }
    revalidateApp("user-info");
  }

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Budiman Sujanda"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Name"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
