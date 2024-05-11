// AuthButtonWrapper.jsx (make this a client component)
import Link from "next/link";
import { type Session } from "next-auth";

import { Button } from "../../_components/ui/button";

interface AuthButtonWrapperProps {
  session: Session | null;
}

const AuthButtonWrapper: React.FC<AuthButtonWrapperProps> = ({ session }) => {
  // Display buttons based on session state passed as a prop
  if (session) {
    return (
      <Link href="/dashboard">
        <Button variant="outline">Account</Button>
      </Link>
    );
  } else {
    return (
      <Link href="/auth/sign-in">
        <Button variant="outline">Sign in</Button>
      </Link>
    );
  }
};

export default AuthButtonWrapper;
