import { getUser } from "@/auth/authServices";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  if (user && !user.emailVerified) {
    redirect("/verify");
  }

  return (
    <div className="min-h-screen flex items-center">
      <Dashboard />
    </div>
  );
}
