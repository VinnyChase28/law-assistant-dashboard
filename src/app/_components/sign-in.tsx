import Link from "next/link";
import { Button } from "./ui/button";
export default function AuthButton() {
  return (
    <Link href={"/signin"}>
      <Button variant="outline">Sign in</Button>
    </Link>
  );
}
