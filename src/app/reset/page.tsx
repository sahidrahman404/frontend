import { getUser } from "@/auth/authServices";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default async function ForgotPage() {
  const user = await getUser();
  if (!user) {
    redirect("/signin");
  }

  if (!user.emailVerified) {
    redirect("/verify");
  }

  if (user.googleId || user.facebookId) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-[100dvh] flex items-center">
      <ResetPasswordForm />
    </div>
  );
}
