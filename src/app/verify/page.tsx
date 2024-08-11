import { getUser } from "@/auth/authServices";
import { redirect } from "next/navigation";
import { EmailVerification } from "@/components/auth/EmailVerification";

export default async function Verify() {
  const user = await getUser();

  if (user) {
    if (user.emailVerified) {
      redirect("/");
    }
    return (
      <div className="min-h-[100dvh] flex items-center">
        <EmailVerification />
      </div>
    );
  }

  redirect("/signup");
}
