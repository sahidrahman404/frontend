import { getUser } from "@/auth/authServices";
import { redirect } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";

export default async function SignIn() {
  const user = await getUser();

  if (user) {
    if (user.emailVerified) {
      redirect("/");
    }
    redirect("/verify");
  }

  return (
    <div className="min-h-[100dvh] flex items-center">
      <SignInForm />
    </div>
  );
}
