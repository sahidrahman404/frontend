import { Home } from "@/components/Home";
import { getUser } from "@/auth/authServices";

export default async function HomePage() {
  const user = await getUser();

  return <Home user={user} />;
}
