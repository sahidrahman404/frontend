import { getUser } from "@/auth/authServices";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function ResetPasswordButton() {
  const user = await getUser();

  if (user?.googleId || user?.facebookId) {
    return null;
  }
  return (
    <Button variant="destructive" asChild>
      <Link href="/reset">Reset Password</Link>
    </Button>
  );
}
