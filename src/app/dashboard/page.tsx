import { getUser } from "@/auth/authServices";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect("/signin");
  }

  if (user && !user.emailVerified) {
    redirect("/verify");
  }

  return (
    <div className="min-h-[100dvh] flex items-center">
      <Dashboard />
    </div>
  );
}
