import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SessionsStatistics } from "@/components/dashboard/SessionsStatistics";
import { UserInfoTable } from "@/components/dashboard/UserInfoTable";

export default function Dashboard() {
  return (
    <div className="bg-background rounded-lg border p-6 w-full max-w-lg mx-auto">
      <div className="grid gap-4">
        <DashboardHeader />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Dashboard</CardTitle>
              <div className="grid gap-2 text-sm">
                <SessionsStatistics />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UserInfoTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
