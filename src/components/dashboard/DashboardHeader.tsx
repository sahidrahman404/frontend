import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { config } from "@/config";
import Link from "next/link";
import { getUser } from "@/auth/authServices";
import { NameForm } from "@/components/dashboard/NameForm";

export async function DashboardHeader() {
  const user = await getUser();
  if (!user) {
    return null;
  }
  if (user && !user.emailVerified) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-lg font-medium text-foreground">{user.email}</div>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full"
          asChild
        >
          <Link href={`${config.server.basePath}${config.server.signOutPath}`}>
            <LogOutIcon className="h-5 w-5 text-muted-foreground" />
          </Link>
        </Button>
      </div>
      <NameForm name={user.name} />
    </div>
  );
}
