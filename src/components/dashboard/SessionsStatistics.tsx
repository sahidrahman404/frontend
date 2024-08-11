import { UserCheck, UserCog, UserPlus } from "lucide-react";
import { getSessionsStatistics } from "@/dashboard/dashboardServices";
import { redirect } from "next/navigation";

export async function SessionsStatistics() {
  const stats = await getSessionsStatistics();

  if (!stats) {
    redirect("/signin");
  }
  return (
    <div className="grid gap-2 text-sm">
      <div className="flex items-center gap-2">
        <UserPlus className="h-5 w-5 text-muted-foreground" />
        <div>Total Users: {stats.usersCount.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-muted-foreground" />
        <div>Active Today: {stats.activeSessionsCount.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-2">
        <UserCog className="h-5 w-5 text-muted-foreground" />
        <div>
          Avg. Active (7d): {stats.averageActiveSessions.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
