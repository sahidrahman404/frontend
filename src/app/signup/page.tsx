import { SignUpForm } from "@/components/auth/SignUpForm";
import { getUser } from "@/auth/authServices";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getUser();

  if (user) {
    if (!user.emailVerified) {
      redirect("/verify");
    }
    redirect("/");
  }

  return (
    <div className="min-h-[100dvh] flex items-center">
      <SignUpForm />
    </div>
  );
}
