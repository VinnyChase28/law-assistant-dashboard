import { getServerAuthSession } from "src/server/auth";
import Link from "next/link";
import { Button } from "./ui/button";
export default async function AuthButton() {
  const session = await getServerAuthSession();
  return (
    <Link href={"/api/auth/signin"}>
      <Button variant="outline">"Sign in"</Button>
    </Link>
  );
}
