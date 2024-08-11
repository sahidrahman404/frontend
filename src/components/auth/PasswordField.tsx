import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Path, UseFormReturn } from "react-hook-form";
import { SignUp } from "@/components/auth/SignUpForm";
import { SignIn } from "@/components/auth/SignInForm";

export function PasswordField<T extends SignIn | SignUp>({
  label = "Password",
  form,
  name,
}: {
  label?: string;
  form: UseFormReturn<T, any, undefined>;
  name: Path<T>;
}) {
  const [show, setShow] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id={name}
                type={show ? "text" : "password"}
                {...field}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={() => setShow(!show)}
              >
                <Eye />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
