import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/UserInfoColumns";
import { getUsersStatistics } from "@/dashboard/dashboardServices";
import { redirect } from "next/navigation";

export async function UserInfoTable() {
  const stats = await getUsersStatistics();
  if (!stats) {
    redirect("/signin");
  }
  return <DataTable columns={columns} data={stats} />;
}
