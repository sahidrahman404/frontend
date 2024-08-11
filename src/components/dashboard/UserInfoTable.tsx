import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/UserInfoColumns";
import { getUsersStatistics } from "@/dashboard/dashboardServices";

export async function UserInfoTable() {
  const stats = await getUsersStatistics();
  if (!stats) {
    return null;
  }
  return <DataTable columns={columns} data={stats} />;
}
