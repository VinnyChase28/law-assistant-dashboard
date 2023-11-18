import Link from "next/link";
import { Button } from "./ui/button";
export default function AuthButton() {
  return (
    <Link href={"/api/auth/signin"}>
      <Button variant="outline">Sign in</Button>
    </Link>
  );
}
